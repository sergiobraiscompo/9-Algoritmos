import { LineaTicket, Producto, ResultadoLineaTicket, TipoIva, TotalPorTipoIva } from "./ticket-constantes";

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

  return total.toString();
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

export const devuelveIvasDesglosados = (lineasTicketCompletas: ResultadoLineaTicket[]): TotalPorTipoIva[] => {
  if (!lineasTicket) {
    throw new Error("Ha ocurrido un problema con las líneas recibidas.");
  }

  const tiposIva: TipoIva[] = ["general", "reducido", "superreducidoA", "superreducidoB", "superreducidoC", "sinIva"];

  // Recorre el array de ivas y devuelve el total por cada tipo de iva
  const resultado: TotalPorTipoIva[] = tiposIva.reduce((acumulador: TotalPorTipoIva[], tipoIva: TipoIva) => {
    // Variables necesarias para el desglose
    const lineasConProductoTipoIva = lineasTicketCompletas.filter((lineaTicketCompleta) => lineaTicketCompleta.tipoIva === tipoIva);
    const valoresIva = lineasConProductoTipoIva.map((lineaConProductoTipoIva) => {
      lineasTicketCompletas.map((lineaTicketCompleta)=> {
        const precio = lineaTicketCompleta.precionSinIva;
        const unidades = lineaTicketCompleta.cantidad;
        const tipoIva = lineaTicketCompleta.tipoIva;
        
        return unidades * parseFloat(devuelveValorIva(precio, tipoIva));
      })
    });
    
    const cantidad: number = valoresIva.reduce((acc, valor) => acc + valor, total)
    const total = 0;

    // Devuelve un array TotalPorTipoIva[]
    return lineasConProductoTipoIva.length > 0
        ? [...acumulador, { tipoIva : tipoIva, cuantia: cantidad }]
        : acumulador;
    },
  []
  );

  return resultado;
}