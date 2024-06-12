import { calculaTicket, creaResultadoLineaTicket } from "./calcula-ticket";

// describe('creaLineaTicket', () => {  
//     it.each([
//         [{nombre: "Legumbres", precio: 2, tipoIva: "general"}, 2, {producto: {nombre: "Legumbres", precio: 2, tipoIva: "general"}, cantidad: 2}],
//         [{nombre: "Perfume", precio: 20, tipoIva: "general"}, 3, {producto: {nombre: "Perfume", precio: 20, tipoIva: "general" }, cantidad: 3}],
//         [{nombre: "Leche", precio: 1, tipoIva: "superreducidoC"}, 6, {producto: {nombre: "Leche", precio: 1, tipoIva: "superreducidoC"}, cantidad: 6}],
//         [{nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA"}, 1, {producto: {nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA"}, cantidad: 1}]
//     ]) ("Si el producto es %s, la línea del ticket ha de ser %s", (producto, cantidad, resultadoEsperado) => {

//         // Act
//         const resultado = creaLineaTicket(producto, cantidad);

//         // Assert
//         expect(resultado).toEqual(resultadoEsperado);
//     })
// });

describe('creaResultadoLineaTicket', () => {    
    it.each([
        [{ nombre: "Legumbres", precio: 2, tipoIva: "general"}, 2, {nombre: "Legumbres", cantidad: 2, precionSinIva: 2, tipoIva: "general", precioConIva: 2.42}],
        [{ nombre: "Perfume", precio: 20, tipoIva: "general"}, 3, {nombre: "Perfume", cantidad: 3, precionSinIva: 20, tipoIva: "general", precioConIva: 24.2}],
        [{ nombre: "Leche", precio: 1, tipoIva: "superreducidoC"}, 6, {nombre: "Leche", cantidad: 6, precionSinIva: 1, tipoIva: "superreducidoC", precioConIva: 1}],
        [{ nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA"}, 1, {nombre: "Lasaña", cantidad: 1, precionSinIva: 5, tipoIva: "superreducidoA", precioConIva: 5.25}]
    ]) ("Si el producto es %s, la línea completa del ticket ha de ser %s", (producto, cantidad, resultadoEsperado) => {

        // Act
        const resultado = creaResultadoLineaTicket(producto, cantidad);

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    })
});

// describe('calculaTicket', () => {    
//     it("Obtiene un array de productos con cantidad y devuelve el total del ticket sin IVA, la línea completa del ticket ha de ser %s", () => {
//     const lineasTicket = [
//         { producto: { nombre: "Legumbres", precio: 2, tipoIva: "general"}, cantidad: 2 },
//         { producto: { nombre: "Perfume", precio: 20, tipoIva: "general"}, cantidad: 3 },
//         { producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" }, cantidad: 6 },
//         { producto: { nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA" }, cantidad: 1 },
//     ]

//     const resultadoEsperado = [
//         totalSinIva: 28,
//         totalIva: ,
//         totalesPorTipoIva = {
//         [general: 12.10.toFixed(2)],
//         [reducido: 11.00.toFixed(2)],
//         [superreducidoA: 10.50.toFixed(2)],
//         [superreducidoB: 10.40.toFixed(2)],
//         [superreducidoC: 10.00.toFixed(2)],
//         [sinIva: 10.00.toFixed(2)]}
//         totalConIva: 54,
//     ]
//         // Act
//         const resultado = calculaTicket(lineasTicket);

//         // Assert
//         expect(resultado).toEqual(resultadoEsperado);
//     })
// });

describe('calculaResultadoTotalTicket', () => {    
    it("Obtiene un array de productos con cantidad y devuelve el total del ticket sin IVA, la línea completa del ticket ha de ser %s", () => {
    const lineasTicket = [
        { producto: { nombre: "Legumbres", precio: 2, tipoIva: "general"}, cantidad: 2 },
        { producto: { nombre: "Perfume", precio: 20, tipoIva: "general"}, cantidad: 3 },
        { producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" }, cantidad: 6 },
        { producto: { nombre: "Lasaña", precio: 5, tipoIva: "superreducidoA" }, cantidad: 1 },
    ]

    const resultadoEsperado = [
        totalSinIva: 28,
        totalIva: ,
        totalesPorTipoIva = 
    ]
        // Act
        const resultado = calculaResultadoTotalTicket(lineasTicket);

        // Assert
        expect(resultado).toEqual(resultadoEsperado);
    })
});
