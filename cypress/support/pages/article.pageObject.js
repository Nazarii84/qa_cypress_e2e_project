class ArticlePageObject {
  clickNewArticle() {
    cy.contains('New Article').click();
  }

  typeTitle(title) {
    cy.get('input[placeholder="Article Title"]').clear();
    cy.get('input[placeholder="Article Title"]').type(title);
  }

  typeDescription(description) {
    cy.get('input[placeholder="What\'s this article about?"]').clear();
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(description);
  }

  typeBody(body) {
    cy.get('textarea[placeholder="Write your article (in markdown)"]').clear();
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(body);
  }

  clickPublishArticleBtn() {
    cy.contains('button', 'Publish Article').click();
  }

  clickEditArticleBtn() {
    cy.contains('Edit Article').click();
  }

  clickDeleteArticleBtn() {
    cy.contains('Delete Article').click();
  }

  assertArticleTitle(title) {
    cy.get('h1').should('contain', title);
  }

  assertArticleBody(body) {
    cy.get('.article-content').should('contain', body);
  }
}

export default ArticlePageObject;
