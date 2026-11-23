// ================================================
// CATÁLOGO DE PRODUCTOS — IMPERIOWATCH
// Edita, añade o elimina objetos de este array para
// gestionar tu catálogo. Cada producto necesita:
// id, nombre, categoria, precio, estado, imagen, descripcion, tallas
// (el campo "tallas" se usa como opciones: color, correa, talla, etc.)
//
// ESTADO DE CADA PRODUCTO
//   estado: "disponible"  → se puede pedir con normalidad
//   estado: "agotado"     → se muestra con la etiqueta "Agotado" y no se puede pedir
// Para cambiarlo, edita ese valor en el producto y sube el cambio.
//
// DROPS: las fechas llevan hora y son SIEMPRE hora de España: "AAAA-MM-DDTHH:MM"
// (ej. "2026-11-30T20:00"). No dependen del reloj de quien visita la web.
// El id de cada producto debe ser ÚNICO (se usa en la URL de la ficha).
// ================================================
const DROPS = [
  { id: 1, nombre: "Drop 1", cierre: "2026-11-20T19:00" },
  { id: 2, nombre: "Drop 2", apertura: "2026-11-20T19:00" },
];

const PRODUCTOS = [
  {
    id: "rolex-batgirl",
    nombre: "Rlx GMT-Master II Batgirl",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexMasterIINegroAzul.png",
    descripcion:
      "Reloj de acero con esfera negra, bisel cerámico giratorio dividido en azul y negro, manecilla GMT azul y brazalete de acero estilo Jubilee.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-rootbeer",
    nombre: "Rlx GMT-Master II Oro",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexOro.png",
    descripcion:
      "Reloj con caja y brazalete de tres eslabones oyster fabricados en oro.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-batman",
    nombre: "Rlx GMT-Master II Batman",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexBatman.png",
    descripcion:
      "Reloj de acero con esfera negra, bisel cerámico bidireccional en azul y negro, manecilla de segundo huso horario azul y brazalete metálico de tres eslabones oyster.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-yacht-master",
    nombre: "Rlx Yacht Master Oro Rosa con Correa Oysterflex",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexOroRosaCierreGoma.png",
    descripcion:
      "Reloj con caja en oro rosa, esfera negra mate con el detalle Yacht-Master en rojo, bisel cerámico negro con relieve y correa de goma negro Oysterflex.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-bruce-wayne",
    nombre: "Rlx GMT-Master II Bruce Wayne",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexMasterIINegroGris.png",
    descripcion:
      "Reloj de acero con esfera negra, aguja GMT verde, bisel cerámico bicolor en negro y gris, y brazalete de acero de cinco eslabones Jubilee.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-oro-efera-celeste",
    nombre: "Rlx Cosmograph Daytona Oro Amarillo con Esfera Azul Celeste",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexDaytonaDoradoAzulCierreGoma.png",
    descripcion:
      "Reloj cronógrafo con caja de oro amarillo, bisel cerámico negro Tachymetre, esfera azul claro con subesferas negras en contraste y correa de goma negra Oysterflex.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-daytona-amarillo-dorado",
    nombre: "Rlx Cosmograph Daytona Oro Amarillo / Dorado",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexDaytonaDoradoCierreGoma.png",
    descripcion:
      "Reloj cronógrafo con caja en oro amarillo, bisel cerámico negro Tachymetre, esfera en tono dorado con subesferas negras y correa de goma negra Oysterflex.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-daytona-plata",
    nombre: "Rlx Cosmograph Daytona Acero Esfera Plata",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexDaytonaCierreGoma.png",
    descripcion:
      "Reloj cronógrafo con caja de acero/oro blanco, bisel cerámico negro Tachymetre, esfera en tono gris/plateado con subesferas negras y correa de goma negra Oysterflex.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-dorado-cierre-goma",
    nombre: "Rlx Yacht Master Oro Amarillo con Correa Oysterflex",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexDoradoCierreGoma.png",
    descripcion:
      "Reloj deportivo con caja en oro amarillo, bisel cerámico negro mate con números en relieve, esfera negra con texto en rojo y correa de goma negra Oysterflex.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-yacht-master-esfera-azul",
    nombre: "Rlx Yacht Master Acero Platino con Esfera Azul",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/Rolex.png",
    descripcion:
      "Reloj de acero con bisel metálico grabado en relieve, esfera en azul sol rayado con aguja del segundero en color rojo y correa de goma negra Oysterflex.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-yacht-master-42-titanio",
    nombre:
      "Rlx Yacht Master 42 en Titanio RLX Oro Blanco con Correa Oysterflex",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RolexYachtMaster42.png",
    descripcion:
      "Reloj deportivo con caja en tono plateado/titanio, bisel cerámico Cerachrom negro mate con números en relieve, esfera negra y correa de goma negra Oysterflex.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-daytona-platino",
    nombre: "Rolex Cosmograph Daytona Platino",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/daytona_platino_azul_hielo.jpeg",
    descripcion:
      "Reloj cronógrafo Rolex Cosmograph Daytona en platino, con esfera azul hielo, contadores con bordes marrones, bisel cerámico Cerachrom marrón y brazalete Oyster.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-daydate-platino-arabe",
    nombre: "Rolex Day-Date Esfera Azul Hielo Árabe",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/daydate_platino_arabe.jpeg",
    descripcion:
      "Reloj Rolex Day-Date con esfera azul hielo, números arábigos, bisel estriado y brazalete President, presentado con su set completo de caja y documentación.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-daydate-ororosa-romano",
    nombre: "Rolex Day-Date Oro Rosa",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/daydate_ororosa.jpeg",
    descripcion:
      "Reloj Rolex Day-Date fabricado en oro rosa Everose, marcadores de números romanos, bisel estriado y brazalete President.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-daytona-ororosa-oysterflex",
    nombre: "Rolex Cosmograph Daytona Oro Rosa Oysterflex",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/daytona_ororosa_oysterflex.jpeg",
    descripcion:
      "Reloj cronógrafo Rolex Cosmograph Daytona en oro rosa Everose, con esfera chocolate, bisel cerámico negro Cerachrom y correa deportiva Oysterflex de caucho negro.",
    tallas: ["Talla única"],
  },
  {
    id: "rolex-daydate-ororosa-chocolate",
    nombre: "Rolex Day-Date Oro Rosa Esfera Marrón Oscuro",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/daydate_ororosa_chocolate.jpeg",
    descripcion:
      "Reloj Rolex Day-Date en oro rosa Everose, destacando por su esfera marrón oscura color chocolate con acabado rayos de sol, bisel estriado clásico y el elegante brazalete President.",
    tallas: ["Talla única"],
  },
  {
    id: "cartier-diamantes-negros",
    nombre: "Crtr Santos de Cartier Iced Out en Diamantes Negros",
    categoria: "Relojes",
    precio: 54.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/CartierPerladoNegro.png",
    descripcion:
      "Reloj de forma cuadrada con acabado completo en pavé de diamantes/gemas en color negro tanto en la caja, el bisel y la esfera como en el brazalete metálico.",
    tallas: ["Talla única"],
  },
  {
    id: "cartier-santos-negro",
    nombre: "Crtr Santos de Cartier Negro con Esfera Negra",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/CartierSantosNegro.png",
    descripcion:
      "Reloj automático con caja y brazalete de acero en acabado negro mate, esfera negra con números romanos, indicador de fecha a las seis y corona con cabujón.",
    tallas: ["Talla única"],
  },
  {
    id: "cartier-santos-azul",
    nombre: "Crtr Santos de Cartier Acero con Esfera Azul Degradada",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/CartierSantosAzul.png",
    descripcion:
      "Reloj de acero con caja cuadrada, esfera azul degradada con números romanos, ventana de fecha, brazalete de acero con tornillos vistos y corona con cabujón azul.",
    tallas: ["Talla única"],
  },
  {
    id: "cartier-santos-blanco",
    nombre: "Crtr Santos de Cartier Acero con Esfera Blanca",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/CartierSantosBlanco.png",
    descripcion:
      "Reloj automático de acero con bisel satinado, esfera blanca plateada con números romanos negros, ventana de fecha, brazalete de acero con tornillos vistos y corona con cabujón azul.",
    tallas: ["Talla única"],
  },
  {
    id: "omega-snoopy",
    nombre:
      "Om x Sw Bioceramic MoonSwatch Mission to the Moonphase (Snoopy White)",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/OmegaBlanco.png",
    descripcion:
      "Reloj cronógrafo totalmente blanco fabricado en biocerámica, con correa de velcro blanca y subesfera superior derecha decorada con la ilustración del personaje Snoopy durmiendo sobre la luna.",
    tallas: ["Talla única"],
  },
  {
    id: "richard-mille-rafael-nadal",
    nombre: "RM 35-02 Rafael Nadal Carbono NTPT con Correa Azul",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RichardGomaAzul.png",
    descripcion:
      "Reloj de acero con esfera negra, bisel cerámico giratorio dividido en azul y negro, manecilla GMT azul y brazalete de acero estilo Jubilee.",
    tallas: ["Talla única"],
  },
  {
    id: "richard-mille-rafael-nadal-blanco",
    nombre: "RM 35-02 Rafael Nadal Cerámica Blanca con Correa Blanca",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RichardGomaBlanca.png",
    descripcion:
      "Reloj deportivo con caja de cerámica blanca, bisel interior azul claro, mecanismo totalmente esqueletizado visible y correa de goma blanca.",
    tallas: ["Talla única"],
  },
  {
    id: "richard-mille-rafael-nadal-negro",
    nombre: "RM 35-02 Rafael Nadal Carbono NTPT con Correa Negra",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RichardGomaNegra.png",
    descripcion:
      "Reloj de alta gama con caja de carbono NTPT veteada en tono negro/móvil, realce interior en azul cyan, movimiento automático esqueletizado y correa de goma negra.",
    tallas: ["Talla única"],
  },
  {
    id: "richard-mille-rm-53-01-azul",
    nombre: "RM 53-01 Tourbillon Pablo Mac Donough Zafiro con Correa Azul",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RichardTrasparenteGomaAzul.png",
    descripcion:
      "Reloj con caja transparente elaborada en cristal de zafiro, mecanismo tourbillon suspendido mediante cables de acero y correa de goma azul claro.",
    tallas: ["Talla única"],
  },
  {
    id: "richard-mille-rm-53-01-negro",
    nombre: "RM 53-01 Tourbillon Pablo Mac Donough Zafiro con Correa Negra",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RichardTrasparenteGomaNegra.png",
    descripcion:
      "Reloj con caja totalmente transparente de cristal de zafiro, estructura interna esqueletizada con puentes y cables metálicos, y correa de goma negra.",
    tallas: ["Talla única"],
  },
  {
    id: "richard-mille-rm-11-03-amarillo",
    nombre: "RM 11-03 Flyback Cerámica Blanca con Correa Amarilla",
    categoria: "Relojes",
    precio: 54.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/RichardBlancoAmarillo.png",
    descripcion:
      "Reloj cronógrafo con caja tonneau en cerámica blanca, esfera esqueleto con detalles amarillos, indicador de fecha grande, pulsadores blancos y correa de goma amarilla.",
    tallas: ["Talla única"],
  },
  {
    id: "ap-dorado",
    nombre: "AP Royal Oak Cronógrafo Oro Amarillo",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/ApDorado.png",
    descripcion:
      "Reloj cronógrafo con caja y brazalete integrado en oro amarillo, bisel octogonal con tornillos expuestos y esfera monogramada con patrón Grande Tapisserie en tono dorado con subesferas a juego.",
    tallas: ["Talla única"],
  },
  {
    id: "ap-negro",
    nombre: "AP Royal Oak Cronógrafo Cerámica Negra",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/ApFullBlack.png",
    descripcion:
      "Reloj cronógrafo fabricado integramente en cerámica negra mate cepillada, con esfera negra Grande Tapisserie, detalles y agujas en oro rosa, y brazalete de cerámica negra.",
    tallas: ["Talla única"],
  },
  {
    id: "ap-oro-rosa",
    nombre: "AP Royal Oak Cronógrafo Oro Rosa",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/ApOroRosa.png",
    descripcion:
      "Reloj cronógrafo con caja y brazalete en oro rosa, bisel octogonal característico y esfera Grande Tapisserie en tono marrón rosa con subesferas a juego.",
    tallas: ["Talla única"],
  },
  {
    id: "ap-plata-celeste",
    nombre: "AP Royal Oak Cronógrafo Acero con Esfera Azul Celeste",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/ApPlateadoEferaCeleste.png",
    descripcion:
      "Reloj cronógrafo con caja y brazalete integrado de acero inoxidable, bisel octogonal cepillado y esfera Grande Tapisserie en tono azul celeste.",
    tallas: ["Talla única"],
  },
  {
    id: "ap-perlado-blanco",
    nombre: "AP Royal Oak Iced Out Diamantes Blancos",
    categoria: "Relojes",
    precio: 54.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/ApPerladoBlanco.png",
    descripcion:
      "Reloj de tres agujas con ventana de fecha, completamente engastado en pavé de diamantes brillantes en la caja, el bisel octogonal, la esfera y el brazalete.",
    tallas: ["Talla única"],
  },
  {
    id: "ap-perlado-negro",
    nombre: "AP Royal Oak Iced Out Diamantes Negros",
    categoria: "Relojes",
    precio: 54.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/ApPerladoNegro.png",
    descripcion:
      "Reloj de tres agujas con ventana de fecha, cubierto por completo en pavé de diamantes en tono negro brillante, abarcando caja, bisel, esfera y brazalete.",
    tallas: ["Talla única"],
  },
  {
    id: "pack-lv-dorado",
    nombre: "Pack cinturon y cartera LV Dorado",
    categoria: "Cinturones",
    precio: 44.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/lvdorado.jpeg",
    descripcion:
      "Conjunto compuesto por cinturón con hebilla en acabado dorado, y billetera a juego. Incluye bolsa de compra y caja original de la marca.",
    tallas: ["110 cm"],
  },
  {
    id: "pack-lv-plata",
    nombre: "Pack cinturon y cartera LV Plata",
    categoria: "Cinturones",
    precio: 44.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/lvplata.jpeg",
    descripcion:
      "Conjunto compuesto por cinturón en lona Monogram con hebilla en acabado plateado, y billetera a juego. Incluye bolsa de compra y caja original de la marca.",
    tallas: ["110 cm"],
  },
  {
    id: "pack-lv-gris",
    nombre: "Pack cinturon y cartera LV Gris",
    categoria: "Cinturones",
    precio: 44.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/lv-gris.jpeg",
    descripcion:
      "Conjunto compuesto por cinturón en lona Monogram con hebilla en acabado negro, y billetera a juego. Incluye bolsa de compra y caja original de la marca.",
    tallas: ["110 cm"],
  },
  {
    id: "pack-hermes-dorado",
    nombre: "Pack cinturon y cartera Hrms Dorado",
    categoria: "Cinturones",
    precio: 44.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/hermesdorado.jpeg",
    descripcion:
      "Conjunto compuesto por cinturón de piel negra con hebilla en acabado dorado, y billetera a juego con detalle metálico. Incluye bolsa de compra y caja original de la marca.",
    tallas: ["110 cm"],
  },
  {
    id: "pack-hermes-plata",
    nombre: "Pack cinturon y cartera Hrms Plata",
    categoria: "Cinturones",
    precio: 44.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/hermesplata.jpeg",
    descripcion:
      "Conjunto compuesto por cinturón de piel negra con hebilla en acabado plateado, y billetera a juego con detalle metálico. Incluye bolsa de compra y caja original de la marca.",
    tallas: ["110 cm"],
  },
  {
    id: "pack-gucci-negro",
    nombre: "Pack cinturon y cartera GC Negro",
    categoria: "Cinturones",
    precio: 44.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/guccinegro.jpeg",
    descripcion:
      "Conjunto compuesto por cinturón en tono gris con hebilla en acabado negro mate, y billetera a juego. Incluye bolsa de compra y caja original de la marca.",
    tallas: ["110 cm"],
  },
  {
    id: "pack-gucci-verde-negro",
    nombre: "Pack cinturon y cartera GC Verde y Negro",
    categoria: "Cinturones",
    precio: 44.99,
    estado: "agotado",
    drop: 1,
    imagen: "assets/productos/gucciverdenegro.jpeg",
    descripcion:
      "Conjunto compuesto por cinturón en piel negra con detalle tricolor en la hebilla, y billetera a juego con franja verde y roja. Incluye bolsa de compra y caja original de la marca.",
    tallas: ["110 cm"],
  },
  {
    id: "ap-oro-rosa",
    nombre: "AP Royal Oak Cronógrafo Oro Rosa",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/ApOroRosa.png",
    descripcion:
      "Reloj cronógrafo con caja y brazalete en oro rosa, bisel octogonal característico y esfera Grande Tapisserie en tono marrón rosa con subesferas a juego.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-ap-plata-celeste",
    nombre: "AP Royal Oak Cronógrafo Acero con Esfera Azul Celeste",
    categoria: "Relojes",
    precio: 49.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/ApPlateadoEferaCeleste.png",
    descripcion:
      "Reloj cronógrafo con caja y brazalete integrado de acero inoxidable, bisel octogonal cepillado y esfera Grande Tapisserie en tono azul celeste.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-reloj-time-is-money",
    nombre: "Reloj Time Is Money con Correa Negra",
    categoria: "Relojes",
    precio: 34.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/timeismoney-Photoroom.png",
    descripcion:
      "Reloj de caja cuadrada en acero con esfera blanca, numeración romana, mensaje Time Is Money en rojo y correa de goma negra.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-omega-snoopy",
    nombre:
      "Om x Sw Bioceramic MoonSwatch Mission to the Moonphase (Snoopy White)",
    categoria: "Relojes",
    precio: 49.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/OmegaBlanco.png",
    descripcion:
      "Reloj cronógrafo totalmente blanco fabricado en biocerámica, con correa de velcro blanca y subesfera superior derecha decorada con la ilustración del personaje Snoopy durmiendo sobre la luna.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-bruce-wayne",
    nombre: "Rlx GMT-Master II Bruce Wayne",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/RolexMasterIINegroGris.png",
    descripcion:
      "Reloj de acero con esfera negra, aguja GMT verde, bisel cerámico bicolor en negro y gris, y brazalete de acero de cinco eslabones Jubilee.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-batman-goma",
    nombre: "Rlx GMT-Master II Batman con Correa de Goma Negra",
    categoria: "Relojes",
    precio: 49.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/batman-Photoroom.png",
    descripcion:
      "Reloj de acero con esfera negra, bisel cerámico giratorio dividido en azul y negro, y correa de goma negra.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-coke",
    nombre: "Rlx GMT-Master II Coke",
    categoria: "Relojes",
    precio: 49.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/coke-Photoroom.png",
    descripcion:
      "Reloj de acero con esfera negra, bisel cerámico giratorio dividido en rojo y negro y brazalete de acero estilo Oyster.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-daytona-panda",
    nombre: "Rlx Daytona Panda Acero",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/panda-Photoroom.png",
    descripcion:
      "Reloj cronógrafo de acero con esfera blanca, subesferas negras, bisel cerámico negro y brazalete de acero estilo Oyster.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-daytona-azul-hielo",
    nombre: "Rlx Daytona Esfera Azul Hielo con Bisel Marrón",
    categoria: "Relojes",
    precio: 49.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/pandaazul-Photoroom.png",
    descripcion:
      "Reloj cronógrafo de acero con esfera azul hielo, subesferas a juego, bisel cerámico marrón y brazalete de acero estilo Oyster.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-submariner-bicolor",
    nombre: "Rlx Submariner Acero y Oro con Esfera Negra",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/rlxdoradonegro-Photoroom.png",
    descripcion:
      "Reloj de buceo con esfera negra, bisel cerámico negro con detalles dorados y brazalete bicolor de acero y oro.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-sky-dweller-verde",
    nombre: "Rlx Sky-Dweller Esfera Verde con Bisel Estriado",
    categoria: "Relojes",
    precio: 49.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/rlxverde-Photoroom.png",
    descripcion:
      "Reloj de acero con esfera verde, bisel estriado, ventana de fecha a las 3 y brazalete de acero estilo Jubilee.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-submariner-azul",
    nombre: "Rlx Submariner Acero con Bisel Azul",
    categoria: "Relojes",
    precio: 49.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/submarine-Photoroom.png",
    descripcion:
      "Reloj de buceo de acero con esfera negra, bisel cerámico azul y brazalete de acero estilo Oyster.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-yacht-master-42",
    nombre: "Rlx Yacht-Master 42 Acero con Correa de Goma Negra",
    categoria: "Relojes",
    precio: 49.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/yatch42-Photoroom.png",
    descripcion:
      "Reloj de acero con esfera negra, bisel cerámico negro giratorio y correa de goma negra.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rm-nadal-azul",
    nombre: "RM 35-02 Rafael Nadal Carbono NTPT con Correa Azul",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/RichardGomaAzul.png",
    descripcion:
      "Reloj deportivo con caja de carbono negro y detalles azules, mecanismo esqueletizado visible y correa de goma azul.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rm-nadal-blanco",
    nombre: "RM 35-02 Rafael Nadal Cerámica Blanca con Correa Blanca",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/RichardGomaBlanca.png",
    descripcion:
      "Reloj deportivo con caja de cerámica blanca, bisel interior azul claro, mecanismo totalmente esqueletizado visible y correa de goma blanca.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rm-azul-celeste",
    nombre: "RM Cerámica Azul Celeste Esqueletizado con Correa Azul",
    categoria: "Relojes",
    precio: 59.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/rmazulcielo-Photoroom.png",
    descripcion:
      "Reloj deportivo con caja azul celeste, mecanismo esqueletizado visible y correa de goma azul a juego.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rm-azul-celeste-blanco",
    nombre: "RM Cerámica Blanca Esqueletizado con Correa Azul",
    categoria: "Relojes",
    precio: 59.99,
    estado: "disponible",
    drop: 2,
    imagen: "assets/productos/rmcorreazulesferablanca.png",
    descripcion:
      "Reloj deportivo con caja blanca, mecanismo esqueletizado visible y correa de goma azul.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rm-blanco",
    nombre: "RM Cerámica Blanca Esqueletizado con Correa Blanca",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/rmblanco-Photoroom.png",
    descripcion:
      "Reloj deportivo con caja de cerámica blanca, mecanismo esqueletizado visible y correa de goma blanca.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rm-blanco-numeros",
    nombre: "RM 11-03 Flyback Cerámica Blanca con Correa Blanca",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/rmblanconumeros-Photoroom.png",
    descripcion:
      "Reloj cronógrafo con caja de cerámica blanca, esfera esqueletizada con numeración grande y correa de goma blanca.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rm-ice-out",
    nombre: "RM Flyback Ice Out con Correa Negra",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/rmiceout-Photoroom.png",
    descripcion:
      "Reloj con caja transparente engastada de gemas, esfera esqueletizada con detalles rojos y correa de goma negra.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rm-negro",
    nombre: "RM Cerámica Negra Esqueletizado con Correa Negra",
    categoria: "Relojes",
    precio: 59.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/rmnegro-Photoroom.png",
    descripcion:
      "Reloj deportivo con caja negra, mecanismo esqueletizado visible y correa de goma negra.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-daytona-arabe-packaging",
    nombre:
      "Rlx Daytona Platino Esfera Azul Hielo Números Árabes (Automático con Packaging)",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/arabeautomatico.jpeg",
    descripcion:
      "Reloj cronógrafo de acero con esfera azul hielo y numeración árabe en las subesferas, bisel marrón y brazalete Oyster. Incluye packaging completo.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-daytona-azul-hielo-packaging",
    nombre: "Rlx Daytona Platino Esfera Azul Hielo (Automático con Packaging)",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/daytona_platino_azul_hielo.jpeg",
    descripcion:
      "Reloj cronógrafo de acero con esfera azul hielo, bisel marrón y brazalete Oyster. Incluye packaging completo.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-gmt-rootbeer-packaging",
    nombre: "Rlx GMT-Master II Root Beer (Automático con Packaging)",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/gmtmasterautomatico.jpeg",
    descripcion:
      "Reloj con esfera negra, bisel cerámico bicolor marrón y negro, y brazalete bicolor. Incluye packaging completo.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-day-date-azul-packaging",
    nombre:
      "Rlx Day-Date Esfera Azul con Bisel Estriado (Automático con Packaging)",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/rlxazulautomatico.jpeg",
    descripcion:
      "Reloj de acero con esfera azul, numeración romana, bisel estriado y brazalete President. Incluye packaging completo.",
    tallas: ["Talla única"],
  },
  {
    id: "d2-rolex-gmt-zombie-packaging",
    nombre: "Rlx GMT-Master II Zombie Bicolor (Automático con Packaging)",
    categoria: "Relojes",
    precio: 119.99,
    estado: "agotado",
    drop: 2,
    imagen: "assets/productos/zombieautomatico.jpeg",
    descripcion:
      "Reloj con esfera negra, bisel cerámico marrón y negro con detalles dorados y brazalete Jubilee bicolor. Incluye packaging completo.",
    tallas: ["Talla única"],
  },
];

