import { calculaResultadoTotalTicket, calculaTicket, creaResultadoLineaTicket } from "./calcula-ticket";
import { ResultadoLineaTicket, ResultadoTotalTicket } from "./ticket-constantes";

describe('creaResultadoLineaTicket', () => {    
    it.each([
        [{producto: {nombre: "Legumbres", precio: 2, tipoIva: "general"}, cantidad: 2}, {nombre: "Legumbres", cantidad: 2, precionSinIva: 2, tipoIva: "general", precioConIva: 2.42}],
        [{producto: {nombre: "Perfume", precio: 20, tipoIva: "general"}, cantidad: 3}, {nombre: "Perfume", cantidad: 3, precionSinIva: 20, tipoIva: "general", precioConIva: 24.2}],
        [{producto: {nombre: "Leche", precio: 1, tipoIva: "superreducidoC"}, cantidad: 6}, {nombre: "Leche", cantidad: 6, precionSinIva: 1, tipoIva: "superreducidoC", precioConIva: 1}],
        [{producto: {nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA"}, cantidad: 1}, {nombre: "Lasaña", cantidad: 1, precionSinIva: 5, tipoIva: "superreducidoA", precioConIva: 5.25}]
    ]) ("Si el producto es %s, la línea completa del ticket ha de ser %s", (lineaTicket, resultadoEsperado) => {

        // Act
        const resultado = creaResultadoLineaTicket(lineaTicket);

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    })
});

describe('calculaTicket', () => {    
    it("Obtiene un array de productos con cantidad y devuelve el total del ticket sin IVA, la línea completa del ticket ha de ser ", () => {
        const resultadoLineasTicket: ResultadoLineaTicket[] = [
            {nombre: "Legumbres", cantidad: 2, precionSinIva: 2, tipoIva: "general", precioConIva: 2.42},
            {nombre: "Perfume", cantidad: 3, precionSinIva: 20, tipoIva: "general", precioConIva: 24.2},
            {nombre: "Leche", cantidad: 6, precionSinIva: 1, tipoIva: "superreducidoC", precioConIva: 1},
            {nombre: "Lasaña", cantidad: 1, precionSinIva: 5, tipoIva: "superreducidoA", precioConIva: 5.25},
        ]

        const resultadoEsperado: ResultadoTotalTicket = {
            totalSinIva: 75,
            totalConIva: 88.69,
            totalIva: 13.69,
        }

        // Act
        const resultado = calculaTicket(resultadoLineasTicket);

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    })
});
