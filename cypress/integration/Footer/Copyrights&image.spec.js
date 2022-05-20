describe("Testing Footer links", () => {
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/footer/5d145529a7c72/211",
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
    it('Checking copyright is visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.d-inline-block.copyright', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/footer/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(5)
                    var Navbar = jsonData.response.data.widgets[3];
                    var id = temp.slice(1, 37);
                    cy.expect(Navbar.data.cards[0].data.copyrightText).to.equal(id);
            })
        })
    })
    it('Checking Img label is visible', () => {
        cy.get('.m-1 > img', { timeout: 20000 }).should('have.attr', 'alt').then((url) => {
            const temp = url.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/footer/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(5)
                    var Navbar = jsonData.response.data.widgets[4];
                    cy.expect(Navbar.data.cards[0].data.label).to.equal(temp);
                })
        })
    })
    it('Validation of img url', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.m-1 > img', { timeout: 20000 }).invoke('attr', 'src').then((url) => {
            const temp = url.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/footer/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(5)
                    var Navbar = jsonData.response.data.widgets[4];
                    cy.expect(Navbar.data.cards[0].data.logo).to.equal(temp);
                })
        })
    })
})