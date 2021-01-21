/// <reference path="../support/index.d.ts" />

describe('comments crud', () => {
  it('should be able to add new comment', () => {
    cy.visit('/');
    cy.get('.input.add-comment__title').type('Test title');
    cy.get('.angular-editor-textarea').type('Test Text');
    cy.get('.add-comment__tag input').type('Tag 1{enter}');
    cy.get('.add-comment__tag input').type('Tag 2{enter}');
    cy.get('.add-comment button[type="submit"]').click({ force: true });
  });

  it('should be able to edit created comment', () => {
    cy.visit('/');
    cy.get('app-comment').then((comments) => {
      const element = cy.get(comments[1] as any);
      element.find('.btn.primary').click();
    });

    cy.get('app-comment').then((comments) => {
      const element = cy.get(comments[1] as any);
      element.find('.comment__name input').type('{selectall}{backspace}new title content');

      cy.get('button').contains('Save').click();
    });
  });

  it('should be able to delete created comment', () => {
    cy.visit('/');
    cy.get('app-comment').then((comments) => {
      cy.get(comments[1] as any)
        .find('.btn.danger')
        .click();
    });
  });
});
