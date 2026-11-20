// ---------- MENÚ MÓVIL: sheet con física de muelle, interrumpible ----------
// Sigue los principios de "Designing Fluid Interfaces" (WWDC 2018): la animación
// nace del valor actual en pantalla (nunca del destino), puede agarrarse y
// revertirse en cualquier instante, y respeta prefers-reduced-motion con un
// cross-fade en vez de deslizamiento con muelle.
(function () {
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let motionLib = null;
  const getMotion = () => {
    if (REDUCED) return Promise.resolve(null);
    if (motionLib) return motionLib;
    motionLib =
      import("https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm").catch(
        () => null,
      );
    return motionLib;
  };

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("nav.main-links");
    if (!toggle || !nav) return;

    let open = false;
    let animating = null; // controla la animación en curso para poder interrumpirla

    async function setOpen(next) {
      open = next;
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));

      if (open) nav.classList.add("open"); // visible desde ya para poder animar

      const motion = await getMotion();

      if (!motion) {
        // Sin muelle disponible (reduced-motion u offline): cross-fade simple, sin overshoot
        nav.style.transition = "opacity .18s ease";
        nav.style.opacity = open ? "1" : "0";
        nav.style.transform = "none";
        if (!open)
          setTimeout(() => {
            if (!open) nav.classList.remove("open");
          }, 180);
        return;
      }

      try {
        const { animate } = motion;
        // Anima siempre desde el valor de presentación actual: si el usuario
        // vuelve a tocar el botón a mitad de la animación, no hay salto.
        if (animating) animating.stop();
        animating = animate(
          nav,
          open
            ? { opacity: [null, 1], y: [null, "0%"] }
            : { opacity: [null, 0], y: [null, "3%"] },
          {
            type: "spring",
            bounce: open ? 0.16 : 0,
            duration: open ? 0.5 : 0.32,
          },
        );
        if (!open)
          animating.finished
            .then(() => {
              if (!open) nav.classList.remove("open");
            })
            .catch(() => {});
      } catch (err) {
        nav.style.opacity = open ? "1" : "0";
        if (!open) nav.classList.remove("open");
      }
    }

    toggle.addEventListener("click", () => setOpen(!open));

    // Tocar un enlace o pulsar Escape cierra la sheet igual que en iOS
    nav
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    });
  });
})();

