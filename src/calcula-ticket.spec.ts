import { creaLineaTicket } from "./calcula-ticket";
import { LineaTicket, Producto } from "./ticket-constantes";

describe('creaLineaTicket', () => {
    it("Si el producto es %s, la línea del ticket ha de ser %s", () => {
        // Arrange
        const producto: Producto = {nombre: "Legumbres", precio: 2, tipoIva: "general"};
        const cantidad: number = 2;
        const resultadoEsperado: LineaTicket = {producto: {nombre: "Legumbres", precio: 2, tipoIva: "general"}, cantidad: 2};

        // Act
        const resultado = creaLineaTicket(producto, cantidad);

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    })
    
    it.each([
        [{nombre: "Legumbres", precio: 2, tipoIva: "general"}, 2, {producto: {nombre: "Legumbres", precio: 2, tipoIva: "general"}, cantidad: 2}],
        [{nombre: "Perfume", precio: 20, tipoIva: "general"}, 3, {producto: {nombre: "Perfume", precio: 20, tipoIva: "general" }, cantidad: 3}],
        [{nombre: "Leche", precio: 1, tipoIva: "superreducidoC"}, 6, {producto: {nombre: "Leche", precio: 1, tipoIva: "superreducidoC"}, cantidad: 6}],
        [{nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA"}, 1, {producto: {nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA"}, cantidad: 1}]
    ]) ("Si el producto es %s, la línea del ticket ha de ser %s", (producto, cantidad, resultadoEsperado) => {

        // Act
        const resultado = creaLineaTicket(producto, cantidad);

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    })
});