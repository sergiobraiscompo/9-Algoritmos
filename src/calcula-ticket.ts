import "./style.css";
import { calculaPorcentajeIva, devuelvePrecioConIva , calcularTotalSinIva, calcularTotalConIva, calcularTotalIva, devuelveValorIva} from "./calcula-ticket.helper";
import { LineaTicket, Producto, ResultadoLineaTicket, ResultadoTotalTicket, productos } from "./ticket-constantes";

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

    const resultadosLineasTicket = [];
    const totalDesglosadoPorTipoIva = [];
    const totalTicket = 0;
      
    return {
      lineas: resultadosLineasTicket,
      total: calculaResultadoTotalTicket,
      desgloseIva: totalDesglosadoPorTipoIva,
    };
};

export const calculaResultadoTotalTicket = (resultadoLineasTicket: ResultadoLineaTicket[]): ResultadoTotalTicket => {
  if (!resultadoLineasTicket) {
    throw new Error("Se ha producido un error con el producto"); 
  }

  const preciosConIva: number[] = [];
  const preciosSinIva: number[] = [];
  const ivasPrecios: number[] = [];

  // Añade los elementos a las arrays previamente creadas, TODO comprobar que funciona correctamente
  resultadoLineasTicket.map ((resultadoLineaTicket) => {
    if (!resultadoLineaTicket) {
      throw new Error("Se ha producido un error con el producto"); 
    }

    const valorIva = 0;
    const totalIvaProducto = valorIva.toFixed(2);

    const precioSinIva = resultadoLineaTicket.cantidad * resultadoLineaTicket.precionSinIva;
    const precioConIva = resultadoLineaTicket.cantidad * resultadoLineaTicket.precioConIva;
    const ivaProducto = resultadoLineaTicket.cantidad * parseFloat(devuelveValorIva(resultadoLineaTicket.precionSinIva, resultadoLineaTicket.tipoIva));
  

    preciosConIva.push(precioConIva);
    preciosSinIva.push(precioSinIva);
    ivasPrecios.push(ivaProducto);
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

export const creaResultadoLineaTicket = (lineaTicket: LineaTicket): ResultadoLineaTicket => {
  const producto = lineaTicket.producto;
  const cantidad = lineaTicket.cantidad;
  
  if (!producto || !cantidad || cantidad <= 0) {
    throw new Error(`Se ha producido un error con el producto, ${producto}, ${cantidad}`); 
  }

  return {
    nombre: producto.nombre,
    cantidad: cantidad,
    precionSinIva: producto.precio,
    tipoIva: producto.tipoIva,
    precioConIva: parseFloat(devuelvePrecioConIva(producto)),
  };
}