describe("Testing Shop tab", () => {
    let Token = " ";
    let Hash=" ";
    let code =" ";
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/shop/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '81619896798158',
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
                email:'testventuno10@gmail.com',
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
    it('Verification of Login link', () => {       
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
        cy.url()
    })
    it('Login to Test user', () => {
        cy.url()
        cy.get('#inputEmail', { timeout: 20000 }).type('testventuno10@gmail.com')
        cy.get('#inputPassword', { timeout: 20000 }).type('12345678')
        cy.get(':nth-child(3) > :nth-child(1) > input', { timeout: 20000 }).check()
        cy.get(':nth-child(4) > .btn', { timeout: 10000 }).click()
        .wait(8000)
    })
        it('Checking navbar links are visible', () => {
           // cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
            const tem=[];
          
               for(var i=1;i<=6;i++){
                cy.get('.mr-auto > :nth-child('+i+') > .nav-link', { timeout: 20000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                tem.push(temp);
                })
                }
                cy.request({
                    method: "POST",
                    url: "https://testottapi.ventunotech.com/v3/ott/navBar/5d145529a7c72/211",
                    form: true,
                    body: {
                    user_key: '15240409024962',
                    app_version: '1.3.12',
                    token:Token,
                    user_id: '98444'
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
    it('Checking Shop link is clickable', () => {
        cy.get(':nth-child(6) > .nav-link', { timeout: 10000 }).click()
        cy.url()
    })
    it('Shop red highlight',()=>{
        cy.get(':nth-child(6) > .nav-link')
        .click()
        .should('have.class', 'active')
        .wait(3000)
        })
    it('Checking Products title is visible', () => {
        cy.get('.col > .widget-title > h2', { timeout: 10000 }).invoke('text').then((urlText) => {
       const temp = urlText.toString();
        cy.log(temp)                
        cy.request({
           method: "POST",
           url: "https://testottapi.ventunotech.com/v3/ott/shop/5d145529a7c72/211",
           form: true,
           body: {
            app_version: "1.3.13",
            url: "https://testhtvfun.ventunotech.com/shop",
            token:Token,
            user_id: '98444',
            user_key: "07801920481157"
           }
       })
            .then((response) => {
                
           var jsonData = response.body;
                        expect(jsonData.response.data.widgets).to.have.length(1)
                        var Navbar = jsonData.response.data;
                        expect(Navbar.title).to.equal(temp)
              })
           })
       })
       it('Checking Products images are visible', () => {
        for(var i=2;i<6;i++){
            for(var j=1;j<2;j++){
        cy.get(':nth-child('+i+') > :nth-child('+j+') > .card-img-top', { timeout: 10000 }).should('exist')
             }
            }
        })
        it('Checking Products images are clickable -- Success ', () => {
            const tem=[];
            for(var i=2;i<6;i++){
                for(var j=1;j<2;j++){
            cy.get(':nth-child('+i+') > :nth-child('+j+') > .card-img-top', { timeout: 10000 }).click({force: true})
                 cy.url();
                 cy.location('href').then((urlText) => {
                    const temp = urlText
                    cy.log(temp);
                tem.push(temp);
                cy.log(tem)              
                 })
                 }
                }
                 cy.request({
                    method: "POST",
                    url: "https://testottapi.ventunotech.com/v3/ott/shop/5d145529a7c72/211",
                    form: true,
                    body: {
                        url: "https://testhtvfun.ventunotech.com/shop",
                        user_key: '15240409024962',
                        app_version:'1.3.13',
                        token:Token,
                        user_id: 98444
                    }
                })
                    .then((response) => {
                        var jsonData = response.body;
                        expect(jsonData.response.data.widgets[0].data.cards).to.have.length(4)
                        var Navbar = jsonData.response.data;
                        var result=[];
                        const url=[];
                        for(var j=0;j<1;j++){
                           for(var k=0;k<4;k++){
                        var imgurl = Navbar.widgets[j].data.cards[k].data.link.url
                        url.push(imgurl)
                           }
                        }
                        cy.log(tem)
                        .wait(8000)
                        for(var r=0;r<4;r++){
                            if(tem.length == url.length){
                                for(var t=0;t<4;t++){
                                if(tem[r] == url[t]){
                                     result.push(tem);
                                     result = Array.prototype.concat.apply([], result);
                                    cy.log(result)
                                }
                               else{
                                   r++;
                               }
                            }    
                        }
                        else{
                            cy.log('false')
                        }
                        if(tem[k]== result[k]){
                            cy.log("Two arrays are matching")
                        }
                        else{
                            cy.log("Arrays mismatched")
                        }
                    }
                    })
                })
            it('Checking Products images are clickable -- Failure Negative test case ', () => {
                cy.get(':nth-child(6) > .nav-link', { timeout: 10000 }).click({force: true})
                const tem=[];
                for(var i=2;i<6;i++){
                    for(var j=1;j<2;j++){
                cy.get(':nth-child('+i+') > :nth-child('+j+') > .card-img-top', { timeout: 10000 }).click({force: true})
                     cy.url();
                     cy.location('href').then((urlText) => {
                        const temp = urlText
                        cy.log(temp);
                    tem.push(temp);
                    cy.log(tem)              
                     })
                     }
                    }
                     cy.request({
                        method: "POST",
                        url: "https://testottapi.ventunotech.com/v3/ott/shop/5d145529a7c72/211",
                        form: true,
                        body: {
                            url: "https://testhtvfun.ventunotech.com/shop",
                        user_key: '15240409024962',
                        app_version:'1.3.13',
                        token:Token,
                        user_id: 98444
                        }
                    })
                        .then((response) => {
            var jsonData = response.body;
            expect(jsonData.response.data.widgets[0].data.cards).to.have.length(4)
            var Navbar = jsonData.response.data;
            const url=[];
            for(var j=0;j<1;j++){
               for(var k=0;k<4;k++){
            var imgurl = Navbar.widgets[j].data.cards[k].data.link.url
            url.push(imgurl)
               }
            }
            cy.log(url)
            .wait(3000)
            for(var r=0;r<4;r++){
               if(tem.length == url.length){
                   for(var t=0;t<4;t++){
                   if(tem[r] == url[t]){
               t++;
            }
            else{
               r++;
            }
           }
       }
   }
   cy.log("Arrays mismatched")
            })
})
                it('Checking Products titles -- Success', () => {
                     cy.visit('https://testhtvfun.ventunotech.com/shop')
                     const tem=[];
         
                 for(var i=2;i<6;i++){
                 cy.get(':nth-child('+i+') > .card-body > .card-primary-text > .shop-item-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
                     const temp = urlText.toString();
                     tem.push(temp);
                     cy.log(tem)              
                      })
                      }
                      cy.request({
                         method: "POST",
                         url: "https://testottapi.ventunotech.com/v3/ott/shop/5d145529a7c72/211",
                         form: true,
                         body: {
                            url: "https://testhtvfun.ventunotech.com/shop",
                            user_key: '15240409024962',
                            app_version:'1.3.13',
                            token:Token,
                            user_id: 98444
                         }
                     })
                         .then((response) => {
                             var jsonData = response.body;
                             expect(jsonData.response.data.widgets[0].data.cards).to.have.length(4)
                             var Navbar = jsonData.response.data;
                             var result=[];
                             const Title=[];
                             for(var j=0;j<1;j++){
                                for(var k=0;k<4;k++){
                             var Titles = Navbar.widgets[j].data.cards[k].data.name
                             Title.push(Titles)
                                }
                             }
                            cy.log(Title)
                             .wait(3000)
                             for(var r=0;r<4;r++){
                                 if(tem.length == Title.length){
                                     for(var t=0;t<4;t++){
                                     if(tem[r] == Title[t]){
                                          result.push(tem);
                                          result = Array.prototype.concat.apply([], result);
                                         cy.log(result)  
                                     }
                                    else{
                                        r++;
                                    }
                                 }    
                             }
                             else{
                                 cy.log('false')
                             }
                             if(tem[k]== result[k]){
                                 cy.log("Two arrays are matching")
                             }
                             else{
                                 cy.log("Arrays mismatched")
                             }
                             }
                         })
                 })
                 it('Checking Products titles -- Failure Negative test case', () => {
                     // cy.visit('https://testhtvfun.ventunotech.com/shop')
                      const tem=[];
          
                 for(var i=2;i<6;i++){
                  cy.get(':nth-child('+i+') > .card-body > .card-primary-text > .shop-item-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
                      const temp = urlText.toString();
                      tem.push(temp);
                      cy.log(tem)              
                       })
                       }
                       cy.request({
                          method: "POST",
                          url: "https://testottapi.ventunotech.com/v3/ott/shop/5d145529a7c72/211",
                          form: true,
                          body: {
                            url: "https://testhtvfun.ventunotech.com/shop",
                            user_key: '15240409024962',
                            app_version:'1.3.13',
                            token:Token,
                            user_id: 98444
                          }
                      })
                          .then((response) => {
                              var jsonData = response.body;
                              expect(jsonData.response.data.widgets[0].data.cards).to.have.length(4)
                              var Navbar = jsonData.response.data;
                              const Title=[];
                              for(var j=0;j<1;j++){
                                 for(var k=0;k<4;k++){
                              var Titles = Navbar.widgets[j].data.cards[k].data.name
                              Title.push(Titles)
                                 }
                              }
                              cy.log(Title)
                              .wait(3000)
                              for(var r=0;r<4;r++){
                                 if(tem.length == Title.length){
                                     for(var t=0;t<4;t++){
                                     if(tem[r] == Title[t]){
                                 t++;
                              }
                              else{
                                 r++;
                              }
                             }
                         }
                     }
                     cy.log("Arrays mismatched")
                              })
                             })
            it('Validating Quantities are visible', () => {
                cy.get('.app-logo', { timeout: 10000 }).click()
                .wait(1000)
                cy.get(':nth-child(6) > .nav-link', { timeout: 10000 }).click()
                .wait(1000)
            for(var i=2;i<6;i++){
                cy.get(':nth-child('+i+') > .card-body > .product-quantity > .pr20', { timeout: 10000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp)        
            })
        }
    })
    it('Validating Quantities nums are visible', () => {
        cy.get('.app-logo', { timeout: 10000 }).click()
        .wait(1000)
        cy.get(':nth-child(6) > .nav-link', { timeout: 10000 }).click()
        .wait(1000)
    for(var i=2;i<6;i++){
        cy.get(':nth-child('+i+') > .card-body > .product-quantity > .qty-num', { timeout: 10000 }).invoke('text').then((urlText) => {
        const temp = urlText.toString();
        cy.log(temp)        
    })
}
})
it('Validating remove btn are visible', () => {
for(var i=2;i<6;i++){
    cy.get(':nth-child('+i+') > .card-body > .product-quantity >.vt-disabld > .fa', { timeout: 10000 }).should('exist')
}
})
it('Validating add btn are visible', () => {
    for(var i=2;i<6;i++){
        for(var j=4;j<5;j++){
        cy.get(':nth-child('+i+') > .card-body > .product-quantity >:nth-child('+j+') > .fa', { timeout: 10000 }).should('exist')
    }
}
    })
    it('Validating add btn 1 is clickable', () => {
       cy.get(':nth-child(2) > .card-body > .product-quantity > :nth-child(4) > .fa').click()
       cy.get(':nth-child(2) > .card-body > .product-quantity > .qty-num', { timeout: 10000 }).invoke('text').then((urlText) => {
        const temp = urlText.toString();
        cy.log(temp)        
    })
        })
        it('Validating remove btn 1 is clickable', () => {
                cy.get(':nth-child(2) > .card-body > .product-quantity > :nth-child(2) > .fa', { timeout: 10000 }).click()
                cy.get(':nth-child(2) > .card-body > .product-quantity > .qty-num', { timeout: 10000 }).invoke('text').then((urlText) => {
                    const temp = urlText.toString();
                    cy.log(temp)        
                })
            })
        it('Validating add btn 2 is clickable', () => {
            cy.get(':nth-child(3) > .card-body > .product-quantity > :nth-child(4) > .fa').click()
            cy.get(':nth-child(3) > .card-body > .product-quantity > .qty-num', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp)        
         })
             })
             it('Validating remove btn 2 is clickable', () => {
                cy.get(':nth-child(3) > .card-body > .product-quantity > :nth-child(2) > .fa', { timeout: 10000 }).click()
                cy.get(':nth-child(3) > .card-body > .product-quantity > .qty-num', { timeout: 10000 }).invoke('text').then((urlText) => {
                    const temp = urlText.toString();
                    cy.log(temp)        
                })
            })
             it('Validating add btn 3 is clickable', () => {
                cy.get(':nth-child(4) > .card-body > .product-quantity > :nth-child(4) > .fa').click()
                cy.get(':nth-child(4) > .card-body > .product-quantity > .qty-num', { timeout: 10000 }).invoke('text').then((urlText) => {
                 const temp = urlText.toString();
                 cy.log(temp)        
             })
                 })
                 it('Validating remove btn 3 is clickable', () => {
                    cy.get(':nth-child(4) > .card-body > .product-quantity > :nth-child(2) > .fa', { timeout: 10000 }).click()
                    cy.get(':nth-child(4) > .card-body > .product-quantity > .qty-num', { timeout: 10000 }).invoke('text').then((urlText) => {
                        const temp = urlText.toString();
                        cy.log(temp)        
                    })
                })
                 it('Validating add btn 4 is clickable', () => {
                    cy.get(':nth-child(5) > .card-body > .product-quantity > :nth-child(4) > .fa').click()
                    cy.get(':nth-child(5) > .card-body > .product-quantity > .qty-num', { timeout: 10000 }).invoke('text').then((urlText) => {
                     const temp = urlText.toString();
                     cy.log(temp)        
                 })
                     })
                     it('Validating remove btn 4 is clickable', () => {
                        cy.get(':nth-child(5) > .card-body > .product-quantity > :nth-child(2) > .fa', { timeout: 10000 }).click()
                        cy.get(':nth-child(5) > .card-body > .product-quantity > .qty-num', { timeout: 10000 }).invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp)        
                        })
                    })
        it('Validating Add to cart btns are visible', () => {
            for(var i=2;i<6;i++){
                for(var j=1;j<2;j++){
                cy.get(':nth-child('+i+') > .card-body > .card-add-container > .add-to-cart > :nth-child('+j+')', { timeout: 10000 }).invoke('text').then((urlText) => {
                    const temp = urlText.toString();
                    cy.log(temp)      
                })  
            }
        }
            })
            it('Validating Add to cart btns are clickable', () => {
                for(var i=2;i<6;i++){
                    for(var j=1;j<2;j++){
                    cy.get(':nth-child('+i+') > .card-body > .card-add-container > .add-to-cart > :nth-child('+j+')', { timeout: 10000 }).click({force:true})
                }
            }
                })
            it('Validating Prices are visible', () => {
                for(var i=2;i<6;i++){
                    cy.get(':nth-child('+i+') > .card-body > .card-add-container > .add-to-cart > .product-price-container > .product-price > b', { timeout: 10000 }).invoke('text').then((urlText) => {
                        const temp = urlText.toString();
                        cy.log(temp)      
                    })  
            }
                })
                it('Validating Shipping charges are visible', () => {
                    for(var i=2;i<6;i++){
                        cy.get(':nth-child('+i+') > .card-body > .card-add-container > .add-to-cart > .product-price-container > .adtnl-msg-area', { timeout: 10000 }).invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp)      
                        })  
                }
                    })
})