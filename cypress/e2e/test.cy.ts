describe("Test E2E", () => {
  it("Visitar taller web, escribir una patente, escibir un kilometraje y limpiar el filtro", () => {
    // Visitar la página
    cy.visit("https://uno-front-ten.vercel.app/");
    
    // Esperar a que el input esté disponible y escribir en él
    cy.get('input[id=":r1:"]').should('be.visible').type("AAA111");

    // Esperar a que el input esté disponible y escribir en él
    cy.get('input[id=":r2:"]').should('be.visible').type("1500");
    
    // Hacer clic en el botón de limpiar
    cy.contains("button", "Limpiar").should('be.visible').click();
    
    // Verificar que el input ha sido limpiado
    cy.get('input[id=":r1:"]').should('have.value', '');
  });
});
