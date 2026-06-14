describe('Flujo E2E SauceDemo',()=>{
it('Compra exitosa',()=>{
cy.visit('/');
cy.get('#user-name').type('standard_user');
cy.get('#password').type('secret_sauce');
cy.get('#login-button').click();
cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
cy.get('.shopping_cart_link').click();
cy.get('[data-test="checkout"]').click();
cy.get('[data-test="firstName"]').type('Juan');
cy.get('[data-test="lastName"]').type('Perez');
cy.get('[data-test="postalCode"]').type('110111');
cy.get('[data-test="continue"]').click();
cy.get('[data-test="finish"]').click();
cy.contains('THANK YOU FOR YOUR ORDER').should('be.visible');
});
});
