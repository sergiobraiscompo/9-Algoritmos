import "./style.css";
import { LineaTicket, Producto } from "./ticket-constantes";

const calculaTicket = (lineasTicket: LineaTicket[]) => {
  if (!lineasTicket) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  lineasTicket.reduce();
};

export const creaLineaTicket = (producto: Producto, cantidad: number): LineaTicket => {
  if (!producto || !cantidad || cantidad <= 0) { 
    throw new Error("Se ha producido un error con el producto"); 
  }

  return {
    producto,
    cantidad
  }
}