function getProducto(id) {
  return PRODUCTOS.find((p) => p.id === id);
}

function getCategorias() {
  return [...new Set(PRODUCTOS.map((p) => p.categoria))];
}

const ESTADOS = ["disponible", "agotado"];

function getDrop(id) {
  return DROPS.find((d) => d.id === id);
}

// RELOJ
// La hora sale del servidor (cabeceras Date y Age de tu propio hosting) y después avanza
// con performance.now(), que no cambia aunque se toque la hora del sistema.
// Si la petición falla se usa el reloj del dispositivo.
let baseServidor = null;
let baseRendimiento = 0;

function ahora() {
  return baseServidor === null
    ? Date.now()
    : baseServidor + (performance.now() - baseRendimiento);
}

async function sincronizarReloj() {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 1500);
    const r = await fetch(location.href, {
      method: "HEAD",
      cache: "no-store",
      signal: ctl.signal,
    });
    clearTimeout(t);
    const fecha = Date.parse(r.headers.get("Date"));
    if (isNaN(fecha)) return;
    baseServidor = fecha + (Number(r.headers.get("Age")) || 0) * 1000;
    baseRendimiento = performance.now();
  } catch (e) {}
}

const relojListo = sincronizarReloj();

const FORMATO_MADRID = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Madrid",
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function partesMadrid(ms) {
  return Object.fromEntries(
    FORMATO_MADRID.formatToParts(new Date(ms)).map((x) => [x.type, x.value]),
  );
}

