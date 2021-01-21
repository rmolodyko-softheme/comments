/// <reference path="../support/index.d.ts" />

describe('comments crud', () => {
  it('should be able to add new comment', () => {
    cy.visit('/');
    cy.get('.comments-filter__tag input').click();
    cy.get('.ng2-dropdown-menu__options-container').find('ng2-menu-item div[role="button"]').first().click();
    cy.get('app-comment').then((comments) => expect(comments.length).eq(1));
  });
});
