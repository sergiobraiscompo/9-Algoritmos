import "./style.css";
import { calculaPorcentajeIva, devuelvePrecioConIva , calcularTotalSinIva, calcularTotalConIva, calcularTotalIva, devuelveValorIva} from "./calcula-ticket.helper";
import { LineaTicket, Producto, ResultadoLineaTicket, ResultadoTotalTicket, productos } from "./ticket-constantes";

export const calculaTicket = (lineasTicket: ResultadoLineaTicket[]): ResultadoTotalTicket => {
  if (!lineasTicket) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const arrayPreciosSinIva: number[] = [];
  const arrayPreciosConIva: number[] = [];
  const arrayIvas: number[] = [];

  // Crea un array con los precios totales de los productos     
  lineasTicket.map((lineaTicket) => {
    if (!lineaTicket) {
      throw new Error("Se ha producido un error con el producto");
    }
  
    const cantidad = lineaTicket.cantidad;

    const precioSinIva = cantidad * lineaTicket.precionSinIva;
    const precioConIva = cantidad * lineaTicket.precioConIva;
    const ivaProducto = cantidad * parseFloat(devuelveValorIva(lineaTicket.precionSinIva, lineaTicket.tipoIva));

    arrayPreciosSinIva.push(precioSinIva);
    arrayPreciosConIva.push(precioConIva);
    arrayIvas.push(ivaProducto);
  });


  return {
    totalSinIva: calcularTotalSinIva(arrayPreciosSinIva),
    totalConIva: calcularTotalConIva(arrayPreciosConIva),
    totalIva: calcularTotalIva(arrayIvas)
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
    precionSinIva: producto.precio,
    tipoIva: producto.tipoIva,
    precioConIva: parseFloat(devuelvePrecioConIva(producto)),
  };
}

export const calculaResultadoTotalTicket = (resultadoLineasTicket: ResultadoLineaTicket[]): ResultadoTotalTicket => {
  if (!resultadoLineasTicket) {
    throw new Error("Se ha producido un error con el producto"); 
  }

  const preciosConIva: number[] = [];
  const preciosSinIva: number[] = [];
  const ivasPrecios: number[] = [];

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