function offsetMadrid(ms) {
  const base = Math.floor(ms / 1000) * 1000;
  const o = partesMadrid(base);
  return (
    Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour, +o.minute, +o.second) -
    base
  );
}

const CACHE_MOMENTOS = new Map();

// "AAAA-MM-DDTHH:MM" (hora de España) → milisegundos UTC; null si no es válido
function momentoDrop(txt) {
  if (!txt) return null;
  if (CACHE_MOMENTOS.has(txt)) return CACHE_MOMENTOS.get(txt);
  const m =
    /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/.exec(txt);
  let ms = null;
  if (m) {
    const t0 = Date.UTC(
      +m[1],
      +m[2] - 1,
      +m[3],
      +(m[4] || 0),
      +(m[5] || 0),
      +(m[6] || 0),
    );
    ms = t0 - offsetMadrid(t0 - offsetMadrid(t0));
  }
  CACHE_MOMENTOS.set(txt, ms);
  return ms;
}

function fechaMadrid(ms) {
  const o = partesMadrid(ms);
  return `${o.year}-${o.month}-${o.day}`;
}

function estadoDrop(d) {
  if (!d) return "activo";
  const t = ahora();
  const apertura = momentoDrop(d.apertura);
  const cierre = momentoDrop(d.cierre);
  if (apertura !== null && t < apertura) return "proximo";
  if (cierre !== null && t >= cierre) return "archivado";
  return "activo";
}

