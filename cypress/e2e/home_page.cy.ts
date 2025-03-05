describe('Home Page', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should pass login and logout flow', () => {
    cy.get('button[data-sidebar="trigger"]').click();
    cy.get('div[data-clerk-component="UserButton"]').click();
    cy.contains('Sign out').click();
    cy.get('input#tankNumber').should('not.exist');
  });
});
