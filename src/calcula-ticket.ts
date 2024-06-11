import "./style.css";
import { devuelvePrecioConIva } from "./calcula-ticket.helper";
import { LineaTicket, Producto, ResultadoLineaTicket } from "./ticket-constantes";

export const calculaTicket = (lineasTicket: LineaTicket[]) => {
  if (!lineasTicket) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const arrayResultadosLinea = [];

  const devuelveArrayResultadosLinea = lineasTicket.map((lineaTicket) => {

    if (linea) { 
      throw new Error("Se ha producido un error con el producto"); 
    }

    return creaResultadoLineaTicket(lineaTicket);
  });

  const totalSinIva = 0;
  const totalConIva = 0;
  const totalIva = 0;

  const calcularTotalConIva = arrayResultadosLinea.reduce((acc, precio) => acc + precio, totalConIva);
  const calcularTotalIva = arrayResultadosLinea.reduce((acc, precio) => acc + precio, totalIva);
  const calcularTotalSinIva = arrayResultadosLinea.reduce((acc, linea) => acc + linea.producto.precio, totalSinIva);

  return {
    totalSinIva: calcularTotalSinIva,
    totalIva: calcularTotalIva,
    totalConIva: calcularTotalConIva,
  };
};

// export const creaLineaTicket = (producto: Producto, cantidad: number): LineaTicket => {
//   if (!producto || !cantidad || cantidad <= 0) { 
//     throw new Error("Se ha producido un error con el producto"); 
//   }

//   return {
//     producto,
//     cantidad
//   }
// }

export const creaResultadoLineaTicket = (lineaTicket: LineaTicket): ResultadoLineaTicket => {
  if (!lineaTicket.producto || !lineaTicket.cantidad || lineaTicket.cantidad <= 0) {
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