describe('Basic test for address result', () => {
    it('successfully loads', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('My Home Info')
    })

    it('Test address', () => {
        cy.visit('/') // change URL to match your dev URL
        cy.get('#geocoder-input').type('1104 military{enter}')
        cy.wait(10000)
        cy.contains('INFO FOR: 1104 MILITARY, 48209')
        cy.contains('Central Southwest')
        cy.contains('PARCEL NUMBER: 16015884.')
        cy.contains('PROVIDER: GFL (844) 464-3587')
        cy.contains('REGISTER: Not registered')
        cy.contains('CERTIFIED: Not certified')
    })
})