describe("Testing Login Page", () => {
    //*test12345678
    let Token = " ";
    let Hash=" ";
    let code =" ";
    let verificationid = " ";
    let msg = " ";
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
    it('Verification id',()=>{
    cy.request({
        method: "POST",
    url: "https://testottapi.ventunotech.com/v1/ott/verifyMobileOTPCode/5d145529a7c72/211",
    form: true,
    body : {
        user_key: '91951763752190',
        password:'12345678',
        verification_code:'762587',
        user_id: '86351',
        token: Token,
        app_version: '1.3.12'
    },
})
    .then((response) => {
        var jsonData = response.body;
        verificationid=jsonData.response.data.verification_id;
        cy.log(verificationid)
    })    
})
    it("Forgot Password is visible",()=>{
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 20000 })
        cy.get('.navbar-text > .btn', { timeout: 20000 }).click()
        cy.url()
        .wait(1000)
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
    it('Checking Phone & Email are visible', () => {
        cy.url()
        //Phone
        cy.get(':nth-child(1) > .form-check-label', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
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
                    cy.expect(Navbar.labels.phone).to.equal(temp);
        })
    //Email
    cy.get(':nth-child(2) > .form-check-label', { timeout: 20000 }).invoke('text').then((urlText) => {
        const temp = urlText.toString();
        cy.log(temp);
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
                cy.expect(Navbar.labels.email).to.equal(temp);
    })
    })
})
})
it('Checking Checkbox - Phone is visible', () => {
    cy.url()
    cy.get('#forgotpassword-type-toggle-phone', { timeout: 20000 }).check()
})
it('Checking pincode select is visible', () => {
    cy.get('.custom-select', { timeout: 20000 }).should('exist').select('+91')
    .should('have.value', '+91')
})
it('Checking Phone is visible', () => {
    cy.get('#inputPhone', { timeout: 20000 }).should('exist').invoke('attr','placeholder').then((urlText) => {
        const temp = urlText.toString();
        cy.log(temp);
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
                cy.expect(Navbar.labels.phoneNumber).to.equal(temp);
    })
    })
})
it('Checking Checkbox - Email is visible', () => {
    cy.url()
    cy.get('#forgotpassword-type-toggle-email', { timeout: 20000 }).check()
})
it('Checking Phone is visible', () => {
    cy.get('#inputEmail', { timeout: 20000 }).should('exist').invoke('attr','placeholder').then((urlText) => {
        const temp = urlText.toString();
        cy.log(temp);
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
                cy.expect(Navbar.labels.emailAddress).to.equal(temp);
    })
    })
})
it('Email credentials sending OTP', () => {
    cy.url()
    cy.get('#inputEmail', { timeout: 20000 }).type('testventuno@gmail.com')
    cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
    cy.url()
    .wait(2000)
    cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
        msg = urlText.toString();
        cy.log(msg);
    })
    cy.request({
        method: "POST",
    url: `https://testottapi.ventunotech.com/v1/ott/forgot/5d145529a7c72/211/${code}`,
    form: true,
    body : {
        user_key: '92688673705372',
        email:'testventuno@gmail.com',
       // new_password:'12345678',
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
it('Email credentials sending OTP - Verify otp success', () => {
    cy.url()
    .wait(2000)
    cy.get('#inputOTP', { timeout: 20000 }).type('762587')
    .wait(2000)
    cy.get(':nth-child(5) > .btn', { timeout: 20000 }).click()
    cy.url()
}) 
it('Email credentials sending OTP - Password & Confirm Password', () => {
    cy.url()
    cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
    cy.get('#inputConfirmPassword', { timeout: 20000 }).type('12345678')
    cy.url()
    cy.get(':nth-child(6) > .btn', { timeout: 20000 }).click()
    cy.url()
    .wait(1000)
    cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
        msg = urlText.toString();
        cy.log(msg);
    })
    cy.request({
        method: "POST",
    url: "https://testottapi.ventunotech.com/v1/ott/updatePassword/5d145529a7c72/211",
    form: true,
    body : {
        user_key: '91951763752190',
        password:'12345678',
        verification_code:'762587',
        email:'testventuno@gmail.com',
        user_id: '95480',
        verification_id:verificationid,
        token: Token,
        app_version: '1.3.12'
    },
})
    .then((response) => {
        var jsonData = response.body;
        expect(jsonData.response.data.message).contains(msg)
    })
})
it('Checking pincode select is visible', () => {
    cy.get(':nth-child(3) > .text-accent', { timeout: 20000 }).click()
    cy.get('#forgotpassword-type-toggle-phone', { timeout: 20000 }).check()
    cy.get('.custom-select', { timeout: 20000 }).should('exist').select('+91')
    .should('have.value', '+91')
})
it(' Phone credentials sending OTP', () => {
    cy.get('#inputPhone', { timeout: 20000 }).type('9884668284')
    cy.get(':nth-child(4) > .btn', { timeout: 20000 }).click()
    cy.url()
    .wait(5000)
    cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
        msg = urlText.toString();
        cy.log(msg);
    })
    cy.request({
        method: "POST",
    url: `https://testottapi.ventunotech.com/v1/ott/forgot/5d145529a7c72/211/${code}`,
    form: true,
    body : {
        user_key: '92688673705372',
        email:'testventuno@gmail.com',
       // new_password:'12345678',
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
it('Phone credentials sending OTP - Verify otp success', () => {
    cy.url()
    .wait(2000)
    cy.get('#inputOTP', { timeout: 20000 }).type('762587')
    .wait(3000)
    cy.get(':nth-child(5) > .btn', { timeout: 20000 }).click()
    cy.url()
}) 
it('Phone credentials sending OTP - Password & Confirm Password', () => {
    cy.url()
    cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
    cy.get('#inputConfirmPassword', { timeout: 20000 }).type('12345678')
    cy.url()
    cy.get(':nth-child(6) > .btn', { timeout: 20000 }).click()
    cy.url()
    .wait(2000)
    cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
        msg = urlText.toString();
        cy.log(msg);
    })
    cy.request({
        method: "POST",
    url: "https://testottapi.ventunotech.com/v1/ott/updatePassword/5d145529a7c72/211",
    form: true,
    body : {
        user_key: '91951763752190',
        password:'12345678',
        verification_code:'762587',
        email:'testventuno@gmail.com',
        user_id: '95480',
        verification_id:verificationid,
        token: Token,
        app_version: '1.3.12'
    },
})
    .then((response) => {
        var jsonData = response.body;
        expect(jsonData.response.data.message).contains(msg)
    })    
})
})