// "disponible" | "agotado" | "cerrado" | "proximo"
function estadoDe(p) {
  const ed = estadoDrop(getDrop(p.drop));
  if (ed === "proximo") return "proximo";
  if (p.estado === "agotado") return "agotado";
  return ed === "archivado" ? "cerrado" : "disponible";
}

function puedeComprarse(p) {
  return !!p && estadoDe(p) === "disponible";
}

function fechaLarga(ms) {
  return new Date(ms).toLocaleDateString("es-ES", {
    timeZone: "Europe/Madrid",
    day: "numeric",
    month: "long",
  });
}

function horaMadrid(ms) {
  return new Date(ms).toLocaleTimeString("es-ES", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
}

function diasHasta(ms) {
  const dia = (s) => Date.parse(s + "T00:00:00Z");
  return Math.round(
    (dia(fechaMadrid(ms)) - dia(fechaMadrid(ahora()))) / 86400000,
  );
}

// "hoy a las 20:00 (hora de España)", "mañana a las…", "el 30 de noviembre a las…"
function cuando(ms) {
  const dias = diasHasta(ms);
  const dia =
    dias === 0 ? "hoy" : dias === 1 ? "mañana" : "el " + fechaLarga(ms);
  return `${dia} a las ${horaMadrid(ms)} (hora de España)`;
}

// PIEZAS: cada producto cuenta como una pieza. Se calcula solo a partir de PRODUCTOS.
function piezasDrop(d) {
  const lista = PRODUCTOS.filter((p) => p.drop === d.id);
  const quedan = lista.filter((p) => p.estado !== "agotado").length;
  return { total: lista.length, quedan };
}

// Desglose de una cuenta atrás en días, horas, minutos y segundos
function desglose(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function avisoNoDisponible(p) {
  const d = getDrop(p.drop);
  const nombre = d ? d.nombre : "este drop";
  const e = estadoDe(p);
  if (e === "proximo") {
    return {
      titulo: "Esta pieza aún no ha salido",
      texto: `Sale con el ${nombre} ${cuando(momentoDrop(d.apertura))}. Síguenos en Instagram para no perderla.`,
    };
  }
  if (e === "cerrado") {
    return {
      titulo: "Este drop ya ha cerrado",
      texto: `Las piezas del ${nombre} no vuelven a salir. Mira lo que hay en el drop actual.`,
    };
  }
  return {
    titulo: "Este producto está agotado",
    texto:
      "Las piezas de cada drop no se reponen. Mira lo que hay en el drop actual.",
  };
}

// Aviso en consola si algún id está repetido o algún estado o drop no es válido
(function validarCatalogo() {
  const vistos = new Set();
  PRODUCTOS.forEach((p) => {
    if (vistos.has(p.id))
      console.warn("[IMPERIOWATCH] id de producto repetido:", p.id);
    vistos.add(p.id);
    if (!ESTADOS.includes(p.estado))
      console.warn(
        "[IMPERIOWATCH] estado no válido en",
        p.id,
        "→",
        p.estado,
        '(usa "disponible" o "agotado")',
      );
    if (!getDrop(p.drop))
      console.warn(
        "[IMPERIOWATCH] drop no válido en",
        p.id,
        "→",
        p.drop,
        "(debe existir en DROPS)",
      );
  });
  const ids = new Set();
  DROPS.forEach((d) => {
    if (ids.has(d.id))
      console.warn("[IMPERIOWATCH] id de drop repetido:", d.id);
    ids.add(d.id);
    ["apertura", "cierre"].forEach((c) => {
      if (d[c] && momentoDrop(d[c]) === null)
        console.warn(
          "[IMPERIOWATCH]",
          c,
          "no válida en",
          d.nombre,
          "→",
          d[c],
          '(usa "AAAA-MM-DDTHH:MM")',
        );
    });
    const a = momentoDrop(d.apertura),
      c = momentoDrop(d.cierre);
    if (a !== null && c !== null && a >= c)
      console.warn("[IMPERIOWATCH] apertura posterior al cierre en", d.nombre);
  });
})();
