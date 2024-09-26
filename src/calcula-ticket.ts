import "./style.css";
import { calcularTotalSinIva, calcularTotalConIva, calcularTotalIva, devuelveValorIva, creaResultadoLineaTicket, devuelveIvasDesglosados } from "./calcula-ticket.helper";
import { LineaTicket, ResultadoLineaTicket, ResultadoTotalTicket, TicketFinal, TotalPorTipoIva, productos } from "./ticket-constantes";

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const lineas: ResultadoLineaTicket[] = [];
  const preciosSinIva: number[] = [];
  const preciosConIva: number[] = [];
  const ivasPrecios: number[] = [];

  // Devuelve las lineas del ticket completas
  lineasTicket.map((lineaTicket) => {
    // Extrae los precios y los añade a las listas de precios
    const precioSinIva = lineaTicket.producto.precio;
    const ivaProducto = devuelveValorIva(lineaTicket.producto.precio, lineaTicket.producto.tipoIva);
    const precioConIva = precioSinIva + ivaProducto;

    preciosSinIva.push(precioSinIva)
    preciosConIva.push(precioConIva)
    ivasPrecios.push(ivaProducto)

    // Añade la linea completa del producto
    lineas.push(creaResultadoLineaTicket(lineaTicket.producto, lineaTicket.cantidad, precioConIva));
  })

  // Devuelve el total del ticket
  const total: ResultadoTotalTicket = {
    totalSinIva: calcularTotalSinIva(preciosSinIva),
    totalConIva: calcularTotalConIva(preciosConIva),
    totalIva: calcularTotalIva(ivasPrecios)
  }

  return {
    lineas: lineas,
    total: total,
    desgloseIva: devuelveIvasDesglosados(lineas)
  }
}

console.log("Productos", "\n", calculaTicket(productos).lineas, "\n", "Total", "\n", calculaTicket(productos).total, "\n", "Ivas Desglosados", "\n", calculaTicket(productos).desgloseIva);