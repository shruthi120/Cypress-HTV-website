describe("Testing Profile Page", () => {
    let Token = " ";
    let Hash=" ";
    let code =" ";
    let msg="";
    it('Verification of Login link', () => {
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
        cy.get('.navbar-text > .btn', { timeout: 20000 }).click()
        cy.url()
        .wait(1000)
    })
    it('Login to Test user', () => {
        cy.url()
        cy.get('#inputEmail', { timeout: 20000 }).type('testventuno@gmail.com')
        cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
        cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).check()
        cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
        cy.url()
        .wait(8000)
    })

it('Profile page',()=>{
    cy.get('#profileNavbarDropdownMenuLink', { timeout: 20000 }).click()
    cy.get('[href="/profile"]', { timeout: 20000 }).click()
    cy.url()
    .wait(5000)
    //Change Password
    cy.get('.col-sm-5 > span', { timeout: 20000 }).should('exist').click()
    cy.get('#inputPassword', { timeout: 20000 }).invoke('attr', 'placeholder').then((urlText) => {
        const temp = urlText.toString();
        cy.log(temp);
    })
    cy.get('#inputNewPassword', { timeout: 20000 }).invoke('attr', 'placeholder').then((urlText) => {
        const temp = urlText.toString();
        cy.log(temp);
    })
    cy.get('#inputConfirmPassword', { timeout: 20000 }).invoke('attr', 'placeholder').then((urlText) => {
        const temp = urlText.toString();
        cy.log(temp);
    })
    //Changing Password from Frontend
    cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
    cy.get('#inputNewPassword', { timeout: 20000 }).type('123456789')
    cy.get('#inputConfirmPassword', { timeout: 20000 }).type('123456789')
    //Update Button
    cy.get('.btn-col > :nth-child(1)', { timeout: 20000 }).click()
    cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
        msg = urlText.toString();
        cy.log(msg);
    })
    cy.get('.noty_close_button', { timeout: 10000 }).should('exist').click()
    cy.url()
    })
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
                password:'123456789',
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
    it('Changing password from backend',()=>{
        cy.url()
            cy.request({
                method: "POST",
            url: "https://testottapi.ventunotech.com/v1/ott/changePassword/5d145529a7c72/211",
            form: true,
            body : {
                user_key: '91951763752190',
                password:'123456789',
                new_password:'12345678',
                user_id: '95480',
                token: Token,
                app_version: '1.3.12'
            },
        })
            .then((response) => {
                var jsonData = response.body;
                expect(jsonData.response.data.message).contains(msg)
            })    
    })
    it('Cancel Button',()=>{
        //Change Password
        cy.get('.col-sm-5 > span', { timeout: 20000 }).should('exist').click()
        cy.get('.btn-col > :nth-child(2)', { timeout: 20000 }).should('exist').click()
        cy.url()
    })
   it('Negative popups',()=>{
       //With only old Password
        cy.get('.col-sm-5 > span', { timeout: 20000 }).should('exist').click()
        cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
        cy.url()
        cy.get('.btn-col > :nth-child(1)', { timeout: 20000 }).click()
        cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            msg = urlText.toString();
            cy.log(msg);
        })
        cy.get('.noty_close_button', { timeout: 10000 }).should('exist').click()
        cy.url()
        .wait(2000)
        //With only new Password
            cy.get('#inputPassword', { timeout: 20000 }).clear()
            cy.get('#inputNewPassword', { timeout: 20000 }).type('12345678')
            cy.url()
            cy.get('.btn-col > :nth-child(1)', { timeout: 20000 }).click()
            cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
                msg = urlText.toString();
                cy.log(msg);
            })
            cy.get('.noty_close_button', { timeout: 30000 }).should('exist').click()
            cy.url()
            .wait(2000)
           // With only Confirm Password 
           cy.get('#inputNewPassword', { timeout: 20000 }).clear()
                cy.get('#inputConfirmPassword', { timeout: 20000 }).type('12345678')
                cy.url()
                cy.get('.btn-col > :nth-child(1)', { timeout: 20000 }).click()
                cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
                    msg = urlText.toString();
                    cy.log(msg);
                })
                cy.get('.noty_close_button', { timeout: 10000 }).should('exist').click()
                cy.url()
                .wait(2000)
                //Mismatch New & Confirm Password
                cy.get('#inputConfirmPassword', { timeout: 20000 }).clear()
                    cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
                    cy.get('#inputNewPassword', { timeout: 20000 }).type('123456789')
                    cy.get('#inputConfirmPassword', { timeout: 20000 }).type('1234567')
                    cy.url()
                    cy.get('.btn-col > :nth-child(1)', { timeout: 20000 }).click()
                    cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
                        msg = urlText.toString();
                        cy.log(msg);
                    })
                    cy.get('.noty_close_button', { timeout: 10000 }).should('exist').click()
                    cy.url()
                    })
})