function formatPrecio(n) {
  return (
    n.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}

const ETIQUETA_ESTADO = {
  agotado: "Agotado",
  cerrado: "Cerrado",
  proximo: "Próximamente",
};

function cardTemplate(p, mostrarDrop) {
  const estado = estadoDe(p);
  const bloqueado = estado !== "disponible";
  const drop = getDrop(p.drop);
  const etiqueta = bloqueado
    ? (mostrarDrop && drop ? drop.nombre + " · " : "") + ETIQUETA_ESTADO[estado]
    : "";
  return `
    <div class="card${bloqueado ? " agotado" : ""}" data-tilt>
      <a class="thumb-link" href="producto.html?id=${p.id}" aria-label="${p.nombre}${bloqueado ? " (" + ETIQUETA_ESTADO[estado].toLowerCase() + ")" : ""}">
        <div class="thumb">
          <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
          ${bloqueado ? '<span class="estado-badge">' + etiqueta + "</span>" : ""}
        </div>
      </a>
      <div class="info">
        <span class="cat">${p.categoria}</span>
        <h3><a href="producto.html?id=${p.id}">${p.nombre}</a></h3>
        <span class="price">${formatPrecio(p.precio)}</span>
      </div>
    </div>
  `;
}

// ---------- DESTACADOS (home) ----------
function renderDestacados() {
  const grid = document.getElementById("grid-destacados");
  if (!grid) return;
  const visibles = PRODUCTOS.filter((p) => estadoDe(p) !== "proximo");
  const activos = visibles.filter(
    (p) => estadoDrop(getDrop(p.drop)) === "activo",
  );
  const base = activos.length ? activos : visibles;
  const destacados = [...new Set(base.map((p) => p.categoria))]
    .map((cat) => base.find((p) => p.categoria === cat))
    .filter(Boolean);
  base.forEach((p) => {
    if (destacados.length < 4 && !destacados.includes(p)) destacados.push(p);
  });
  grid.innerHTML = destacados
    .slice(0, 4)
    .map((p) => cardTemplate(p))
    .join("");
  initTiltAll();
}

// ---------- CATÁLOGO: búsqueda, categoría, orden y disponibilidad ----------
// El estado vive en la URL (?q=&cat=&orden=&disp=1): se puede compartir una búsqueda
// y al volver atrás desde una ficha el catálogo reaparece como se dejó.
function renderCatalogo() {
  const grid = document.getElementById("grid-productos");
  const filtros = document.getElementById("filtros");
  if (!grid) return;

  const tabs = document.getElementById("drop-tabs");
  const banner = document.getElementById("drop-banner");
  const buscar = document.getElementById("buscar");
  const orden = document.getElementById("orden");
  const soloDisp = document.getElementById("solo-disp");
  const resultados = document.getElementById("resultados");
  const categorias = getCategorias();

  const norm = (t) =>
    String(t || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const indice = new Map(
    PRODUCTOS.map((p) => [
      p.id,
      norm(
        [p.nombre, p.categoria, p.descripcion, (p.tallas || []).join(" ")].join(
          " ",
        ),
      ),
    ]),
  );

  const qs = new URLSearchParams(window.location.search);
  const estado = {
    vista: qs.get("vista") === "archivo" ? "archivo" : "actual",
    cat: categorias.includes(qs.get("cat")) ? qs.get("cat") : "todos",
    q: qs.get("q") || "",
    orden: ["precio-asc", "precio-desc"].includes(qs.get("orden"))
      ? qs.get("orden")
      : "relevancia",
    disp: qs.get("disp") === "1",
  };

  const enVista = (p) =>
    estadoDrop(getDrop(p.drop)) ===
    (estado.vista === "archivo" ? "archivado" : "activo");

  function filtrar() {
    const tokens = norm(estado.q).split(/\s+/).filter(Boolean);
    const soloDisponibles = estado.disp && estado.vista === "actual";
    let lista = PRODUCTOS.filter(
      (p) =>
        enVista(p) &&
        (estado.cat === "todos" || p.categoria === estado.cat) &&
        (!soloDisponibles || puedeComprarse(p)) &&
        tokens.every((t) => indice.get(p.id).includes(t)),
    );
    if (estado.orden === "precio-asc")
      lista = lista.slice().sort((a, b) => a.precio - b.precio);
    if (estado.orden === "precio-desc")
      lista = lista.slice().sort((a, b) => b.precio - a.precio);
    if (estado.vista === "archivo" && estado.orden === "relevancia")
      lista = lista.slice().sort((a, b) => (b.drop || 0) - (a.drop || 0));
    return lista;
  }

  function guardarEnUrl() {
    const p = new URLSearchParams();
    if (estado.vista === "archivo") p.set("vista", "archivo");
    if (estado.cat !== "todos") p.set("cat", estado.cat);
    if (estado.q.trim()) p.set("q", estado.q.trim());
    if (estado.orden !== "relevancia") p.set("orden", estado.orden);
    if (estado.disp && estado.vista === "actual") p.set("disp", "1");
    const str = p.toString();
    try {
      history.replaceState(
        null,
        "",
        window.location.pathname + (str ? "?" + str : ""),
      );
    } catch (e) {}
  }

  function sincronizarControles() {
    if (buscar) buscar.value = estado.q;
    if (orden) orden.value = estado.orden;
    if (soloDisp) {
      soloDisp.setAttribute("aria-pressed", String(estado.disp));
      soloDisp.hidden = estado.vista === "archivo";
    }
    if (tabs)
      tabs
        .querySelectorAll("button")
        .forEach((b) =>
          b.setAttribute(
            "aria-pressed",
            String(b.dataset.vista === estado.vista),
          ),
        );
    if (filtros)
      filtros
        .querySelectorAll("button")
        .forEach((b) =>
          b.classList.toggle("active", b.dataset.cat === estado.cat),
        );
  }

  function pintarFiltros() {
    if (!filtros) return;
    const cats = [
      ...new Set(PRODUCTOS.filter(enVista).map((p) => p.categoria)),
    ];
    if (estado.cat !== "todos" && !cats.includes(estado.cat))
      estado.cat = "todos";
    filtros.innerHTML =
      '<button data-cat="todos">Todos</button>' +
      cats
        .map((c) => '<button data-cat="' + c + '">' + c + "</button>")
        .join("");
    filtros.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        estado.cat = btn.dataset.cat;
        sincronizarControles();
        pintar(true);
      });
    });
  }

  function pintarBanner() {
    if (!banner) return;
    const lista =
      estado.vista === "archivo"
        ? DROPS.filter((d) => estadoDrop(d) === "archivado").sort((a, b) => b.id - a.id)
        : DROPS.filter((d) => estadoDrop(d) !== "archivado");
    banner.innerHTML = lista.map((d) => franjaDrop(d)).join("");
    pintarCuentas();
  }

  function cambiarVista(v) {
    if (v === estado.vista) return;
    estado.vista = v;
    pintarFiltros();
    sincronizarControles();
    pintarBanner();
    pintar(true);
  }

  function pintar(animar) {
    const lista = filtrar();
    const enArchivo = estado.vista === "archivo";
    grid.classList.toggle("sin-anim", !animar);
    if (lista.length) {
      grid.innerHTML = lista.map((p) => cardTemplate(p, enArchivo)).join("");
    } else {
      const vistaVacia = !PRODUCTOS.some(enVista);
      if (vistaVacia && !enArchivo) {
        const hayAbierto = DROPS.some((d) => estadoDrop(d) === "activo");
        grid.innerHTML =
          '<div class="vacio"><p>' +
          (hayAbierto
            ? "El drop actual todavía no tiene piezas."
            : "Ahora mismo no hay ningún drop abierto.") +
          '</p><button type="button" class="btn outline" id="ir-archivo">Ver el archivo</button></div>';
        grid
          .querySelector("#ir-archivo")
          .addEventListener("click", () => cambiarVista("archivo"));
      } else if (vistaVacia && enArchivo) {
        grid.innerHTML =
          '<div class="vacio"><p>Todavía no hay drops cerrados.</p></div>';
      } else {
        grid.innerHTML =
          '<div class="vacio"><p>No hemos encontrado piezas con esos filtros.</p>' +
          '<button type="button" class="btn outline" id="limpiar-filtros">Quitar filtros</button></div>';
        grid.querySelector("#limpiar-filtros").addEventListener("click", () => {
          estado.cat = "todos";
          estado.q = "";
          estado.orden = "relevancia";
          estado.disp = false;
          sincronizarControles();
          pintar(true);
        });
      }
    }
    if (resultados)
      resultados.textContent =
        lista.length === 1 ? "1 pieza" : lista.length + " piezas";
    guardarEnUrl();
    initTiltAll();
  }

  if (tabs) {
    tabs.innerHTML =
      '<button type="button" data-vista="actual">Drop actual</button>' +
      '<button type="button" data-vista="archivo">Archivo</button>';
    tabs
      .querySelectorAll("button")
      .forEach((b) =>
        b.addEventListener("click", () => cambiarVista(b.dataset.vista)),
      );
  }

  if (buscar) {
    let t;
    buscar.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        estado.q = buscar.value;
        pintar(false);
      }, 120);
    });
    buscar.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        buscar.blur();
      }
    });
  }
  if (orden)
    orden.addEventListener("change", () => {
      estado.orden = orden.value;
      pintar(false);
    });
  if (soloDisp)
    soloDisp.addEventListener("click", () => {
      estado.disp = !estado.disp;
      sincronizarControles();
      pintar(false);
    });

  pintarFiltros();
  sincronizarControles();
  pintarBanner();
  pintar(true);
}

