describe("Testing Navbar api links", () => {
    let msg="";
    let verificationid = " ";
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
        it('Login link', () => {
            cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
            cy.url()
        })
        it('Create Account', () => {
            cy.get('.text-accent > a', { timeout: 10000 }).click()
        })
        it('Checking Name is visible', () => {
            cy.url()
            cy.get('#inputName', { timeout: 20000 }).should('exist').invoke('attr', 'placeholder').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
                cy.request({
                    method: "POST",
                    url: "https://ottapi.ventunotech.com/v1/ott/registerPage/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '91831939334260',
                        app_version: '1.3.12'
                    }
                })
                    .then((response) => {
                        var jsonData = response.body;
                        expect(jsonData.response.data.widgets).to.have.length(1)
                        var Navbar = jsonData.response.data.widgets[0].data;
                        cy.expect(Navbar.labels.name).to.equal(temp);
                    })
            })
        })
        it('Checking Email is visible', () => {
            cy.url()
            cy.get('#inputEmail', { timeout: 20000 }).should('exist').invoke('attr', 'placeholder').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
                cy.request({
                    method: "POST",
                    url: "https://ottapi.ventunotech.com/v1/ott/registerPage/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '91831939334260',
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
        it('Checking pincode select is visible', () => {
            cy.get('.custom-select', { timeout: 20000 }).should('exist').select('+91')
            .should('have.value', '+91')
        })
        it('Checking Phone is visible', () => {
            cy.url()
            cy.get('#inputPhone', { timeout: 20000 }).should('exist').invoke('attr', 'placeholder').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
                cy.request({
                    method: "POST",
                    url: "https://ottapi.ventunotech.com/v1/ott/registerPage/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '91831939334260',
                        app_version: '1.3.12'
                    }
                })
                    .then((response) => {
                        var jsonData = response.body;
                        expect(jsonData.response.data.widgets).to.have.length(1)
                        var Navbar = jsonData.response.data.widgets[0].data;
                        cy.expect(Navbar.labels.phoneNumber).to.equal(temp);
                    })
            })
        })
        it('Checking Password is visible', () => {
            cy.url()
            cy.get('#inputPassword', { timeout: 20000 }).should('exist').invoke('attr', 'placeholder').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
                cy.request({
                    method: "POST",
                    url: "https://ottapi.ventunotech.com/v1/ott/registerPage/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '91831939334260',
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
        it('Checking Confirm Password is visible', () => {
            cy.url()
            cy.get('#inputConfirmPassword', { timeout: 20000 }).should('exist').invoke('attr', 'placeholder').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
                cy.request({
                    method: "POST",
                    url: "https://ottapi.ventunotech.com/v1/ott/registerPage/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '91831939334260',
                        app_version: '1.3.12'
                    }
                })
                    .then((response) => {
                        var jsonData = response.body;
                        expect(jsonData.response.data.widgets).to.have.length(1)
                        var Navbar = jsonData.response.data.widgets[0].data;
                        cy.expect(Navbar.labels.confirmPassword).to.equal(temp);
                    })
            })
        })
        it('Phone & Email is required -- Negative scenario', () => {
            cy.url()
            cy.get('#inputName', { timeout: 20000 }).type('Test123')
            /*cy.get('#inputEmail', { timeout: 20000 }).type('testventuno1@gmail.com')
            cy.get('#inputPhone', { timeout: 20000 }).type('9841418284')
            cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
            cy.get('#inputConfirmPassword', { timeout: 20000 }).type('12345678')*/
           cy.get('.col > .btn', { timeout: 20000 }).click()
           cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            msg = urlText.toString();
            cy.log(msg);
        })
        .wait(5000)
        })
        it('Phone number is required -- Negative scenario', () => {
            cy.url()
            cy.get('#inputName', { timeout: 20000 }).clear().type('Test123')
            cy.get('#inputEmail', { timeout: 20000 }).type('testventuno1@gmail.com')
           /* cy.get('#inputPhone', { timeout: 20000 }).type('9841418284')
            cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
            cy.get('#inputConfirmPassword', { timeout: 20000 }).type('12345678')*/
           cy.get('.col > .btn', { timeout: 20000 }).click()
           cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            msg = urlText.toString();
            cy.log(msg);
        })
        .wait(5000)
        })
        it('Email already exists -- Negative scenario', () => {
            cy.url()
            cy.get('#inputName', { timeout: 20000 }).clear().type('Test')
            cy.get('#inputEmail', { timeout: 20000 }).clear().type('testventuno@gmail.com')
            cy.get('#inputPhone', { timeout: 20000 }).type('9841418284')
            /*cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
            cy.get('#inputConfirmPassword', { timeout: 20000 }).type('12345678')*/
           cy.get('.col > .btn', { timeout: 20000 }).click()
           cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            msg = urlText.toString();
            cy.log(msg);
        })
       // .wait(5000)
        cy.request({
            method: "POST",
        url: "https://testottapi.ventunotech.com/v1/ott/getOttAuthCde/5d145529a7c72/211",
        form: true,
        body : {
            email: "testventuno@gmail.com",
             phone: "9841418284",
              dial_code: "+91", 
              user_key: "10937782203237",
            app_version: '1.3.12'
        },
    })
        .then((response) => {
            var jsonData = response.body;
           expect(jsonData.response.data.message).contains(msg)
        })
        .wait(5000)
        })
        it('Mobile number already exists -- Negative scenario', () => {
            cy.url()
            cy.get('#inputName', { timeout: 20000 }).clear().type('test')
            cy.get('#inputEmail', { timeout: 20000 }).clear().type('testventuno1@gmail.com')
            cy.get('#inputPhone', { timeout: 20000 }).clear().type('9884668284')
            /*cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
            cy.get('#inputConfirmPassword', { timeout: 20000 }).type('12345678')*/
           cy.get('.col > .btn', { timeout: 20000 }).click()
           cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            msg = urlText.toString();
            cy.log(msg);
        })
        //.wait(5000)
        cy.request({
            method: "POST",
        url: "https://testottapi.ventunotech.com/v1/ott/getOttAuthCde/5d145529a7c72/211",
        form: true,
        body : {
            app_version: "1.3.13",
dial_code: "+91",
email: "testventuno1@gmail.com",
phone: "9884668284",
user_key: "37059038605443"
        },
    })
        .then((response) => {
            var jsonData = response.body;
           expect(jsonData.response.data.message).contains(msg)
        })
        .wait(5000)
        })
        it('Confirm Password doesnt match -- Negative scenario', () => {
            cy.url()
            cy.get('#inputName', { timeout: 20000 }).clear().type('test5')
            cy.get('#inputEmail', { timeout: 20000 }).clear().type('testventuno5@gmail.com')
            cy.get('#inputPhone', { timeout: 20000 }).clear().type('6789012345')
            cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
            cy.get('#inputConfirmPassword', { timeout: 20000 }).type('qwertyui')
           cy.get('.col > .btn', { timeout: 20000 }).click()
           cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            msg = urlText.toString();
            cy.log(msg);
        })
        //.wait(5000)
        cy.request({
            method: "POST",
        url: "https://testottapi.ventunotech.com/v1/ott/getOttAuthCde/5d145529a7c72/211",
        form: true,
        body : {
            app_version: "1.3.13",
dial_code: "+91",
email: "testventuno5@gmail.com",
phone:"6789012345",
user_key: "37059038605443"
        },
    })
        .then((response) => {
            var jsonData = response.body;
           expect(jsonData.response.data.message).contains(msg)
        })
        .wait(5000)
        })
        it('OTP - Verify otp success and negative popup ', () => {
            cy.get('#inputOTP', { timeout: 20000 }).clear().type('762587')
            .wait(2000)
            cy.get('#register-iagree-btn', { timeout: 20000 }).check()
            cy.get('.col > .btn-sm', { timeout: 20000 }).click()
            cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
                msg = urlText.toString();
                cy.log(msg);
            })
            cy.request({
                method: "POST",
            url: "https://testottapi.ventunotech.com/v1/ott/verifyMobileOTPCode/5d145529a7c72/211",
            form: true,
            body : {
                app_version: "1.3.13",
dial_code: "+91",
email: "testventuno5@gmail.com",
phone: "6789012345",
user_key: "47712109042851",
verification_code: "762587"
            },
        })
            .then((response) => {
                var jsonData = response.body;
                verificationid=jsonData.response.data.verification_id;
        cy.log(verificationid)
            })
            .wait(5000)
        }) 
        it('OTP successfully sent -- Success ', () => {
            cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
            cy.get('.text-accent > a', { timeout: 10000 }).click()
           cy.get('#inputName', { timeout: 20000 }).clear().type('test5')
           cy.get('#inputEmail', { timeout: 20000 }).clear().type('testventuno5@gmail.com')
           cy.get('#inputPhone', { timeout: 20000 }).clear().type('6789012345')
            cy.get('#inputPassword', { timeout: 20000 }).clear().type('12345678')
            cy.get('#inputConfirmPassword', { timeout: 20000 }).clear().type('12345678')
           cy.get('.col > .btn', { timeout: 20000 }).click()
           cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            msg = urlText.toString();
            cy.log(msg);
        })
        cy.request({
            method: "POST",
        url: "https://testottapi.ventunotech.com/v1/ott/getOttAuthCde/5d145529a7c72/211",
        form: true,
        body : {
            app_version: "1.3.13",
            dial_code: "+91",
            email: "testventuno5@gmail.com",
            phone: "6789012345",
            user_key: "14389810228442"
        },
    })
        .then((response) => {
            var jsonData = response.body;
           expect(jsonData.response.data.message).contains(msg)
        })
        .wait(5000)
        })//762587
        it('OTP - Verify otp failure', () => {
            cy.get('#inputOTP', { timeout: 20000 }).type('123456')
            .wait(2000)
            cy.get('#register-iagree-btn', { timeout: 20000 }).check()
            cy.get('.col > .btn-sm', { timeout: 20000 }).click()
            cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
                msg = urlText.toString();
                cy.log(msg);
            })
            cy.request({
                method: "POST",
            url: "https://testottapi.ventunotech.com/v1/ott/verifyMobileOTPCode/5d145529a7c72/211",
            form: true,
            body : {
                email: "testventuno5@gmail.com",
                 phone: "6789012345",
                  dial_code: "+91", 
                  user_key: "10937782203237",
                  verification_code: "123456762587",
                app_version: '1.3.12'
            },
        })
            .then((response) => {
                var jsonData = response.body;
               expect(jsonData.response.data.message).contains(msg)
            })
            .wait(6000)
        }) 
        it('Resend OTP ', () => {
            cy.get('.col-5 > .btn', { timeout: 20000 }).click()
            cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
                msg = urlText.toString();
                cy.log(msg);
            })
                cy.request({
                    method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/getOttAuthCde/5d145529a7c72/211",
                form: true,
                body : {
                    email: "testventuno5@gmail.com",
                     phone: "6789012345",
                      dial_code: "+91", 
                      user_key: "10937782203237",
                    app_version: '1.3.12'
                },
            })
                .then((response) => {
                    var jsonData = response.body;
                  // expect(jsonData.response.data.message).contains(msg)
                })
                .wait(6000)
            })
    it('OTP - Verify otp success', () => {
        cy.get('#inputOTP', { timeout: 20000 }).clear().type('762587')
        .wait(2000)
       cy.get('#register-iagree-btn', { timeout: 20000 }).uncheck()
       // cy.get('.col > .btn-sm', { timeout: 20000 }).click()
        /*cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            msg = urlText.toString();
            cy.log(msg);
        })
        cy.request({
            method: "POST",
        url: "https://testottapi.ventunotech.com/v1/ott/verifyMobileOTPCode/5d145529a7c72/211",
        form: true,
        body : {
            app_version: "1.3.13",
            dial_code: "+91",
            email: "testventuno5@gmail.com",
            phone: "6789012345",
            user_key: "29467638320653",
            verification_code: "123456762587"
        },
    })
        .then((response) => {
            var jsonData = response.body;
          // expect(jsonData.response.data.message).contains(msg)
        })*/
        .wait(5000)
    }) 
        it('Checking Agree Checkbox is visible & clickable', () => {
           /* cy.get('#profileNavbarDropdownMenuLink', { timeout: 20000 }).click()
            cy.get('.dropdown-menu > :nth-child(4)', { timeout: 20000 }).click()
            cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
        cy.get('.text-accent > a', { timeout: 10000 }).click()*/
            cy.get('#register-iagree-btn', { timeout: 20000 }).check()
        })
        it('Verifying Terms of use is visible',()=>{
            cy.get('.form-check-label > [href="/terms"]', { timeout: 20000 }).should('exist').invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
            })
        })
        it('Validating Terms of use ',()=>{
            cy.get('.form-check-label > [href="/terms"]', { timeout: 20000 }).click() 
            cy.url()
            cy.location('href').then((urlText) => {
                const temp = urlText
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
                            var Navbar = jsonData.response.data;
                            cy.expect(Navbar.widgets[1].data.cards[0].data.action.primary.url).to.equal(temp);
        })
        })
        .wait(3000)
    })
    it('Verifying Privacy Policy is visible',()=>{
        cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
        cy.get('.text-accent > a', { timeout: 10000 }).click()
        cy.get('.form-check-label > [href="/privacy"]', { timeout: 20000 }).should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
        .wait(3000)
    })
    it('Validating Privacy Policy ',()=>{
        cy.get('.form-check-label > [href="/privacy"]', { timeout: 20000 }).click() 
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
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
                        var Navbar = jsonData.response.data;
                        cy.expect(Navbar.widgets[0].data.cards[0].data.action.primary.url).to.equal(temp);
    })
    })
    .wait(3000)
})
        it('Verifying Already have an account? Login Now is visible',()=>{
            cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
            cy.get('.text-accent > a', { timeout: 10000 }).click()
            cy.get('.col > span', { timeout: 20000 }).should('exist').invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
            })
        })
        it('Validating Login Now ',()=>{
            cy.get('.col > span', { timeout: 20000 }).click() 
            cy.url()
            cy.location('href').then((urlText) => {
                const temp = urlText
                cy.log(temp);
                cy.request({
                    method: "POST",
                    url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '43241614960106',
                        app_version: '1.3.13'
                    }
                })
                    .then((response) => {
                        var jsonData = response.body;
                        var Navbar = jsonData.response.data.widgets[0].data;
                        cy.expect(Navbar.registerPageURL.url).to.equal(temp);
                    })
            })
        })
       /* it(' Success ', () => {
            cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
            cy.get('.text-accent > a', { timeout: 10000 }).click()
           cy.get('#inputName', { timeout: 20000 }).clear().type('test6')
           cy.get('#inputEmail', { timeout: 20000 }).clear().type('testventuno6@gmail.com')
           cy.get('#inputPhone', { timeout: 20000 }).clear().type('7890123456')
            cy.get('#inputPassword', { timeout: 20000 }).clear().type('12345678')
            cy.get('#inputConfirmPassword', { timeout: 20000 }).clear().type('12345678')
           cy.get('.col > .btn', { timeout: 20000 }).click()
           cy.get('.noty_body', { timeout: 10000 }).invoke('text').then((urlText) => {
            msg = urlText.toString();
            cy.log(msg);
        })
        cy.request({
            method: "POST",
        url: "https://testottapi.ventunotech.com/v1/ott/getOttAuthCde/5d145529a7c72/211",
        form: true,
        body : {
            app_version: "1.3.13",
            dial_code: "+91",
            email: "testventuno6@gmail.com",
            phone: "7890123456",
            user_key: "14389810228442"
        },
    })
        .then((response) => {
            var jsonData = response.body;
           expect(jsonData.response.data.message).contains(msg)
        })
        .wait(5000)
        })//762587
        it('OTP - Verify otp failure', () => {
            cy.get('#inputOTP', { timeout: 20000 }).type('762587')
            .wait(2000)
            cy.get('#register-iagree-btn', { timeout: 20000 }).check()
            cy.get('.col > .btn-sm', { timeout: 20000 }).click()
        })*/
    })