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
    //Non-Registered user
    it('Checking Login link is visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/',{timeout:10000})
        cy.get('.navbar-text > .btn', { timeout: 20000 }).invoke('text').then((urlText) => {
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
                    expect(Navbar.user_info.data.title).to.equal(temp)
                })
        })
    })
    //Non-registered user
    it('Validation of Login link', () => {
        cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
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
                    expect(jsonData.response.data.widget.data.links).to.have.length(6)
                    var Navbar = jsonData.response.data.widget.data;
                    cy.expect(Navbar.user_info.data.link.url).to.equal(temp);
                })
        })
    })
    //Login into a specific user
    it('Verification of Login link', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
        cy.url()
    })
    it('Login to Test user', () => {
        cy.url()
        cy.get('#inputEmail', { timeout: 20000 }).type('09884668284')
        cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
        cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).check()
        cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
        cy.url()
    })
    //Registered user
    it('Checking Profile icon is visible', () => {
        cy.get('#profileNavbarDropdownMenuLink', { timeout: 10000 }).should('exist')
    })
    it('Checking username is visible ', () => {
        cy.get('.dropdown-item.dd-name', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '56958158235522',
                    app_version: '1.3.12',
                    user_id: '86351'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widget.data;
                    expect(Navbar.user_info.data.name).to.equal(temp)
                })
        })
    })
    it('Checking profile dropdown is visible ', () => {
        cy.get('[href="/profile"]', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '56958158235522',
                    app_version: '1.3.12',
                    user_id: '86351'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widget.data;
                    expect(Navbar.user_info.data.sub_menu[0].data.title).to.equal(temp)
                })
        })
    })
    it('Checking My orders dropdown is visible ', () => {
        cy.get('[href="/orderListing"]', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '56958158235522',
                    app_version: '1.3.12',
                    user_id: '86351'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widget.data;
                    expect(Navbar.user_info.data.sub_menu[2].data.title).to.equal(temp)
                })
        })
    })
    it('Checking Logout dropdown is visible ', () => {
        cy.get('.dropdown-menu > :nth-child(4)', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '56958158235522',
                    app_version: '1.3.12',
                    user_id: '86351'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widget.data;
                    expect(Navbar.user_info.data.sub_menu[3].data.title).to.equal(temp)
                })
        })
    })
    it('Checking Shopping Cart is visible', () => {
        cy.get('.fas.fa-shopping-cart', { timeout: 10000 }).should('exist')
    })
    //Registered user
    it('Validation of Profile icon ', () => {
        cy.get('#profileNavbarDropdownMenuLink', { timeout: 10000 }).should('exist').click()
    })
    it('Validation of profile dropdown', () => {
        cy.get('[href="/profile"]', { timeout: 20000 }).click()
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '56958158235522',
                    app_version: '1.3.12',
                    user_id: '86351'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widget.data;
                    expect(Navbar.user_info.data.link.url).to.equal(temp)
                })
        })
    })
    it('Checking My orders dropdown is visible ', () => {
        cy.get('[href="/orderListing"]', { timeout: 20000 }).click({ force: true })
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '56958158235522',
                    app_version: '1.3.12',
                    user_id: '86351'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widget.data;
                    expect(Navbar.user_info.data.sub_menu[2].data.link.url).to.equal(temp)
                })
        })
    })
    it('Checking Logout dropdown is visible ', () => {
        cy.get('.dropdown-menu > :nth-child(4)', { timeout: 20000 }).click({ force: true })
    })
    it('Checking Shopping Cart is visible', () => {
        cy.get('.fas.fa-shopping-cart', { timeout: 20000 }).should('exist')
    })
})