// ---------- FICHA DE PRODUCTO ----------
function renderProducto() {
  const cont = document.getElementById("producto-detalle");
  if (!cont) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const p = getProducto(id) || PRODUCTOS[0];

  document.title = p.nombre + " — IMPERIOWATCH";
  const estadoP = estadoDe(p);
  const comprable = estadoP === "disponible";
  const aviso = comprable ? null : avisoNoDisponible(p);
  const drop = getDrop(p.drop);

  cont.innerHTML = `
    <div class="gallery-main" data-tilt><img src="${p.imagen}" alt="${p.nombre}"></div>
    <div class="details">
      <a class="crumb" href="catalogo.html">Catálogo</a>
      <span class="cat">${p.categoria}${drop ? " · " + drop.nombre : ""}</span>
      <h1>${p.nombre}</h1>
      <div class="price">${formatPrecio(p.precio)}${comprable ? "" : ' <span class="estado-badge inline">' + ETIQUETA_ESTADO[estadoP] + "</span>"}</div>
      <p class="desc">${p.descripcion}</p>
      <div class="opt-row">
        <label>Opción</label>
        <div class="opt-pills">
          ${p.tallas.map((t, i) => `<span class="${i === 0 ? "sel" : ""}">${t}</span>`).join("")}
        </div>
      </div>
      <div class="purchase-box">
                ${
                  !comprable
                    ? `
          <div class="purchase-note agotado"><span class="purchase-dot"></span> ${aviso.texto}</div>
          <button class="btn instagram-btn" type="button" disabled aria-disabled="true">${ETIQUETA_ESTADO[estadoP]}</button>
        `
                    : `
          <div class="purchase-note"><span class="purchase-dot"></span> Pedido gestionado por Instagram · Pago contra reembolso</div>
          ${drop && drop.cierre ? `<div class="purchase-note"><span class="purchase-dot"></span> Disponible hasta ${cuando(momentoDrop(drop.cierre))}</div>` : ""}
          <a class="btn instagram-btn" id="btn-instagram-pedido" href="#">Comprar por Instagram <span>↗</span></a>
        `
                }
        <div class="btn-row">
          <button class="btn outline" type="button" id="btn-compartir" aria-live="polite"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 12.5V3M6.5 6.5L10 3l3.5 3.5M4.5 10v6h11v-6"/></svg>Compartir</button>
          <a class="btn outline" href="catalogo.html">← Catálogo</a>
        </div>
      </div>
    </div>
  `;

  initTiltAll();

  const instagramBtn = cont.querySelector("#btn-instagram-pedido");
  const getSelectedOption = () =>
    cont.querySelector(".opt-pills .sel")?.textContent.trim() ||
    p.tallas?.[0] ||
    "";

  function actualizarInstagram() {
    if (!instagramBtn) return;
    const opcion = getSelectedOption();
    const params = new URLSearchParams({
      producto: p.id,
      opcion,
    });
    instagramBtn.href = `pedido.html?${params.toString()}`;
  }

  cont.querySelectorAll(".opt-pills span").forEach((pill) => {
    pill.addEventListener("click", () => {
      pill.parentElement
        .querySelectorAll("span")
        .forEach((s) => s.classList.remove("sel"));
      pill.classList.add("sel");
      actualizarInstagram();
    });
  });
  actualizarInstagram();

  // ---- Compartir: hoja nativa del móvil (Instagram, WhatsApp…) o copiar enlace ----
  const shareBtn = cont.querySelector("#btn-compartir");
  if (shareBtn) {
    const etiquetaOriginal = shareBtn.innerHTML;
    const urlFicha = new URL(
      "producto.html?id=" + encodeURIComponent(p.id),
      window.location.href,
    ).href;
    const avisar = (texto) => {
      shareBtn.textContent = texto;
      setTimeout(() => {
        shareBtn.innerHTML = etiquetaOriginal;
      }, 2200);
    };
    const copiarEnlace = async () => {
      try {
        await navigator.clipboard.writeText(urlFicha);
        return avisar("Enlace copiado ✓");
      } catch (e) {}
      try {
        // respaldo para navegadores sin Clipboard API
        const ta = document.createElement("textarea");
        ta.value = urlFicha;
        ta.setAttribute("readonly", "");
        ta.style.cssText =
          "position:fixed;top:0;left:0;opacity:0;font-size:16px;";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        avisar(ok ? "Enlace copiado ✓" : "No se pudo copiar");
      } catch (e) {
        avisar("No se pudo copiar");
      }
    };
    shareBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: p.nombre + " — IMPERIOWATCH",
            text: p.nombre + " · " + formatPrecio(p.precio),
            url: urlFicha,
          });
        } catch (err) {
          if (!err || err.name !== "AbortError") copiarEnlace(); // cancelar la hoja no es un error
        }
        return;
      }
      copiarEnlace();
    });
  }

  // JSON-LD estructurado para buscadores
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nombre,
    description: p.descripcion,
    category: p.categoria,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: p.precio,
      availability: {
        disponible: "https://schema.org/InStock",
        proximo: "https://schema.org/PreSale",
        agotado: "https://schema.org/OutOfStock",
        cerrado: "https://schema.org/Discontinued",
      }[estadoP],
    },
  });
  document.head.appendChild(ld);
}

