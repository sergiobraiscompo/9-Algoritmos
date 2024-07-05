import "./style.css";
import { calculaPorcentajeIva, devuelvePrecioConIva , calcularTotalSinIva, calcularTotalConIva, calcularTotalIva, devuelveValorIva, devuelveIvasDesglosados} from "./calcula-ticket.helper";
import { LineaTicket, Producto, ResultadoLineaTicket, ResultadoTotalTicket, TicketFinal, TotalPorTipoIva, productos } from "./ticket-constantes";

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  if (!lineasTicket) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const lineasTicketCompletas: ResultadoLineaTicket[] = [];

  const creaLineasTicketCompletas = lineasTicket.map((lineaTicket) => {
    const lineaTicketCompleta: ResultadoLineaTicket = creaResultadoLineaTicket(lineaTicket);
    lineasTicketCompletas.push(lineaTicketCompleta);
  });

  const totalTicket: ResultadoTotalTicket = calculaResultadoTotalTicket(lineasTicketCompletas);

  const ivasDesglosados: TotalPorTipoIva[] = devuelveIvasDesglosados(lineasTicketCompletas);

  return {
    lineas: lineasTicketCompletas,
    total: totalTicket,
    desgloseIva: ivasDesglosados
  };
};

export const creaResultadoLineaTicket = (lineaTicket: LineaTicket): ResultadoLineaTicket => {
  const producto = lineaTicket.producto;
  const cantidad = lineaTicket.cantidad;
  
  if (!producto || !cantidad || cantidad <= 0) {
    throw new Error("Se ha producido un error con el producto"); 
  }

  return {
    nombre: producto.nombre,
    cantidad: cantidad,
    precioSinIva: producto.precio,
    tipoIva: producto.tipoIva,
    precioConIva: parseFloat(devuelvePrecioConIva(producto)),
  };
}

export const calculaResultadoTotalTicket = (resultadoLineasTicket: ResultadoLineaTicket[]): ResultadoTotalTicket => {
  if (!resultadoLineasTicket) {
    throw new Error("Se ha producido un error con el producto"); 
  }

  const preciosSinIva: number[] = [];
  const preciosConIva: number[] = [];
  const ivasPrecios: number[] = [];

  resultadoLineasTicket.map ((resultadoLineaTicket) => {
    if (!resultadoLineaTicket) {
      throw new Error("Se ha producido un error con el producto"); 
    }

    // TODO: usar array methods con la correspondiente función auxiliar
    // calcularTotalSinIva
    preciosSinIva.push(resultadoLineaTicket.precioSinIva);
    
    // calcularTotalConIva
    preciosConIva.push(resultadoLineaTicket.precioSinIva);
    
    // calcularTotalIva
    ivasPrecios.push(parseFloat(devuelveValorIva(resultadoLineaTicket.precioSinIva, resultadoLineaTicket.tipoIva)));
  });

  const totalPreciosSinIva: number = calcularTotalSinIva(preciosSinIva);
  const totalPreciosConIva: number = calcularTotalConIva(preciosConIva);
  const totalIvasProducto: number = calcularTotalIva(ivasPrecios);

  return {
    totalSinIva: totalPreciosSinIva,
    totalConIva: totalPreciosConIva,
    totalIva: totalIvasProducto,
  }
}
