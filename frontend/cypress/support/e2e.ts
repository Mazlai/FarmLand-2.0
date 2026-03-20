// ===================================
// This example support/e2e.ts is processed and loaded automatically before your test files.
// Use this file to put common hooks and behavior that all your e2e tests rely upon.
// ===================================

// Alternatively you can use CommonJS syntax:
// const _ = require('lodash')
// const addContext = require('mochawesome/addContext')

// Hide fetch/XHR requests in the command log
const app = window.top;

if (app !== undefined && app !== null) {
  app.document.addEventListener('click', () => {
    app.localStorage.debug = '';
  });
}

// Custom commands
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/sign-in');
  cy.get('input[type="email"]').first().type(email);
  cy.get('input[type="password"]').first().type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('fillSignUp', (email: string, password: string) => {
  cy.visit('/sign-up');
  
  cy.get('input[type="email"]').first().type(email);
  cy.get('input[type="password"]').first().type(password);
});
