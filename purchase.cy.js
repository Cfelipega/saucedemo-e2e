describe('Flujo E2E SauceDemo', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.fixture('user').as('userData');
    });

    it('Compra exitosa', function () {

        // Login
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();

        // Validar login
        cy.url().should('include', 'inventory');
        cy.screenshot('01-login');

        // Agregar productos
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        // Ir al carrito
        cy.get('.shopping_cart_link').click();

        // Validar carrito
        cy.url().should('include', 'cart');
        cy.contains('Sauce Labs Backpack').should('be.visible');
        cy.contains('Sauce Labs Bike Light').should('be.visible');

        cy.screenshot('02-cart');

        // Checkout
        cy.get('[data-test="checkout"]').click();

        // Completar formulario
        cy.get('[data-test="firstName"]').type(this.userData.firstName);
        cy.get('[data-test="lastName"]').type(this.userData.lastName);
        cy.get('[data-test="postalCode"]').type(this.userData.postalCode);

        cy.get('[data-test="continue"]').click();

        // Validar checkout
        cy.url().should('include', 'checkout-step-two');

        cy.contains('Payment Information').should('be.visible');
        cy.contains('Shipping Information').should('be.visible');

        cy.screenshot('03-checkout');

        // Finalizar compra
        cy.get('[data-test="finish"]').click();

        // Validar compra exitosa
        cy.url().should('include', 'checkout-complete');

        cy.contains('THANK YOU FOR YOUR ORDER')
            .should('be.visible');

        cy.screenshot('04-success');

    });

});
