describe('employee management navigation', () => {
  it('opens departments page', () => {
    cy.visit('/');
    cy.contains('Departments').click();
    cy.contains('Department').should('be.visible');
  });
});
