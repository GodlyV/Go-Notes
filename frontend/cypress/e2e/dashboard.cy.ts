describe('Dashboard Loads', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000');
    })
});

describe('Getting Notes', () => {
    it('successfully gets notes', () => {
        cy.visit('http://localhost:3000');
        cy.wait(3000);
        cy.get(`[id="cardTitle1"]`).contains('.MuiCardHeader-root', 'My first note')
            .siblings()
            .contains('This is my first note');

        cy.get(`[id=cardText1]`).contains('This is my first note');

    })
})

describe('Adding Note', () => {
    it('successfully adds note', () => {
        cy.visit('http://localhost:3000');
        cy.wait(2000);
        cy.get('[id="newNote"]').click();
        cy.get('[id="modal-title"]').type('Test Title');
        cy.get('.JoyTextarea-root').type('Test Text');
        cy.get('[id="save-button"]').click();

        cy.get(`[id="cardTitle5"]`).contains('.MuiCardHeader-root', 'Test Title')
            .siblings()
            .contains('Test Text');

    })
})