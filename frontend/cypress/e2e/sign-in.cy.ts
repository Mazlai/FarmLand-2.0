describe('Sign In Form Tests', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('should display sign-in form with email and password fields', () => {
    cy.get('farm-input').should('have.length.greaterThan', 0);
  });

  it('should fill email field with valid input', () => {
    cy.get('farm-input').eq(0).find('input').type('user@example.com');
    cy.get('farm-input').eq(0).find('input').should('have.value', 'user@example.com');
  });

  it('should fill password field with valid input', () => {
    cy.get('farm-input').eq(1).find('input').type('MyPassword123');
    cy.get('farm-input').eq(1).find('input').should('have.value', 'MyPassword123');
  });

  it('should have visible submit button', () => {
    cy.get('farm-button').find('button').should('be.visible');
  });

  it('should accept password input and mask it', () => {
    cy.get('farm-input').eq(1).find('input[type="password"]').should('exist');
    cy.get('farm-input').eq(1).find('input[type="password"]').type('SecurePassword123');
    cy.get('farm-input').eq(1).find('input[type="password"]').should('have.value', 'SecurePassword123');
  });

  it('should maintain focus and accept input while typing', () => {
    cy.get('farm-input').eq(0).find('input').focus();
    cy.focused().should('exist');
    cy.focused().type('test@example.com');
    cy.focused().should('have.value', 'test@example.com');
  });
});
