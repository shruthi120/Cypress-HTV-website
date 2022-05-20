describe("Testing Order page", () => {
    let Token=" ";
    let Hash=" ";
    let code =" ";
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93650588458740',
                app_version: '1.3.13'
            }
        })
            .then((response) => {
                expect(response.body).have.property('response')
                expect(response).to.have.property('status', 200)
                expect(response.body).to.not.be.null
            })
    })
    beforeEach(() => {
        cy.restoreLocalStorage();
        //cy.visit('https://testhtvfun.ventunotech.com/profile')
      });
    
      afterEach(() => {
        cy.saveLocalStorage();
      });
    it('Hashcode ', () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93629304115088',
                url: 'https://testhtvfun.ventunotech.com/profile',
                app_version: '1.3.12'
            }
        })
            .then((response) => {
                expect(response.body).have.property('response')
                expect(response).to.have.property('status', 200)
                var jsonData = response.body;
                expect(jsonData.response.data.widgets).to.have.length(1)
                var Navbar = jsonData.response.data.widgets[0].data;
                Hash = Navbar.actionURL.url;
                Hash = Hash.toString();
                code = Hash.slice(66, 98);
                cy.log(code);
            })
    })
    it('Login', () => {
        cy.request({
            method: "POST",
            url: `https://testottapi.ventunotech.com/v1/ott/login/5d145529a7c72/211/${code}`,
            form: true,
            body: {
                user_key: '92688673705372',
                email:'testventuno@gmail.com',
                //captcha_token: "03AGdBq25A5ica6S4t-ujDPfMELFESCmt1X2he9TWkFzWl0blZMJxfoWW0iI-RzGRf-pnRnj6bgknbaxe0Y-SRb4rX4CciJYAV52bkcYAq3F0n3dlvj8k9oB9LtkaYfQbCSuMeNke-tWuU7QbwhCvMtsVBNUqqaC1TJFDImEcRxWIbukw_fvSVcrKKsQFjV53D4lkFisXy13KOOrdro2FFjpM2GjGvw0guBUgSIGht7zXRkqrL_TNhrScfk4xrEn10FNbqS40QoTVnI8a2pM19WRWIpt4VHxB6KT6sM_JiCt_oIA9CB7dW187CAEHtnfnP-MMq11d9p3o1XvxxBscztMGDSrub0IMMHCAFGZrz3OOintTUa9bENAL3LHeVtVh3YdI1YRuWfMFH52IRP79YnZHoK_9wcKAcJwR7TtxiKIxhnfsBIIDJR_zslG2LLgOdry2rrRcZSnW8MrFZ2OfF7YOy6_MPapA3SA",
                password:'12345678',
                app_version: '1.3.12'
            }
        })
            .then((response) => {
                expect(response.body).have.property('response')
                expect(response).to.have.property('status', 200)
                var jsonData = response.body;
                 Token = jsonData.response.data.token;
                //cy.expect(Token);
            })
    })
    it('Login to Test user', () => {
        cy.visit('https://testhtvfun.ventunotech.com/',{timeout:30000})
        cy.get('.navbar-text > .btn', { timeout: 20000 }).click()
        cy.get('#inputEmail', { timeout: 20000 }).type('testventuno@gmail.com')
        cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
        cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).check()
        cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
        cy.url()
        .wait(8000)
    })
    it('Checking My orders dropdown is visible & clickable ', () => {
        cy.get('#profileNavbarDropdownMenuLink', { timeout: 10000 }).should('exist').click()
        cy.get('[href="/orderListing"]', { timeout: 10000 }).should('exist').click()
        .wait(5000)
    })
   /* it('Checking My orders contants is visible ', () => {
        cy.get( '.col > .v-card', { timeout: 10000 }).should('exist')
        cy.get( '.Alert', { timeout: 10000 }).should('exist')
        cy.get( '.title', { timeout: 10000 }).should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)                
        })
        cy.get( '.message', { timeout: 10000 }).should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)                
        })
        cy.get('a > .ec-txt', { timeout: 10000 }).should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)                
        })
        cy.get('a > .ec-txt', { timeout: 10000 }).click()
    })*/
    it('Checking My orders Title Content is visible ', () => {
        cy.get( '.col > .widget-title > h2', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)               
             cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/orderListing/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '12597483392220',
                    app_version: '1.3.13',
                    token:Token,
                    user_id: '95480'
                }
            })
                .then((response) => {
                    expect(response.body).have.property('response')
                    expect(response).to.have.property('status', 200)
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0]
                    expect(Navbar.data.title).to.equal(temp)
                })
        })
    })
    it('Checking My orders Content Box is visible ', () => {
        cy.get( '.col > .v-card', { timeout: 10000 }).should('exist')
    })
    it('Checking My orders Contents is visible ', () => {
        cy.get( '.Empty', { timeout: 10000 }).should('exist')
        cy.get( '.message', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)               
             cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/orderListing/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '12597483392220',
                    app_version: '1.3.13',
                    token:Token,
                    user_id: '95480'
                }
            })
                .then((response) => {
                    expect(response.body).have.property('response')
                    expect(response).to.have.property('status', 200)
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0]
                    expect(Navbar.data.cards[0].data.labels.empty_message).to.equal(temp)
                })
        })
        cy.get( 'a > .ec-txt', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)               
             cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/orderListing/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '12597483392220',
                    app_version: '1.3.13',
                    token:Token,
                    user_id: '95480'
                }
            })
                .then((response) => {
                    expect(response.body).have.property('response')
                    expect(response).to.have.property('status', 200)
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0]
                    expect(Navbar.data.cards[0].data.labels.back_message).to.equal(temp)
                })

    })
})
})