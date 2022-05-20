describe("Testing Navbar api links", () => {
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
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
    it('Checking navbar links are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
        const tem=[];
      
           for(var i=1;i<=6;i++){
            cy.get(':nth-child('+i+') > .nav-link', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            tem.push(temp);
            })
            }
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
                            for(var j=0;j<6;j++){
                            expect(Navbar.links[j].data.title).to.equal(tem[j])
                            }
          })
        })
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
    it('Checking Email Address is visible', () => {
        cy.url()
        cy.get('#inputEmail', { timeout: 20000 }).invoke('attr', 'placeholder').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.labels.emailAddress).to.equal(temp);
                })
        })
    })
    it('Checking Password is visible', () => {
        cy.url()
        cy.get('#inputPassword', { timeout: 20000 }).invoke('attr', 'placeholder').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.labels.password).to.equal(temp);
                })
        })
    })
    it('Login Success or Failure', () => {
        cy.url()
        cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
        .wait(1000)
        cy.on('window:alert', (str) => {
            expect(str).to.contains('Please fill out this field.')
        })
    })
    it('Checking Checkbox content is visible', () => {
        cy.url()
        cy.get('form > :nth-child(3) > :nth-child(1)', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            var id = temp.slice(1, 12);
            cy.log(id);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.labels.rememberMe).to.equal(id);
                })
        })
    })
    it('Checking Checkbox is visible', () => {
        cy.url()
        cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).check()
        cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).uncheck()
    })
    it('Checking Forgot password is visible', () => {
        cy.url()
        cy.get(':nth-child(3) > .text-accent', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.labels.forgotPassword).to.equal(temp);
                })
        })
    })
    it('Checking Forgot password is clickable & validation of url', () => {
        cy.url()
        cy.get(':nth-child(3) > .text-accent', { timeout: 20000 }).click()
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
    it(' Logout Test user ', () => {
        cy.get('#profileNavbarDropdownMenuLink', { timeout: 20000 }).click()
        cy.get('.dropdown-menu > :nth-child(4)', { timeout: 20000 }).click()
        cy.url()
    })
    it('Login to Test user with wrong password', () => {
        cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
        cy.url()
        cy.get('#inputEmail', { timeout: 20000 }).type('09884668284')
        cy.get('#inputPassword', { timeout: 20000 }).type('1234')
        cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).check()
        cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
        cy.url()
    })
    it('Invalid Credentials error', () => {
        cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
        cy.get('.noty_close_button', { timeout: 10000 }).should('exist').click()
    })
    it('Login to Test user with wrong Email', () => {
            cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
            cy.url()
            cy.get('#inputEmail', { timeout: 20000 }).clear().type('9444230117')
            cy.get('#inputPassword', { timeout: 20000 }).clear().type('12345678')
            cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).check()
            cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
            cy.url()
    })
    it('Invalid Credentials error', () => {
            cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
             })
            cy.get('.noty_close_button', { timeout: 10000 }).should('exist').click()
    })
    it('Dont have an account is visible', () => {
        cy.get(':nth-child(5) > .col-12', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            var id = temp.slice(0, 22);
            cy.log(id);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
            .then((response) => {
                var jsonData = response.body;
                expect(jsonData.response.data.widgets).to.have.length(1)
                var Navbar = jsonData.response.data.widgets[0].data;
                cy.expect(Navbar.labels.dontHaveAccount).to.equal(id);
            })
         })
    })
    it('Create Account label is visible', () => {
            cy.get('.text-accent > a', { timeout: 10000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
                var id = temp.slice(1, 15);
                cy.log(id);
                cy.request({
                    method: "POST",
                    url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '93650588458740',
                        app_version: '1.3.12'
                    }
                })
            .then((response) => {
                var jsonData = response.body;
                expect(jsonData.response.data.widgets).to.have.length(1)
                var Navbar = jsonData.response.data.widgets[0].data;
                cy.expect(Navbar.labels.createAccount).to.equal(id);
            })
             })
    })
    it('Create Account is clickable', () => {
        cy.get('.text-accent > a', { timeout: 10000 }).click()
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.registerPageURL.url).to.equal(temp);
                })
     })
})
})