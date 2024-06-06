import { devuelvePrecioConIva } from "./calcula-ticket.helper";
import "./style.css";
import { LineaTicket, Producto, ResultadoLineaTicket } from "./ticket-constantes";

export const calculaTicket = (lineasTicket: LineaTicket[]) => {
  if (!lineasTicket) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const totalSinIva = 0;
  const calcularTotalSinIva = lineasTicket.reduce((acc, linea) => acc + linea.producto.precio, totalSinIva);
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

export const creaResultadoLineaTicket = (producto: Producto, cantidad: number): ResultadoLineaTicket => {
  if (!producto || !cantidad || cantidad <= 0) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  return {
    nombre: producto.nombre,
    cantidad: cantidad,
    precionSinIva: producto.precio,
    tipoIva: producto.tipoIva,
    precioConIva: parseFloat(devuelvePrecioConIva(producto.precio, producto.tipoIva)),
  };
}