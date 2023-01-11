describe('Dashboard Loads', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000');
    })
});

describe('Getting Notes', () => {
    it('Successfully gets notes', () => {
        cy.visit('http://localhost:3000');
        cy.wait(2000);
        cy.get(`[id="cardTitle1"]`).contains('.MuiCardHeader-root', 'My first note')
            .siblings()
            .contains('This is my first note');

        cy.get(`[id=cardText1]`).contains('This is my first note');

    })
})

describe('Adding Note', () => {
    it('Successfully adds note', () => {
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
describe('Editing Note', () => {
    it('Successfully edits a note', () => {
        cy.visit('http://localhost:3000');
        cy.wait(2000);
        cy.get('[id="card5"]').click();
        cy.get('[id="modal-title"]').type(' edit');
        cy.get('.JoyTextarea-root').type(' now edited!');
        cy.get('[id="save-button"]').click();

        cy.get(`[id="card5"]`).contains('.MuiCardHeader-root', 'Test Title edit')
            .siblings()
            .contains('Test Text now edited!');
    })
})
describe('Deleting Note', () => {
    it('Successfully deletes a note', () => {
        cy.visit('http://localhost:3000');
        cy.wait(2000);
        cy.get(`[id="card5"]`).contains('.MuiCardHeader-root', 'Test Title edit').children().click({ multiple: true });
        cy.get(`[id="card5"]`).should('not.exist');
    })
})