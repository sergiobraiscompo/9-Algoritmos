import { creaLineaTicket } from "./calcula-ticket";

describe('creaLineaTicket', () => {
    it.each([
        [{producto: {nombre: "Legumbres", precio: 2, tipoIva: "general"}}, 2, {producto: {nombre: "Legumbres", precio: 2, tipoIva: "general"}, cantidad: 2}],
        [{producto: {nombre: "Perfume", precio: 20, tipoIva: "general" }}, 3, {producto: {nombre: "Perfume", precio: 20, tipoIva: "general" }, cantidad: 3}],
        [{producto: {nombre: "Leche", precio: 1, tipoIva: "superreducidoC" }}, 6, {producto: {nombre: "Leche", precio: 1, tipoIva: "superreducidoC"}, cantidad: 6}],
        [{producto: {nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA" }}, 1, {producto: {nombre: "Leche", precio: 1, tipoIva: "superreducidoC"}, cantidad: 6}]
    ]) ("Si el producto es %s, la línea del ticket ha de ser %s", (producto, cantidad, resultadoEsperado) => {

        // Act
        const resultado = creaLineaTicket(producto, cantidad);

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    })
});