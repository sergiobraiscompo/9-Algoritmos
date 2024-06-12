import "./style.css";
import { calculaPorcentajeIva, devuelvePrecioConIva } from "./calcula-ticket.helper";
import { LineaTicket, Producto, ResultadoLineaTicket, ResultadoTotalTicket } from "./ticket-constantes";

export const calculaTicket = (lineasTicket: LineaTicket[]) => {
  if (!lineasTicket) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const devuelveArrayResultadosLinea = lineasTicket.map((lineaTicket) => {
    if (!lineaTicket) {
      throw new Error("Se ha producido un error con el producto"); 
      }
      
    return creaResultadoLineaTicket(lineaTicket);
    });
      
    return {
      lineas: ResultadoLineaTicket[];
      total: ResultadoTotalTicket;
      desgloseIva: TotalPorTipoIva[];
    };
};

const calculaResultadoTotalTicket = (resultadoLineasTicket: ResultadoLineaTicket[]): ResultadoTotalTicket => {
  const preciosConIva: number[] = [];
  const preciosSinIva: number[] = [];
  const ivasProducto: number[] = [];
  
  const totalPreciosSinIva: number = 0;
  const totalPreciosConIva: number = 0;
  const totalIvasProducto: number = 0;

  const devuelveArraysPrecios = () => resultadoLineasTicket.map ((resultadoLineaTicket) => {
    if (!resultadoLineaTicket) {
      throw new Error("Se ha producido un error con el producto"); 
      }
      
    const precioSinIva = resultadoLineaTicket.cantidad * resultadoLineaTicket.precionSinIva;
    const precioConIva = resultadoLineaTicket.cantidad * resultadoLineaTicket.precioConIva;
    const ivaProducto = calculaPorcentajeIva(resultadoLineaTicket.tipoIva);

    preciosConIva.push(precioConIva);
    preciosSinIva.push(precioConIva);
    ivasProducto.push(ivaProducto);
  });

  const totalSinIva ,
  const totalConIva ,
  const totalIva ,

  return {
    totalSinIva: calculaTotalSinIva,
    totalConIva: calcularTotalConIva,
    totalIva: calcularTotalIva,
  }
}

export const creaResultadoLineaTicket = (lineaTicket: LineaTicket): ResultadoLineaTicket => {
  const producto = lineaTicket.producto;
  const cantidad = lineaTicket.cantidad;

  if (!producto || !cantidad || cantidad <= 0) {
    throw new Error("Se ha producido un error con el producto"); 
  }

  return {
    nombre: producto.nombre,
    cantidad: cantidad,
    precionSinIva: producto.precio,
    tipoIva: producto.tipoIva,
    precioConIva: parseFloat(devuelvePrecioConIva(producto)),
  };
}