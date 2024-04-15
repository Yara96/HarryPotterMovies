describe('Harry Potter Movies', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(2000);
  });

  it('Visits the landing page', () => {
    cy.contains('Harry Potter Movies')
  })

  it('should display the movie list', () => {
    cy.get('[data-qa="movie-item"]').should('have.length.gt', 0);
  });

  it('should filter movies by release year and title', () => {
    cy.get('[data-qa="release-year-filter"]').type('2002');
    cy.get('[data-qa="title-filter"]').type('Chamber of Secrets');

    cy.get('[data-qa="movie-info"]').should('have.length', 1);
  });

  it('should display empty list if there is no match', () => {
    cy.get('[data-qa="release-year-filter"]').type('2003');

    cy.get('[data-qa="movie-info"]').should('have.length', 0);
  });

  it('should navigate to movie details page when clicking on a details button', () => {
    cy.get('[data-qa="movie-details-button"]').first().click();
    cy.wait(2000);

    cy.url().should('include', '/movies/');
    cy.get('[data-qa="movie-details"]').should('exist');
  });
})
