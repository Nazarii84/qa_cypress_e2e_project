class SignUpPageObject {
  visit() {
    cy.visit('/#/register');
  }

  typeUsername(username) {
    cy.get('input[placeholder="Username"]').type(username);
  }

  typeEmail(email) {
    cy.get('input[placeholder="Email"]').type(email);
  }

  typePassword(password) {
    cy.get('input[placeholder="Password"]').type(password);
  }

  clickSignUpBtn() {
    cy.contains('button', 'Sign up').click();
  }
}

export default SignUpPageObject;
