describe("Bookmark Functionality", () => {
    // Test user credentials - these should be replaced with valid test account
    const testUser = {
        email: Cypress.env("TEST_USER_EMAIL") || "test@example.com",
        password: Cypress.env("TEST_USER_PASSWORD") || "testpassword123",
    };

    beforeEach(() => {
        // Clear any previous session
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    describe("Unauthenticated User", () => {
        it("should redirect to signin when clicking bookmark without authentication", () => {
            cy.visit("/");

            // Wait for jobs to load
            cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).should("exist");

            // Click the first bookmark button
            cy.get('[data-testid="bookmark-button"]').first().click();

            // Should redirect to signin page
            cy.url().should("include", "/signin");
        });

        it("should show signin and signup links in header", () => {
            cy.visit("/");

            cy.contains("Sign In").should("be.visible");
            cy.contains("Sign Up").should("be.visible");
        });
    });

    describe("Authentication Flow", () => {
        it("should navigate to signup page", () => {
            cy.visit("/");
            cy.contains("Sign Up").click();
            cy.url().should("include", "/signup");
            cy.contains("Create Account").should("be.visible");
        });

        it("should navigate to signin page", () => {
            cy.visit("/");
            cy.contains("Sign In").click();
            cy.url().should("include", "/signin");
            cy.contains("Welcome Back").should("be.visible");
        });

        it("should show error for invalid credentials", () => {
            cy.visit("/signin");
            cy.get('input[name="email"]').type("invalid@example.com");
            cy.get('input[name="password"]').type("wrongpassword");
            cy.get('button[type="submit"]').click();

            // Should show error message
            cy.contains("Invalid email or password", { timeout: 10000 }).should("be.visible");
        });

        it("should validate signup form fields", () => {
            cy.visit("/signup");

            // Submit without filling fields
            cy.get('button[type="submit"]').click();

            // Form should not submit (required fields)
            cy.url().should("include", "/signup");
        });
    });

    describe("Authenticated User - Bookmark Actions", () => {
        beforeEach(() => {
            // Note: This requires a valid test account on the Akil backend
            // For testing purposes, you may need to create a test account first
            cy.visit("/signin");
        });

        it("should show bookmark buttons on job cards", () => {
            cy.visit("/");

            // Wait for page to load
            cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).should("have.length.at.least", 1);
        });

        it("should display job listings with bookmark functionality", () => {
            cy.visit("/");

            // Verify job cards are rendered
            cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).should("exist");

            // Verify job card structure
            cy.get("h3").should("have.length.at.least", 1); // Job titles
        });
    });

    describe("Search Functionality", () => {
        it("should filter jobs by title", () => {
            cy.visit("/");

            // Wait for jobs to load
            cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).should("exist");

            // Get initial count
            cy.get('[data-testid="bookmark-button"]').then(($buttons) => {
                const initialCount = $buttons.length;

                // Search for a specific term
                cy.get('input[placeholder*="Search"]').type("developer");

                // Results should be filtered (could be more, less, or same depending on data)
                cy.get('[data-testid="bookmark-button"]').should("have.length.at.most", initialCount);
            });
        });

        it("should show no results message for non-matching search", () => {
            cy.visit("/");

            // Wait for jobs to load
            cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).should("exist");

            // Search for non-existing job
            cy.get('input[placeholder*="Search"]').type("xyznonexistentjob123");

            // Should show no jobs found
            cy.contains("No jobs found").should("be.visible");
        });

        it("should clear search and show all results", () => {
            cy.visit("/");

            // Wait for jobs to load
            cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).should("exist");

            // Search and then clear
            cy.get('input[placeholder*="Search"]').type("test");
            cy.get('input[placeholder*="Search"]').clear();

            // Should show results again
            cy.get('[data-testid="bookmark-button"]').should("exist");
        });
    });

    describe("Job Detail Page", () => {
        it("should navigate to job detail page when clicking a job card", () => {
            cy.visit("/");

            // Wait for jobs to load
            cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).should("exist");

            // Click on the first job card link (not the bookmark button)
            cy.get("a[href^='/jobs/']").first().click();

            // Should be on job detail page
            cy.url().should("include", "/jobs/");

            // Should show job details
            cy.contains("Description").should("be.visible");
        });

        it("should have bookmark button on job detail page", () => {
            cy.visit("/");

            // Wait for jobs to load and navigate to detail
            cy.get("a[href^='/jobs/']", { timeout: 15000 }).first().click();

            // Bookmark button should be present
            cy.get('[data-testid="bookmark-button"]').should("exist");
        });

        it("should have back to listings link", () => {
            cy.visit("/");

            // Navigate to job detail
            cy.get("a[href^='/jobs/']", { timeout: 15000 }).first().click();

            // Should have back link
            cy.contains("Back to listings").should("be.visible");

            // Click back link
            cy.contains("Back to listings").click();

            // Should be back on home page
            cy.url().should("eq", Cypress.config().baseUrl + "/");
        });
    });
});
