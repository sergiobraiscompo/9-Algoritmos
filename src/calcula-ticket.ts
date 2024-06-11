import "./style.css";
import { devuelvePrecioConIva } from "./calcula-ticket.helper";
import { LineaTicket, Producto, ResultadoLineaTicket } from "./ticket-constantes";

export const calculaTicket = (lineasTicket: LineaTicket[]) => {
  if (!lineasTicket) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  const totalSinIva = 0;
  const totalConIva = lineasTicket.map((linea): number => {
    return parseInt(devuelvePrecioConIva(linea.producto));
  })

  const totalIva = 0;

  const calcularTotalSinIva = lineasTicket.reduce((acc, linea) => acc + linea.producto.precio, totalSinIva);
  const calcularTotalConIva = lineasTicket.reduce((acc, linea) => acc + linea.producto.precio, totalConIva);
  const calcularIva = lineasTicket.reduce((acc, linea) => acc + linea.producto.precio, totalIva);

  return {
    totalSinIva: calcularTotalSinIva,
    totalConIva: calcularTotalConIva,
    totalIva: calcularIva,
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