describe('Basic test for address result', () => {
    it('successfully loads', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.get('my-home-info')
      .contains('It’s all here. All in one place.')
    })

    it('Test address', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.get('my-home-info')
      .find('button')
      .click()
      cy.get('my-home-info')
        .get('#geocoder input').type('1104 military{enter}')
      cy.wait(3000)
      cy.get('my-home-info')
      .contains('1104 Military St, Detroit, MI, 48209')
      cy.get('my-home-info')
      .get('button[data-nav-value="special areas and zones"]').click()
      cy.wait(3000)
      cy.get('my-home-info')
      .contains('SPECIAL AREAS AND ZONES')
    })

    it('Test invalid address', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.get('my-home-info')
      .find('button')
      .click()
      cy.get('my-home-info')
        .get('#geocoder input').type('3213 sdfasf{enter}')
      cy.wait(3000)
      cy.get('my-home-info')
      .contains('No Information found on this address. Please close and try again.')
    })
})