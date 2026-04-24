/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;
  let updatedArticle;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      article = {
        title: `Article title ${Date.now()}`,
        description: `Article description ${Date.now()}`,
        body: `Article body ${Date.now()}`
      };

      updatedArticle = {
        title: `Updated title ${Date.now()}`,
        description: `Updated description ${Date.now()}`,
        body: `Updated body ${Date.now()}`
      };

      cy.register(user.email, user.username, user.password);

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
    });
  });

  it('should be created using New Article form', () => {
    articlePage.clickNewArticle();

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickPublishArticleBtn();

    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
    cy.url().should('include', '#/articles/');
  });

  it('should be edited using Edit button', () => {
    articlePage.clickNewArticle();

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickPublishArticleBtn();

    articlePage.clickEditArticleBtn();

    articlePage.typeTitle(updatedArticle.title);
    articlePage.typeDescription(updatedArticle.description);
    articlePage.typeBody(updatedArticle.body);
    articlePage.clickPublishArticleBtn();

    articlePage.assertArticleTitle(updatedArticle.title);
    articlePage.assertArticleBody(updatedArticle.body);
  });

  it('should be deleted using Delete button', () => {
    articlePage.clickNewArticle();

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickPublishArticleBtn();

    articlePage.clickDeleteArticleBtn();

    cy.url().should('include', '#/');
    cy.contains(article.title).should('not.exist');
  });
});
