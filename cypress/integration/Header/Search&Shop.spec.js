describe("Testing Navbar api links", () => {
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93650588458740',
                app_version: '1.3.12'
            }
        })
            .then((response) => {
                expect(response.body).have.property('response')
                expect(response).to.have.property('status', 200)
                expect(response.body).to.not.be.null
            })
    })
    it('Chceking Search Text Field is visible',()=>{
        cy.visit('https://testhtvfun.ventunotech.com/',{timeout:20000})
        cy.get('.form-control.search-box',{timeout:20000}).should('exist')
    })
    it('Chceking Search icon is visible',()=>{
        cy.get('.btn > .vt').should('exist')
    })
    it('Checking Search Placeholder is visible', () => {
        cy.get('input', { timeout: 20000 }).invoke('attr', 'placeholder').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widget.data;
                    expect(Navbar.search_widget.data.labels.search_label_small).to.equal(temp)
                })
        })
    })
    it('Validation of Search link', () => {
        cy.get('.btn.search-button', { timeout: 10000 }).click()
        cy.get('.noty_body').invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.url()
            cy.location('href').then((urlText) => {
                const temp = urlText
                cy.log(temp);
            })
        })
    })
    it('Validation of Proverbs Search', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.input-group', { timeout: 10000 }).type('Proverbs')
        cy.get('.btn.search-button', { timeout: 10000 }).click()
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
        })
    })
    it('Checking Shop icon is visible', () => {
        cy.get('.fas.fa-shopping-cart', { timeout: 10000 }).should('exist')
    })
    it('Validation of Shopping cart', () => {
        cy.get('.fas.fa-shopping-cart', { timeout: 10000 }).click()
        cy.get('.cart-area').invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
    })
})