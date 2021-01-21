/// <reference path="../support/index.d.ts" />

describe('comments crud', () => {
  it('should be able to add new comment', () => {
    cy.visit('/');
    cy.get('.comments-filter__tag input').click();
    cy.get('.ng2-dropdown-menu__options-container').find('div[role="button"]').click();
    cy.get('app-comment').then((comments) => expect(comments.length).eq(1));
  });
});
