/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

export function registerCommands() {
  Cypress.Commands.add('login', () => {
    cy.visit('/');
    cy.get('input#tankNumber').should('not.exist');
    cy.get('button[data-sidebar="trigger"]').click();
    cy.get('a[href="/log-in"]').click();
    cy.url().should('include', 'log-in');
    cy.get('input#identifier-field').type(`${Cypress.env('email')}{enter}`);
    cy.get('input#password-field').type(Cypress.env('password'));
    cy.contains('Continue').click();
    cy.get('input#tankNumber').should('exist');
  });
}
