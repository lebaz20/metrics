// cypress/integration/app_spec.js
describe('App', () => {
    it('renders app and submits form', () => {
      cy.visit('http://localhost:3000?api-url=https://httpbin.org/post'); // Assuming your app is running on this port
  
      // Find input fields and submit button
      cy.findByLabelText(/Name/i).type('John');
      cy.findByLabelText(/Value/i).type('42');
      cy.findByText(/Submit/i).click();
  
      // Wait for the response to be displayed
      cy.findByText(/Response:/i).should('exist');
    });
});