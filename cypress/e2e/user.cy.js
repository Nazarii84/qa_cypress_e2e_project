/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const articlePage = new ArticlePageObject();

describe('User', () => {
  let firstUser;
  let secondUser;
  let article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedFirstUser) => {
      firstUser = generatedFirstUser;

      cy.task('generateUser').then((generatedSecondUser) => {
        secondUser = generatedSecondUser;

        article = {
          title: `Article ${Date.now()}`,
          description: `Description ${Date.now()}`,
          body: `Body ${Date.now()}`
        };

        cy.register(firstUser.email, firstUser.username, firstUser.password);
        cy.register(secondUser.email, secondUser.username, secondUser.password);

        signInPage.visit();
        signInPage.typeEmail(firstUser.email);
        signInPage.typePassword(firstUser.password);
        signInPage.clickSignInBtn();

        articlePage.clickNewArticle();
        articlePage.typeTitle(article.title);
        articlePage.typeDescription(article.description);
        articlePage.typeBody(article.body);
        articlePage.clickPublishArticleBtn();
        cy.url().should('include', '#/articles/');

        signInPage.visit();
        signInPage.typeEmail(secondUser.email);
        signInPage.typePassword(secondUser.password);
        signInPage.clickSignInBtn();
        cy.location('hash').should('eq', '#/');
      });
    });
  });

  it('should be able to follow the another user', () => {
    cy.visit(`/#/@${firstUser.username}`);

    cy.location('hash').should('include', `@${firstUser.username}`);
    cy.get('.user-info').should('exist');

    userPage.clickFollowBtn();

    cy.getByDataCy('follow-btn').should('exist');
  });
});
