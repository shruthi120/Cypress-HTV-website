//import '../../support/commands';
describe("Testing Profile Page", () => {
    let Token = " ";
    let Hash=" ";
    let code =" ";
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
    beforeEach(() => {
        cy.restoreLocalStorage();
        //cy.visit('https://testhtvfun.ventunotech.com/profile')
      });
    
      afterEach(() => {
        cy.saveLocalStorage();
      });
    //Login into a specific user
    it('Verification of Login link', () => {
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 20000 })
        //cy.clearCookies({log:true})
        //cy.clearLocalStorage('user key',{log:true})
        cy.get('.navbar-text > .btn', { timeout: 20000 }).click()
        cy.url()
        .wait(1000)
    })
    /*it('Login to Test user', () => {
        cy.url()
        cy.get('#inputEmail', { timeout: 20000 }).type('testventuno@gmail.com')
        cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
        cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).check()
        cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
        cy.url()
    })*/
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
        cy.url()
        cy.get('.navbar-text > .btn', { timeout: 20000 }).click()
        cy.url()
        .wait(1000)
        cy.get('#inputEmail', { timeout: 20000 }).type('testventuno@gmail.com')
        cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
        cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).check()
        cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
        cy.url()
        //cy.saveLocalStorage()
        .wait(2000)
    })
    it('Profile page',()=>{
        //cy.restoreLocalStorage()
        //.wait(2000)
        //expect(localStorage.getItem('user_id')).to.equal('95480')
        cy.get('#profileNavbarDropdownMenuLink', { timeout: 20000 }).click()
        cy.get('[href="/profile"]', { timeout: 20000 }).click()
        cy.url()
        .wait(2000)
    })
    it('Profile page - Account label',()=>{
        cy.get('.profile-sections > :nth-child(1) > .col-12 > h2', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)                
        })
    })
    it('Profile page - Details label and contents',()=>{
        cy.get(':nth-child(2) > .col-sm-3 > h3', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)                
        })
        //Name
        cy.get(':nth-child(2) > .col-sm-9 > :nth-child(1) > .col-12', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            var id = temp.slice(6, 11);
            cy.log(id);   
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/profile/5d145529a7c72/211",
                form: true,
                body : {
                    user_key: '93650588458740',
                    user_id: '95480',
                    token: Token,
                    app_version: '1.3.12'
                },
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.user.data.user_name).to.equal(id);
                })      
            })
        //Email
        cy.get('.col-sm-9 > :nth-child(2) > .col-12', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            var id = temp.slice(7, 32);
            cy.log(id);      
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/profile/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    user_id: '95480',
                    token: Token,
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.user.data.user_email).to.equal(id);
                })                   
        })
        //Phone
        cy.get('.col-sm-9 > :nth-child(3) > .col-12', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            var id = temp.slice(7, 21);
            cy.log(id);      
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/profile/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    user_id: '95480',
                    token: Token,
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(1)
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.user.data.user_phone).to.equal(id);
                })                     
        })
        //Password
        cy.get('.col-sm-7', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            var id = temp.slice(10, 19);
            cy.log(id);                
        })
    })
    it('Profile page - Billing',()=>{
        cy.get(':nth-child(4) > .text-uppercase > h3', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)                
        })
    })
    it('Profile page (Non-Purchased account) - Purchases & Contents',()=>{
        cy.get(':nth-child(3) > .col-sm-3 > h3', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)                
        })
        //Contents
        cy.get(':nth-child(3) > .col-sm-9 > .form-group > .col-12', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)                
        })
    })
    it('Profile page - Change Password is visible',()=>{
        cy.get('.col-sm-5 > span', { timeout: 20000 }).should('exist')
    })
    it('Validation of Profile page - Change Password is Clickable',()=>{
        cy.get('.col-sm-5 > span', { timeout: 20000 }).click({force: true})
        cy.url();
        cy.location('href').then((urlText) => {
           const temp = urlText
           cy.log(temp);
           cy.clearLocalStorage()
        })
    })
})