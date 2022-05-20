describe("Testing Shop tab", () => {
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/shop/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '81619896798158',
                app_version: '1.3.11'
            }
        })
            .then((response) => {
                expect(response.body).have.property('response')
                expect(response).to.have.property('status', 200)
                expect(response.body).to.not.be.null
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
        cy.get(':nth-child(4) > .btn', { timeout: 10000 }).click()
        .wait(2000)
    })
    it('Validating shop nav link is clickable', () => {       
            cy.get(':nth-child(6) > .nav-link', { timeout: 10000 }).click({force:true})
            cy.url()
    })
    it('Validating Add to cart btn 1 is clickable',()=>{
            cy.get(':nth-child(2) > .card-body > .card-add-container > .add-to-cart > :nth-child(1)', { timeout: 50000 }).click({force:true})
        })
        it('Validating Shopping cart Checkout is clickable',()=>{ 
            cy.get('.shop-icon').click()
            cy.get('.ca-wrpr > :nth-child(1) > :nth-child(1)', { timeout: 20000 })
            //Checkout
            cy.get('.sh-cart-btn > .btn', { timeout: 50000 }).click()
            .wait(10000)
            cy.url();
        }) 
        it('Validation of Chcekout page',()=>{
            cy.get('.form-body > .container > :nth-child(1)').should('exist')
            cy.get('label', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
            cy.get('#country-list').select('Indonesia')
        })
    })