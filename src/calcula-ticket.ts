import "./style.css";

interface ResultadoTotalTicket {
    totalSinIva: number;
    totalConIva: number;
    totalIva: number;
};
  
  interface TotalPorTipoIva {
    tipoIva: TipoIVA;
    cuantia : number;
};
  
  interface TicketFinal {
    lineas: ResultadoLineaTicket[];
    total: ResultadoTotalTicket;
    desgloseIva: TotalPorTipoIva[];
};

const calculaTicket = (lineasTicket: LineaTicket[]) => {
    if (!lineasTicket) { 
        throw new Error("Se ha producido un error con el producto"); 
    }
};

