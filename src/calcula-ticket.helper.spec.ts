describe('validaNIF', () => {
    // Arrange
    it.each([
        ["12345678", "Z", true],
        ["73536276", "D", true],
        ["72184153", "X", true],
        ["36218255", "V", true],
        ["21137848", "C", true],
        ["12345678", "A", false],
        ["98765432", "A", false],
        ["33333333", "C", false],
    ])("El NIF %s%s es válido: %s", (numero, letra, resultadoEsperado) => {
            // Act
            const resultado = validaNIF(numero, letra);

            // Assert
            expect(resultado).toBe(resultadoEsperado);
    });
});