// ---------- PRELOADER / LOGO INTRO ----------
(function () {
  const pl = document.getElementById("preloader");
  if (!pl) return;
  const seen = sessionStorage.getItem("iw_intro_seen");
  if (seen) {
    // Navegación interna: sin parpadeo de logo, solo se retira al instante.
    pl.classList.add("skip", "hide");
  } else {
    pl.classList.add("full-intro");
    sessionStorage.setItem("iw_intro_seen", "1");
    const INTRO_MIN = 3000; // ms mínimos de intro, contados desde que empieza la carga
    window.addEventListener("load", () =>
      setTimeout(
        () => pl.classList.add("hide"),
        Math.max(300, INTRO_MIN - performance.now()),
      ),
    );
  }
})();

// ---------- PAGE TRANSITIONS ----------
// Al volver atrás, iOS/Android restauran la página desde la caché de navegación con
// la clase page-leaving aún puesta (opacity 0): pantalla en negro. Se limpia al mostrarla.
window.addEventListener("pageshow", () =>
  document.body.classList.remove("page-leaving"),
);

document.addEventListener("DOMContentLoaded", () => {
  // En táctil se navega al instante: el fade de salida de 300ms se nota como lag, no como estilo.
  const SIN_FADE = window.matchMedia("(hover: none)").matches;
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      a.target === "_blank"
    )
      return;
    a.addEventListener("click", (e) => {
      if (SIN_FADE) return;
      e.preventDefault();
      document.body.classList.add("page-leaving");
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
});

// ---------- TILT 3D (cards, imagen de producto, info-boxes) ----------
const TILT_ENABLED =
  window.matchMedia &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !window.matchMedia("(hover: none)").matches;

function attachTilt(el) {
  if (!TILT_ENABLED || el.dataset.tiltReady) return;
  el.dataset.tiltReady = "1";
  const strength = el.classList.contains("card") ? 9 : 6;

  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * strength * 2;
    const ry = (px - 0.5) * strength * 2.2;
    el.style.setProperty("--rx", rx.toFixed(2) + "deg");
    el.style.setProperty("--ry", ry.toFixed(2) + "deg");
    el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
    el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    el.classList.add("tilting");
  });

  el.addEventListener("pointerleave", () => {
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.classList.remove("tilting");
  });
}

