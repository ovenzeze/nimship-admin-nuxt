
describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Nuxt')
  })
})
