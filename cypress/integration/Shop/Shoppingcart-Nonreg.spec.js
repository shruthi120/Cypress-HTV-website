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
    it('Validating shop nav link is clickable', () => {  
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })     
            cy.get(':nth-child(6) > .nav-link', { timeout: 10000 }).click({force:true})
            .wait(2000)
            cy.url()
    })
    it('Validating Add to cart btn 1 is clickable',()=>{
            cy.get(':nth-child(2) > .card-body > .card-add-container > .add-to-cart > :nth-child(1)', { timeout: 50000 }).click({force:true})
            .wait(3000)
        })
        it('Popup',()=>{
            cy.get('.ca-wrpr').should('exist')
        })
        it('Shopping cart title',()=>{
            cy.get('.shop-icon').click()
            cy.get('.ca-wrpr > :nth-child(1) > :nth-child(1)', { timeout: 20000 })
            cy.get('.v-widget > .widget-title > h2', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            })  
        })
        it('Shopping cart image & product title,price,quantity num',()=>{
           //Image
            cy.get('.col-3 > img').should('exist')
            cy.get('.ca-wrpr > :nth-child(1) > :nth-child(1)', { timeout: 20000 })
            cy.get('.cart-item-name', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
            //Product Title
            cy.get('.cart-item-total', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
            //Quantity number
            cy.get('.col-9 > .product-quantity > .qty-num', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
        })
        it('Shopping cart Subtotal,Shipping,Total',()=>{
            cy.get('.ca-wrpr > :nth-child(1) > :nth-child(1)', { timeout: 20000 })
            //Subtotal
            cy.get(':nth-child(1) > .summary-right', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
            //Shipping
            cy.get(':nth-child(2) > .summary-right', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
            //Total
            cy.get(':nth-child(4) > .summary-right', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
        })
        it('Validating Shopping cart Checkout is clickable',()=>{ 
            //Checkout
            cy.get(':nth-child(6) > .nav-link', { timeout: 50000 }).click({force: true})
            cy.get('.shop-icon', { timeout: 50000 }).click({force: true})
            cy.get('.sh-cart-btn > .btn', { timeout: 80000 }).click({force:true})
            cy.url()
            .wait(10000)
                    cy.location('href').then((urlText) => {
                       const temp = urlText
                       cy.log(temp);
                       cy.request({
                        method: "POST",
                        url: "https://testottapi.ventunotech.com/v3/ott/cartDetails/5d145529a7c72/211",
                        form: true,
                        body: {
                            user_key:' 10185419677031',
                            app_version: '1.3.13'
                        }
                    })
                         .then((response) => {
                             
                        var jsonData = response.body;
                                     expect(jsonData.response.data.widgets).to.have.length(1)
                                     var Navbar = jsonData.response.data.widgets[0].data;
                                     expect(Navbar.cards[1].data.checkout_link.url).to.equal(temp)
                           })
                    })
        })
       it('Validating Delete icon is clickable', () => {
            cy.get('.shop-icon').click()
            cy.get('.ca-wrpr > :nth-child(1) > :nth-child(1)', { timeout: 20000 })
            //Delete
            cy.get('.cart-item-remove', { timeout: 20000 }).click({force: true})
        })
        it('Validating After Deleting - Shopping Cart Title,Image,Text,close', () => {
            cy.get('.shop-icon').click()
            .wait(2000)
            cy.get('.ca-wrpr', { timeout: 20000 })
            //Title
            cy.get('h2', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
            .wait(5000)
            //Image
            cy.get('.EmptyCart', { timeout: 20000 }).should('exist')
            //Text 1
            cy.get('.empty-cart-msg', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
            //Text 2
            cy.get('.cart-links-msg > a > span', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)      
            }) 
            //Close
            cy.get('.close-icon > .fas').should('exist')
            cy.get('.cart-links-msg > a > span', { timeout: 20000 }).click({force: true})
            cy.url()
            cy.location('href').then((urlText) => {
                const temp = urlText
                cy.log(temp);
                cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/cartDetails/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93264865961166',
                     app_version: '1.3.13'
                 }
             })
                  .then((response) => {
                      
                 var jsonData = response.body;
                              expect(jsonData.response.data.widgets).to.have.length(1)
                              var Navbar = jsonData.response.data.widgets[0].data;
                              expect(Navbar.cards[0].data.back_link.url).to.equal(temp)
                    })
             })
        })
})