function initTiltAll() {
  document.querySelectorAll("[data-tilt]").forEach(attachTilt);
}

// ---------- SCROLL REVEAL ----------
function initReveal() {
  const targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!targets.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  targets.forEach((t) => io.observe(t));
}

// ---------- DROPS: tarjetas, cuenta atrás, ticker y calendario ----------
const UNIDADES_CUENTA = [["d", "días"], ["h", "horas"], ["m", "min"], ["s", "seg"]];

function bloqueCuenta(ms) {
  return (
    '<div class="cuenta" data-cuenta="' + ms + '" role="timer">' +
    UNIDADES_CUENTA.map(
      ([k, l]) => '<div class="cuenta-box"><b data-u="' + k + '">00</b><span>' + l + "</span></div>",
    ).join("") +
    "</div>"
  );
}

function barraPiezas(d) {
  const { total, quedan } = piezasDrop(d);
  if (!total) return "";
  const txt = quedan === 0 ? "Drop agotado" : "Quedan " + quedan + " de " + total + " piezas";
  return (
    '<div class="piezas"><div class="piezas-txt"><strong>' + txt + "</strong></div>" +
    '<div class="piezas-barra"><i style="width:' + Math.round((quedan / total) * 100) + '%"></i></div></div>'
  );
}

function ctaPildora(href, texto) {
  return (
    '<a class="cta-pill" href="' + href + '"><span>' + texto + "</span>" +
    '<i class="cta-icon" aria-hidden="true">↗</i></a>'
  );
}

