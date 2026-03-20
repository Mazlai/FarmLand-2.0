describe('Form Interaction & Logic Tests', () => {
  it('should handle form field interactions on sign-up', () => {
    cy.visit('/sign-up');

    // Test input focus using farm-input component
    cy.get('farm-input').first().find('input').focus();
    cy.get('farm-input').first().find('input').should('have.focus');

    // Test typing on email field
    cy.get('farm-input').find('input[type="email"]').first().type('test@example.com');
    cy.get('farm-input').find('input[type="email"]').first().should('have.value', 'test@example.com');

    // Test clearing
    cy.get('farm-input').find('input[type="email"]').first().clear();
    cy.get('farm-input').find('input[type="email"]').first().should('have.value', '');
  });

  it('should validate password input type', () => {
    cy.visit('/sign-in');

    // Target password input inside farm-input component
    cy.get('farm-input').find('input[type="password"]').first().should('have.attr', 'type', 'password');

    // Type password - should be masked
    cy.get('farm-input').find('input[type="password"]').first().type('SecurePass123');
    cy.get('farm-input').find('input[type="password"]').first().should('have.value', 'SecurePass123');
  });

  it('should handle text and email input fields', () => {
    cy.visit('/sign-up');

    // Target only text, email, and password inputs inside farm-input (exclude date, number, etc.)
    cy.get('farm-input')
      .find('input[type="text"], input[type="email"], input[type="password"]')
      .then(($inputs) => {
        cy.wrap($inputs).each(($input, index) => {
          cy.wrap($input).focus();
          cy.wrap($input).type(`input${index}`);
        });
      });

    // Verify the values were entered
    cy.get('farm-input')
      .find('input[type="text"], input[type="email"], input[type="password"]')
      .each(($input, index) => {
        cy.wrap($input).should('have.value', `input${index}`);
      });
  });

  it('should maintain focus after typing', () => {
    cy.visit('/sign-in');

    // Target the email input inside farm-input component
    cy.get('farm-input').first().find('input').focus();
    cy.get('farm-input').first().find('input').type('user@test.com');
    cy.get('farm-input').first().find('input').should('have.focus');
  });

  it('should allow form field selection and interaction', () => {
    cy.visit('/sign-up');

    cy.get('farm-input').find('input').should('have.length.greaterThan', 0);

    // Select first input, focus, and type
    cy.get('farm-input').first().find('input').focus();
    cy.get('farm-input').first().find('input').type('test data');
    cy.get('farm-input').first().find('input').should('have.value', 'test data');

    // Clear it
    cy.get('farm-input').first().find('input').clear();
    cy.get('farm-input').first().find('input').should('have.value', '');
  });

  it('should handle form submission', () => {
    cy.visit('/sign-in');

    // Target farm-inputs by position (first = email, second = password)
    cy.get('farm-input').eq(0).find('input').type('test@example.com');
    cy.get('farm-input').eq(1).find('input').type('password');

    // Trigger blur on the last field to enable form validation
    cy.get('farm-input').eq(1).find('input').blur();

    // Now the button should be enabled
    cy.get('farm-button').find('button').should('not.be.disabled').click();
  });

  it('should preserve form state during user interaction', () => {
    cy.visit('/sign-up');

    // Use farm-input component to target the email input
    cy.get('farm-input').find('input[type="email"]').first().type('preserved@test.com');
    cy.get('farm-input').find('input[type="email"]').first().should('have.value', 'preserved@test.com');

    // Click on another field (use any input selector)
    cy.get('farm-input').find('input').eq(1).focus();

    // Original field should still have its value
    cy.get('farm-input').find('input[type="email"]').first().should('have.value', 'preserved@test.com');
  });
});
