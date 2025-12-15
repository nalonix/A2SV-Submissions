// Cypress E2E support file
import "./commands";

// Prevent uncaught exceptions from failing tests
Cypress.on("uncaught:exception", (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false;
});
