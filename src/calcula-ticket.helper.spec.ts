import { calculaPorcentajeIva, devuelveIvasDesglosados, devuelvePrecioConIva } from "./calcula-ticket.helper";
import { LineaTicket, Producto, ResultadoLineaTicket, TotalPorTipoIva } from "./ticket-constantes";

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
        const producto: Producto = { nombre: "Legumbres", precio: -15, tipoIva: "general"};

        // act
        const resultado = () => devuelvePrecioConIva(producto);

        // assert
        expect(resultado).toThrowError("Se ha producido un error con el producto");
    });

    it("Debería devolver un error ya que el precio es de 0€", () => {
        //arrange
        const producto: Producto = { nombre: "Legumbres", precio: 0, tipoIva: "general"};;

        // act
        const resultado = () => devuelvePrecioConIva(producto);

        // assert
        expect(resultado).toThrowError("Se ha producido un error con el producto");
    });
    
    // Arrange
    it.each([
        [{ nombre: "Legumbres", precio: 10, tipoIva: "general"}, 12.10.toFixed(2)],
        [{ nombre: "Legumbres", precio: 10, tipoIva: "reducido"}, 11.00.toFixed(2)],
        [{ nombre: "Legumbres", precio: 10, tipoIva: "superreducidoA"}, 10.50.toFixed(2)],
        [{ nombre: "Legumbres", precio: 10, tipoIva: "superreducidoB"}, 10.40.toFixed(2)],
        [{ nombre: "Legumbres", precio: 10, tipoIva: "superreducidoC"}, 10.00.toFixed(2)],
        [{ nombre: "Legumbres", precio: 10, tipoIva: "sinIva"}, 10.00.toFixed(2)]
    ])("Si el precio es de %s, con tipo IVA de %s, el coste total ha de ser de %s", (producto, resultadoEsperado) => {
        // Act
        const resultado = devuelvePrecioConIva(producto);

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    });
});

describe('devuelveIvasDesglosados', () => {    
    it("Devuelve los valores de los ivas desglosados", () => {
        // Arrange
        const lineasTicket: ResultadoLineaTicket[] = [
            {nombre: "Legumbres", cantidad: 2, precioSinIva: 2, tipoIva: "general", precioConIva: 2.42},
            {nombre: "Perfume", cantidad: 3, precioSinIva: 20, tipoIva: "general", precioConIva: 24.2},
            {nombre: "Leche", cantidad: 6, precioSinIva: 1, tipoIva: "superreducidoC", precioConIva: 1},
            {nombre: "Lasaña", cantidad: 1, precioSinIva: 5, tipoIva: "superreducidoA", precioConIva: 5.25},
        ]

        // Act
        const resultado = devuelveIvasDesglosados(lineasTicket);
        const resultadoEsperado: TotalPorTipoIva[] =  [
            {tipoIva: "general", cuantia: 13.02},
            {tipoIva: "superreducidoA", cuantia: 0.25 },
            {tipoIva: "superreducidoC", cuantia: 0 },
        ];

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    });
});