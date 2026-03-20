describe('Navigation Tests', () => {
  it('should redirect to sign-in on root path', () => {
    cy.visit('/');
    cy.url().should('include', '/sign-in');
  });

  it('should navigate to sign-up page via link', () => {
    cy.visit('/sign-in');
    cy.contains('a', /Pas de compte|Créez-en un/i).click();
    cy.url().should('include', '/sign-up');
  });

  it('should have proper page structure with form components', () => {
    cy.visit('/sign-in');
    cy.get('body').should('exist');
    cy.get('farm-input').should('have.length.greaterThan', 0);
    cy.get('farm-button').should('exist');
  });

  it('should navigate to my-farm page', () => {
    cy.visit('/my-farm');
    cy.url().should('include', '/my-farm');
  });
});
