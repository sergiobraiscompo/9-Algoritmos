import { calculaPorcentajeIva, devuelveIvasDesglosados, devuelvePrecioConIva } from "./calcula-ticket.helper";
import { LineaTicket, Producto, TotalPorTipoIva } from "./ticket-constantes";

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
    // it("Debería devolver un error ya que el precio es menor que 0€", () => {
    //     //arrange
    //     const lineasTicket: LineaTicket[] = { nombre: "Legumbres", precio: -15, tipoIva: "general"};

    //     // act
    //     const resultado = () => devuelveIvasDesglosados(lineasTicket);

    //     // assert
    //     expect(resultado).toThrowError("Se ha producido un error con el producto");
    // });

    // it("Debería devolver un error ya que el precio es de 0€", () => {
    //     //arrange
    //     const producto: Producto = { nombre: "Legumbres", precio: 0, tipoIva: "general"};;

    //     // act
    //     const resultado = () => devuelvePrecioConIva(producto);

    //     // assert
    //     expect(resultado).toThrowError("Se ha producido un error con el producto");
    // });
    
    it("Devuelve los valores de los ivas desglosados", () => {
        // Arrange
        const lineasTicket: LineaTicket[] = [
            {producto: {nombre: "Legumbres", precio: 2, tipoIva: "general",}, cantidad: 2},
            {producto: {nombre: "Perfume", precio: 20, tipoIva: "general",}, cantidad: 3},
            {producto: {nombre: "Leche", precio: 1, tipoIva: "superreducidoC",}, cantidad: 6},
            {producto: {nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA",}, cantidad: 1}
        ]

        // Act
        const resultado = devuelveIvasDesglosados(lineasTicket);
        const resultadoEsperado: TotalPorTipoIva[] =  [
            {tipoIva: "general", cuantia: 0.84 },
            {tipoIva: "superreducidoA", cuantia: 0.25 },
            {tipoIva: "superreducidoC", cuantia: 0 },
        ];

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    });
});