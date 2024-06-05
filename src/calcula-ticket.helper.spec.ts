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
    it("Debería devolver un error ya que el precio es menor que 0€", () => {
        //arrange
        const precio  = -15;
        const tipoIva = "sinIva";

        // act
        const resultado = () => devuelvePrecioConIva(precio, tipoIva);

        // assert
        expect(resultado).toThrowError("Se ha producido un error con el producto");
    });

    it("Debería devolver un error ya que el precio es de 0€", () => {
        //arrange
        const precio  = 0;
        const tipoIva = "sinIva";

        // act
        const resultado = () => devuelvePrecioConIva(precio, tipoIva);

        // assert
        expect(resultado).toThrowError("Se ha producido un error con el producto");
    });
    // Arrange
    it.each([
        [10, "general", 12.10.toFixed(2)],
        [10, "reducido", 11.00.toFixed(2)],
        [10, "superreducidoA", 10.50.toFixed(2)],
        [10, "superreducidoB", 10.40.toFixed(2)],
        [10, "superreducidoC", 10.00.toFixed(2)],
        [10, "sinIva", 10.00.toFixed(2)],
    ])("Si el precio es de %s, ccon tipo IVA de %s, el coste totalha de ser de %s", (precio, tipoIva, resultadoEsperado) => {
        // Act
        const resultado = devuelvePrecioConIva(precio, tipoIva);

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    });
});