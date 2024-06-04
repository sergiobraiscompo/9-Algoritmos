type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

const productos: LineaTicket[] = [
    {
      producto: {
        nombre: "Legumbres",
        precio: 2,
        tipoIva: "general",
      },
      cantidad: 2,
    },
    {
      producto: {
        nombre: "Perfume",
        precio: 20,
        tipoIva: "general",
      },
      cantidad: 3,
    },
    {
      producto: {
        nombre: "Leche",
        precio: 1,
        tipoIva: "superreducidoC",
      },
      cantidad: 6,
    },
    {
      producto: {
        nombre: "Lasaña",
        precio: 5,
        tipoIva: "superreducidoA",
      },
      cantidad: 1,
    },
];

interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

interface ResultadoLineaTicket {
    nombre: string;
    cantidad: number;
    precionSinIva: number;
    tipoIva: TipoIva;
    precioConIva: number;
};

export const calculaPorcentajeIva = (tipoIva: TipoIva): number => {
  if (!tipoIva) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  let porcentajeIva = 0;

  switch (tipoIva) {
    case "general": {
      porcentajeIva = 0.21;
      break;
    }

    case "reducido": {
      porcentajeIva = 0.1;
      break;
    }

    case "superreducidoA": {
      porcentajeIva = 0.05;
      break;
    }

    case "superreducidoB": {
      porcentajeIva = 0.04;
      break;
    }

    default: {
      return porcentajeIva;
    }
  }

  return porcentajeIva;
}

export const devuelvePrecioConIva = (precio: number, tipoIva: TipoIva): number => {
  if (!precio && !tipoIva) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const iva = calculaPorcentajeIva(tipoIva);

  const valorIva = precio * iva;

  return precio + valorIva;
}