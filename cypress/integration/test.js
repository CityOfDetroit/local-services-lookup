describe('Basic test for address result', () => {
    it('successfully loads', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('My Home Info')
    })

    it('Test address', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('My Home Info')
      cy.get('#addresses-list').should('be.empty')
      cy.get('#geocoder input').type('1104 military')
      cy.get('#addresses-list option').should('have.attr', 'data-parsel', '16015884.')
      cy.wait(1000)
      cy.get('#geocoder input').type('{enter}')
    })
})