function tarjetaDrop(d, grande) {
  const e = estadoDrop(d);
  const ap = momentoDrop(d.apertura);
  const ci = momentoDrop(d.cierre);
  let etiqueta, cuenta = "", linea = "", extra = "", clase = "drop-card";
  if (e === "activo") {
    etiqueta = '<span class="drop-dot"></span>' + d.nombre + " · ABIERTO";
    if (ci !== null) {
      cuenta = bloqueCuenta(ci);
      linea = "Cierra " + cuando(ci);
    }
    extra = ctaPildora("catalogo.html", "Ver piezas del " + d.nombre);
    clase += " es-activo";
  } else if (e === "proximo") {
    etiqueta = d.nombre + " · " + fechaLarga(ap).toUpperCase() + " · " + horaMadrid(ap);
    cuenta = bloqueCuenta(ap);
    linea = "Sale " + cuando(ap);
    extra = '<button type="button" class="btn-ghost" data-cal="' + d.id + '">Añadir a mi calendario</button>';
    clase += " es-proximo";
  } else {
    const { total } = piezasDrop(d);
    etiqueta = d.nombre + " · HISTÓRICO";
    linea =
      total + " piezas traídas" +
      (ci !== null ? " · cerrado el " + fechaLarga(ci) + " a las " + horaMadrid(ci) : "");
    extra = ctaPildora("catalogo.html?vista=archivo", "Ver el archivo");
    clase += " es-archivo";
  }
  if (grande) clase += " grande";
  const aviso =
    grande && e !== "archivado"
      ? '<div class="aviso-tag"><i>!</i>AVISO IMPORTANTE</div>'
      : "";
  if (aviso) clase += " es-aviso";
  return (
    '<div class="drop-shell ' + (e === "archivado" ? "archivo" : e) + '">' +
    '<article class="' + clase + '">' + aviso +
    '<div class="drop-eyebrow">' + etiqueta + "</div>" +
    cuenta + (linea ? '<p class="drop-linea">' + linea + "</p>" : "") +
    (e === "archivado" ? "" : barraPiezas(d)) + extra +
    "</article></div>"
  );
}

function franjaDrop(d) {
  const e = estadoDrop(d);
  const ap = momentoDrop(d.apertura);
  const ci = momentoDrop(d.cierre);
  const { total, quedan } = piezasDrop(d);
  const piezas = total ? '<span class="franja-piezas">' + quedan + "/" + total + " piezas</span>" : "";
  const cuenta = (ms, verbo) =>
    "<span>" + verbo + ' <b data-cuenta-txt="' + ms + '">--</b></span>';
  let punto = '<span class="drop-dot"></span>', texto;
  if (e === "activo") {
    texto = "<strong>" + d.nombre + " abierto</strong>" + (ci !== null ? cuenta(ci, "cierra en") : "");
  } else if (e === "proximo") {
    punto = '<span class="franja-punto"></span>';
    texto = "<strong>" + d.nombre + "</strong>" + cuenta(ap, "sale en");
  } else {
    punto = '<span class="franja-punto"></span>';
    texto =
      "<strong>" + d.nombre + "</strong><span>cerrado el " +
      (ci !== null ? fechaLarga(ci) : "") + "</span>";
  }
  return '<div class="drop-franja">' + punto + texto + (e === "archivado" ? "" : piezas) + "</div>";
}

function dropPrincipal() {
  return (
    DROPS.find((d) => estadoDrop(d) === "activo" && d.cierre) ||
    DROPS.find((d) => estadoDrop(d) === "proximo")
  );
}

function renderDropHero() {
  const cont = document.getElementById("drop-modulo");
  if (!cont) return;
  const vivos = DROPS.filter((d) => estadoDrop(d) !== "archivado");
  const archivados = DROPS
    .filter((d) => estadoDrop(d) === "archivado")
    .sort((a, b) => b.id - a.id);
  const html = vivos.length
    ? vivos.map((d, i) => tarjetaDrop(d, i === 0)).join("")
    : '<article class="drop-card es-archivo grande"><div class="drop-eyebrow">SIN DROP ABIERTO</div>' +
      '<p class="drop-linea">El próximo lanzamiento se anuncia en Instagram.</p></article>';
  cont.innerHTML = html + archivados.map((d) => tarjetaDrop(d, false)).join("");
  pintarCuentas();
}

