// Custom Cypress commands
declare namespace Cypress {
    interface Chainable {
        login(email: string, password: string): Chainable<void>;
    }
}

// Login command to sign in via UI
Cypress.Commands.add("login", (email: string, password: string) => {
    cy.visit("/signin");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    // Wait for redirect to home page
    cy.url().should("eq", Cypress.config().baseUrl + "/");
});
