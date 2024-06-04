import { calculaPorcentajeIva, devuelvePrecioConIva } from "./calcula-ticket.helper";

describe('calculaPorcentajeIva', () => {
    // Arrange
    it.each([
        ["general", 0.21],
        ["reducido", 0.1],
        ["superreducidoA", 0.05],
        ["superreducidoB", 0.04],
        ["superreducidoC", 0],
        ["sinIva", 0],
    ])("Si el IVA es de tipo %s el IVA ha de ser de un %s", (tipoIva, resultadoEsperado) => {
        // Act
        const resultado = calculaPorcentajeIva(tipoIva);

        // Assert
        expect(resultado).toBe(resultadoEsperado);
    });
});

describe('devuelvePrecioConIva', () => {
    // Arrange
    it.each([
        [10, "general", 12.1],
        [10, "reducido", 11],
        [10, "superreducidoA", 10.5],
        [10, "superreducidoB", 10.4],
        [10, "superreducidoC", 10],
        [10, "sinIva", 10],
    ])("Si el IVA es de tipo %s el IVA ha de ser de un %s", (precio, tipoIva, resultadoEsperado) => {
        // Act
        const resultado = devuelvePrecioConIva(precio, tipoIva);

        // Assert
        expect(resultado).toBe(resultadoEsperado);
    });
});