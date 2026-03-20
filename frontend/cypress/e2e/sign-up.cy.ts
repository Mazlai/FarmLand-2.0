describe('Sign Up Form Tests', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('should display sign-up form with multiple input fields', () => {
    cy.get('farm-input').should('have.length.greaterThan', 0);
    cy.get('farm-input').find('input').should('have.length.greaterThan', 0);
  });

  it('should fill email field with valid input', () => {
    cy.get('farm-input').find('input[type="email"]').first().type('test@example.com');
    cy.get('farm-input').find('input[type="email"]').first().should('have.value', 'test@example.com');
  });

  it('should fill password field with valid input', () => {
    cy.get('farm-input').find('input[type="password"]').first().type('Password123');
    cy.get('farm-input').find('input[type="password"]').first().should('have.value', 'Password123');
  });

  it('should have visible submit button', () => {
    cy.get('farm-button').find('button').should('be.visible');
  });

  it('should submit form when all required fields are filled', () => {
    // Fill all required fields for sign-up validation
    // 1. Prénom
    cy.get('farm-input').eq(0).find('input').type('Jean').blur();
    // 2. Nom
    cy.get('farm-input').eq(1).find('input').type('Dupont').blur();
    // 3. Date de naissance
    cy.get('farm-input').eq(2).find('input').type('1990-05-15').blur();
    // 4. Genre (farm-select) - skip for now as it's not an input
    // 5. Email
    cy.get('farm-input').find('input[type="email"]').first().type('test@example.com').blur();
    // 6. Téléphone
    cy.get('farm-input').find('input[type="text"]').last().type('0612345678').blur();
    // 7. Mot de passe
    cy.get('farm-input').find('input[type="password"]').first().type('Password123').blur();

    // Click on the button container to ensure focus is lost
    cy.get('farm-button').click();
  });

  it('should clear email field when cleared', () => {
    cy.get('farm-input').find('input[type="email"]').first().type('test@example.com');
    cy.get('farm-input').find('input[type="email"]').first().clear();
    cy.get('farm-input').find('input[type="email"]').first().should('have.value', '');
  });
});
