import { TipoIva } from "./ticket-constantes";

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

export const devuelvePrecioConIva = (precio: number, tipoIva: TipoIva): string => {
  if (!precio || !tipoIva || precio <= 0) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const iva = calculaPorcentajeIva(tipoIva);

  const valorIva = precio * iva;
  const total = precio + valorIva;

  return total.toFixed(2);
}