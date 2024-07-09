import { LineaTicket, Producto, ResultadoLineaTicket, TipoIva, TotalPorTipoIva } from "./ticket-constantes";

// BORRAR SI NO ES NECESARIO Create our number formatter.
const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});


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

export const devuelvePrecioConIva = (producto: Producto): string => {
  const precio = producto.precio;
  const tipoIva = producto.tipoIva;

  if (!precio || !tipoIva || precio <= 0) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const valorIva = parseFloat(devuelveValorIva(precio, tipoIva));
  const total = precio + valorIva;

  return total.toFixed(2);
}

export const devuelveValorIva = (precio: number, tipoIva: TipoIva): string => {

  if (!precio || !tipoIva || precio <= 0) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const iva = calculaPorcentajeIva(tipoIva);

  const valorIva = precio * iva;

  return valorIva.toFixed(2);
}

// Solo usadas para el resultadoFinalTicket
export const calcularTotalSinIva = (preciosSinIva: number[]): number => {
  const totalSinIva = preciosSinIva.reduce((acc, precioSinIva) => acc + precioSinIva)
  return totalSinIva;
}
  
export const calcularTotalConIva = (preciosConIva: number[]): number => {
  const totalConIva = preciosConIva.reduce((acc, precioConIva) => acc + precioConIva)
  return totalConIva;
}
  
export const calcularTotalIva = (ivasPrecios: number[]): number => {
  const totalIva = ivasPrecios.reduce((acc, totalIva) => acc + totalIva)
  return totalIva;
}

export const devuelveIvasDesglosados = (resultadoLineasTicketCompletas: ResultadoLineaTicket[]): TotalPorTipoIva[] => {
  if (!resultadoLineasTicketCompletas) {
    throw new Error("Ha ocurrido un problema con las líneas recibidas.");
  }

  const infoProductos: TotalPorTipoIva[]= [];

  resultadoLineasTicketCompletas.map((resultadoLineaticketCompleta) => {
    // Elementos necesarios del producto
    const precio: number = resultadoLineaticketCompleta.precioSinIva;
    const unidades: number = resultadoLineaticketCompleta.cantidad;
    const tipoIva: TipoIva = resultadoLineaticketCompleta.tipoIva;
    const valorIva = parseFloat(devuelveValorIva(precio, tipoIva));

    // Iva total del producto
    const precioTotal: number = unidades * valorIva;

    console.log("Total Iva producto:", valorIva * unidades)
    infoProductos.push({ tipoIva: tipoIva, cuantia: Number(formatter.format(precioTotal)) });
    },
  []
  );

  // Devuelve una lista con el total por tipo de Iva
  const resultado: TotalPorTipoIva[] = infoProductos.reduce((acc: TipoIva, producto) => {
    // Elementos necesarios del producto
    const tipoIva: TipoIva = producto.tipoIva;
    const precio: number = producto.cuantia;

    return precio > 0
      ? [...acc, { tipoIva: tipoIva, precio }]
      : acc;
    },
  []
  );

  return resultado;
  }