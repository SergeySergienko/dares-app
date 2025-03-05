describe('Tanks Page', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should be loaded', () => {
    cy.visit('/tanks');
  });
});
