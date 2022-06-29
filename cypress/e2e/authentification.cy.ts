import { generateName, randomString } from "@/utils/string-utils";

describe('Authentification', () => {
  it('should register a new user', () => {
    cy.visit('/auth/signup');


		const randomUsername = `${generateName()}`;
		const randomEmail = `${randomUsername.replaceAll(' ', '.').toLocaleLowerCase()}@example.com`;

		cy.get('input[name="email"]').type(randomEmail);
		cy.get('input[name="username"]').type(randomUsername.replaceAll(' ', '-'));
		cy.get('input[name="firstName"]').type(randomUsername.split(' ')[0]);
		cy.get('input[name="lastName"]').type(randomUsername.split(' ')[1]);
		cy.get('input[name="password"]').type('Test123');
		cy.get('input[name="confirmPassword"]').type('Test123');
		cy.get('input[name="acceptRgpd"]').click();
		cy.get('input[type="submit"]').click();

		cy.url().should('eq', Cypress.config().baseUrl)
		cy.getCookie('accessToken').should('exist')
		cy.getCookie('refreshToken').should('exist')
  });
});