function fmtCuenta(ms) {
  const o = desglose(ms);
  const p = (n) => String(n).padStart(2, "0");
  return (o.d ? o.d + "D " : "") + p(o.h) + ":" + p(o.m) + ":" + p(o.s);
}

function pintarCuentas() {
  const t = ahora();
  document.querySelectorAll("[data-cuenta]").forEach((el) => {
    const o = desglose(Number(el.dataset.cuenta) - t);
    UNIDADES_CUENTA.forEach(([k]) => {
      const b = el.querySelector('[data-u="' + k + '"]');
      if (b) b.textContent = String(o[k]).padStart(2, "0");
    });
  });
  document.querySelectorAll("[data-cuenta-txt]").forEach((el) => {
    el.textContent = fmtCuenta(Number(el.dataset.cuentaTxt) - t);
  });
  const d = dropPrincipal();
  if (!d) return;
  const activo = estadoDrop(d) === "activo";
  const objetivo = momentoDrop(activo ? d.cierre : d.apertura);
  const txt = d.nombre.toUpperCase() + (activo ? " CIERRA EN " : " SALE EN ") + fmtCuenta(objetivo - t);
  document.querySelectorAll(".ticker-drop").forEach((el) => (el.textContent = txt));
}

// El primer elemento del ticker es la cuenta atrás del drop (en cada mitad del bucle)
function initTickerDrop() {
  if (!dropPrincipal()) return;
  document.querySelectorAll(".ticker-track").forEach((track) => {
    const hijos = [...track.children];
    const mk = () => {
      const f = document.createDocumentFragment();
      const s = document.createElement("span");
      s.className = "ticker-drop";
      const sep = document.createElement("span");
      sep.className = "sep";
      sep.textContent = "◆";
      f.append(s, sep);
      return f;
    };
    track.insertBefore(mk(), hijos[hijos.length / 2]);
    track.insertBefore(mk(), track.firstChild);
  });
}

function descargarCalendario(d) {
  const ini = momentoDrop(d.apertura);
  if (ini === null) return;
  const f = (ms) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const txt = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//IMPERIOWATCH//Drops//ES",
    "BEGIN:VEVENT", "UID:drop-" + d.id + "@imperiowatch",
    "DTSTAMP:" + f(ahora()), "DTSTART:" + f(ini), "DTEND:" + f(ini + 3600000),
    "SUMMARY:" + d.nombre + " · IMPERIOWATCH",
    "DESCRIPTION:Sale el " + d.nombre + " de IMPERIOWATCH. Pedidos por Instagram.",
    "BEGIN:VALARM", "TRIGGER:-PT15M", "ACTION:DISPLAY",
    "DESCRIPTION:" + d.nombre + " sale en 15 minutos", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([txt], { type: "text/calendar;charset=utf-8" }));
  a.download = "imperiowatch-drop-" + d.id + ".ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-cal]");
  if (b) descargarCalendario(getDrop(Number(b.dataset.cal)));
});

// Recarga la página cuando un drop abre o cierra mientras está abierta
function vigilarDrops() {
  if (document.getElementById("pedido-form")) return; // no se pierde un formulario a medias
  const firma = () => DROPS.map((d) => estadoDrop(d)).join();
  const inicial = firma();
  const comprobar = () => {
    if (firma() !== inicial) location.reload();
  };
  const armar = () => {
    const t = ahora();
    const futuros = DROPS.flatMap((d) => [momentoDrop(d.apertura), momentoDrop(d.cierre)]).filter(
      (m) => m !== null && m > t,
    );
    if (!futuros.length) return;
    const falta = Math.min(...futuros) - t;
    if (falta > 2147483647) return;
    setTimeout(() => {
      comprobar();
      armar();
    }, falta + 1000);
  };
  armar();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) sincronizarReloj().then(comprobar);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  relojListo.then(() => {
    renderCatalogo();
    renderProducto();
    renderDestacados();
    renderDropHero();
    initTickerDrop();
    pintarCuentas();
    setInterval(pintarCuentas, 1000);
    initReveal();
    initTiltAll();
    vigilarDrops();
  });
});
