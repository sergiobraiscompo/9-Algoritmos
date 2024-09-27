import { Producto, ResultadoLineaTicket, ResultadoTotalTicket, TipoIva, TotalPorTipoIva } from "./ticket-constantes";

// Genera lineas ticket completas
export const creaResultadoLineaTicket = (producto: Producto, cantidad: number, precioConIva: number): ResultadoLineaTicket => {

  if (!producto || !cantidad || cantidad <= 0 ) {
    throw new Error("Se ha producido un error con el producto"); 
  }

  return {
    nombre: producto.nombre,
    cantidad: cantidad,
    precioSinIva: producto.precio * cantidad,
    tipoIva: producto.tipoIva,
    precioConIva: precioConIva * cantidad,
  };
}


// Devuelve el porcentaje del tipo de iva indicado
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


// Devuelve el valor del iva del producto indicado
export const devuelveValorIva = (precio: number, tipoIva: TipoIva): number => {

  if (!precio || !tipoIva || precio <= 0) { 
    throw new Error("Se ha producido un error con el producto"); 
  }
  const iva = calculaPorcentajeIva(tipoIva);
  const valorIva = precio * iva;
  
  return valorIva;
}


// Usadas para el total del ticket
export const calcularTotalSinIva = (preciosSinIva: number[]): number => {
  const totalSinIva = preciosSinIva.reduce((acc, precioSinIva) => acc + precioSinIva)
  return totalSinIva;
}

export const calcularTotalConIva = (preciosConIva: number[]): number => {
  const totalConIva = preciosConIva.reduce((acc, precioConIva) => acc + precioConIva)
  return totalConIva;
}

export const calcularTotalIva = (ivasPrecios: number[]): number => {
  console.log(ivasPrecios)
  const totalIva = ivasPrecios.reduce((acc, totalIva) => acc + totalIva)
  console.log(totalIva)
  return totalIva;
}


// Devuelve el valor total de cada tipo de iva
export const devuelveIvasDesglosados = (resultadoLineasTicket: ResultadoLineaTicket[]): TotalPorTipoIva[] => {
  if (!resultadoLineasTicket) {
    throw new Error("Se ha producido un error con el producto"); 
  }
  
  const resultado: TotalPorTipoIva[] = resultadoLineasTicket.reduce(
    (acumulador: TotalPorTipoIva[], resultadoLineaTicket: ResultadoLineaTicket) => {
      const cuantia = devuelveValorIva(resultadoLineaTicket.precioSinIva, resultadoLineaTicket.tipoIva);
      
      return cuantia > 0
        ? [...acumulador, { tipoIva: resultadoLineaTicket.tipoIva, cuantia: parseFloat(cuantia.toFixed(2)) }]
        : acumulador;
    },
    []
  );

  return resultado;
}