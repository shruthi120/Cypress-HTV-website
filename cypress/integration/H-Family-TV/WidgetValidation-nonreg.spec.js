describe("Testing H-Family TV tab", () => {
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
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
    it('Checking navbar links are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
        const tem=[];
      
           for(var i=1;i<=6;i++){
            cy.get(':nth-child('+i+') > .nav-link', { timeout: 10000 }).invoke('text').then((urlText) => {
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
    it('Checking H-Family Tv link is clickable', () => {
        cy.get(':nth-child(4) > .nav-link', { timeout: 10000 }).click()
        cy.url()
    })
    it('H-Family TV red highlight',()=>{
        cy.get(':nth-child(4) > .nav-link')
        .click()
        .should('have.class', 'active')
        .wait(3000)
        })
    it('Checking H-Family Tv widget title is visible', () => {
        cy.get('.video-horizontal-listing > .widget-title > h2', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)                
             cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
                }
            })
                 .then((response) => {
                     
                var jsonData = response.body;
                             expect(jsonData.response.data.widgets).to.have.length(2)
                             var Navbar = jsonData.response.data;
                             expect(Navbar.widgets[0].data.title).to.equal(temp)
                   })
                })
            })
            it('Checking H-Family Widgets first 2 Cards size', () => {
                const tem=[];
        
                for(var i=1;i<3;i++){
                cy.get('.carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
                    const temp = urlText.toString();
                    tem.push(temp);
                    cy.log(tem)              
                     })
                     }
                     cy.request({
                        method: "POST",
                        url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
                        form: true,
                        body: {
                            user_key: '93650588458740',
                            app_version: '1.3.13'
                        }
                    })
                        .then((response) => {
                            var jsonData = response.body;
                            expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                            var Navbar = jsonData.response.data;
                            for(var j=0;j<1;j++){
                                for(var k=0;k<2;k++){
                            expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][150]).to.equal(tem[k])
                            }
                        }
                        })
                })
                it('Checking H-Family Widgets first 2 Cards are clickable', () => {
                    const tem=[];
            
                    for(var i=1;i<3;i++){
                    cy.get('.carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                    cy.url();
                    cy.location('href').then((urlText) => {
                       const temp = urlText
                       cy.log(temp);
                   tem.push(temp);        
                         })
                         }
                         cy.request({
                            method: "POST",
                            url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
                            form: true,
                            body: {
                                user_key: '93650588458740',
                                app_version: '1.3.13'
                            }
                        })
                            .then((response) => {
                                var jsonData = response.body;
                                expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                                var Navbar = jsonData.response.data;
                                for(var j=0;j<1;j++){
                                    for(var k=0;k<2;k++){
                                expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k])
                                }
                            }
                            })
                    })
               /* it('Checking H-Family Widgets 3rd and 4th Cards size', () => {
                    cy.visit('https://testhtvfun.ventunotech.com/h_family_tv')
                       const tem=[];
               
                       for(var i=3;i<5;i++){
                       cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
                           const temp = urlText.toString();
                           tem.push(temp);
                           cy.log(tem)              
                            })
                            }
                            cy.request({
                               method: "POST",
                               url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
                               form: true,
                               body: {
                                user_key: '93650588458740',
                                app_version: '1.3.13'
                               }
                           })
                               .then((response) => {
                                   var jsonData = response.body;
                                   expect(jsonData.response.data.widgets[0].data.cards).to.have.length(5)
                                   var Navbar = jsonData.response.data;
                                   for(var j=0;j<1;j++){
                                       for(var k=2;k<=3;k++){
                                           for(var r=0;r<2;r++){
                                   expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][150]).to.equal(tem[r])
                                   k++;
                                       }
                                   }
                               }
                               })
     })
     it('Checking H-Family Widgets 3rd and 4th Cards are clickable', () => {
        const tem=[];

        for(var i=3;i<5;i++){
        cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
        cy.url();
        cy.location('href').then((urlText) => {
           const temp = urlText
           cy.log(temp);
       tem.push(temp);        
             })
             }
             cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets[0].data.cards).to.have.length(5)
                    var Navbar = jsonData.response.data;
                    for(var j=0;j<1;j++){
                        for(var k=2;k<=3;k++){
                            for(var r=0;r<2;r++){
                    expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[r])
                    k++;
                        }
                    }
                }
                })
        })
     it('Checking Widget Card indicator -H-Family icon nxt is visible', () => {
         cy.visit('https://testhtvfun.ventunotech.com/h_family_tv')
        cy.get('.carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
    })
    it('Checking H-Family Widgets 5th Card size', () => {
        cy.get('.carousel-item-next > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
       const temp = urlText.toString();
        cy.log(temp)                
        cy.request({
           method: "POST",
           url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
           form: true,
           body: {
            user_key: '93650588458740',
            app_version: '1.3.13'
           }
       })
            .then((response) => {
                
           var jsonData = response.body;
                        expect(jsonData.response.data.widgets).to.have.length(2)
                        var Navbar = jsonData.response.data;
                        expect(Navbar.widgets[0].data.cards[4].data.video_thumbnails["16x9"][150]).to.equal(temp)
              })
           })
       })
       it('Checking Widget Card indicator - H-Family icon previous is visible', () => {
        cy.get('.carousel-lg > .carousel-control-prev', { timeout: 10000 }).click();
    })
    it('Checking H-Family video 5 title is visible', () => {
        cy.get('.carousel-lg > .carousel-inner > .active > .v-card > .card-body > .card-primary-text', { timeout: 10000 }).invoke('text').then((urlText) => {
       const temp = urlText.toString();
        cy.log(temp)                
        cy.request({
           method: "POST",
           url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
           form: true,
           body: {
            user_key: '93650588458740',
            app_version: '1.3.13'
           }
       })
            .then((response) => {
                
           var jsonData = response.body;
                        expect(jsonData.response.data.widgets).to.have.length(2)
                        var Navbar = jsonData.response.data;
                        expect(Navbar.widgets[0].data.cards[4].data.video_name).to.equal(temp)
              })
           })
       })
       it('Checking H-Family 5th Play btn is visible', () => {
        cy.get('.carousel-lg > .carousel-inner > .active > .v-card > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
    })
    it('Checking H-Family 3rd & 4th Video titles', () => {
        const tem=[];

        for(var i=3;i<5;i++){
        cy.get(':nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            tem.push(temp);
            cy.log(tem)              
             })
             }
             cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets[0].data.cards).to.have.length(5)
                    var Navbar = jsonData.response.data;
                    for(var j=0;j<1;j++){
                        for(var k=2;k<4;k++){
                            for(var r=0;r<2;r++){
                    expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[r])
                    k++;
                }
            }
        }
        })
})*/
it('Checking H-Family first 2 videos titles are visible', () => {
    const tem=[];

    for(var i=1;i<3;i++){
    cy.get('.carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
        const temp = urlText.toString();
        tem.push(temp);
        cy.log(tem)              
         })
         }                
    cy.request({
       method: "POST",
       url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
       form: true,
       body: {
        user_key: '93650588458740',
        app_version: '1.3.13'
       }
   })
        .then((response) => {
            
                        var jsonData = response.body;
                        expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                        var Navbar = jsonData.response.data;
                        for(var j=0;j<1;j++){
                            for(var k=0;k<3;k++){
                                for(var r=0;r<2;r++){
                        expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[r])
                        k++;
                    }
                }
            }
            })
    })
    it('Checking H-Family first 2 Play btns are visible', () => {
        for(var i=1;i<3;i++){
        cy.get('.carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
        }
    })
    /*it('Checking H-Family 3rd & 4th Play btns are visible', () => {
        for(var i=3;i<5;i++){
        cy.get(':nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
        }
    })
    it('Checking Widget Card indicator -H-Family icon nxt is visible', () => {
        cy.get('.carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
    })
    it('Checking H-Family Widgets 5th Card is clickable', () => {
        cy.get('.carousel-item-next > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
        cy.url();
        cy.location('href').then((urlText) => {
           const temp = urlText
           cy.log(temp);
        cy.request({
           method: "POST",
           url: "https://testottapi.ventunotech.com/v3/ott/familytv/5d145529a7c72/211",
           form: true,
           body: {
            user_key: '93650588458740',
            app_version: '1.3.13'
           }
       })
            .then((response) => {
                
           var jsonData = response.body;
                        expect(jsonData.response.data.widgets).to.have.length(2)
                        var Navbar = jsonData.response.data;
                        expect(Navbar.widgets[0].data.cards[4].data.video_url.url).to.equal(temp)
              })
           })
       })*/
    })