describe("Testing JK tab", () => {
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
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
    it('Checking JKTv link is clickable', () => {
        cy.get(':nth-child(2) > .nav-link', { timeout: 10000 }).click()
        cy.url()
    })
    it('Checking Hallyu widget title is visible', () => {
         cy.get('.site-body > :nth-child(1) > .widget-title > h2', { timeout: 10000 }).invoke('text').then((urlText) => {
        const temp = urlText.toString();
         cy.log(temp)                
         cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93650588458740',
                app_version: '1.3.12'
            }
        })
             .then((response) => {
                 
            var jsonData = response.body;
                         expect(jsonData.response.data.widgets).to.have.length(3)
                         var Navbar = jsonData.response.data;
                         expect(Navbar.widgets[0].data.title).to.equal(temp)
               })
            })
        })
        it('Checking Music & Beyond , Japanese TV widges titles are visible', () => {
        const tem=[];

        for(var i=2;i<4;i++){
         cy.get(':nth-child('+i+') > .widget-title > h2', { timeout: 10000 }).invoke('text').then((urlText) => {
        const temp = urlText.toString();
        tem.push(temp);
        cy.log(tem)
                         
         })
         }
         cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93650588458740',
                app_version: '1.3.12'
            }
        })
             .then((response) => {
                 
            var jsonData = response.body;
                         expect(jsonData.response.data.widgets).to.have.length(3)
                         var Navbar = jsonData.response.data;
                         for(var j=1;j<3;j++){
                             for(var k=0;k<2;k++){
                                 expect(Navbar.widgets[j].data.title).to.equal(tem[k])
                                 j++;
               }}
              })
    })
    it('Checking Hallyu Widgets Cards size', () => {
        const tem=[];

        for(var i=1;i<3;i++){
        cy.get('#vhl-0 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
            const temp = urlText.toString();
            tem.push(temp);
            cy.log(tem)              
             })
             }
             cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
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
        it('Checking Hallyu Widgets Cards are clickable', () => {
            const tem=[];
    
            for(var i=1;i<3;i++){
            cy.get('#vhl-0 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                 cy.url();
                 cy.location('href').then((urlText) => {
                    const temp = urlText
                    cy.log(temp);
                tem.push(temp);
                cy.log(tem)              
                 })
                 }
                 cy.request({
                    method: "POST",
                    url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '93650588458740',
                        app_version: '1.3.12'
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
        it('Checking Hallyu Video titles', () => {
        cy.visit('https://testhtvfun.ventunotech.com/jk_tv')
            const tem=[];
    
            for(var i=1;i<3;i++){
            cy.get('#vhl-0 > .carousel-inner > .carousel-item > :nth-child('+i+') >.card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
                const temp = urlText.toString();
                tem.push(temp);
                cy.log(tem)              
                 })
                 }
                 cy.request({
                    method: "POST",
                    url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '93650588458740',
                        app_version: '1.3.12'
                    }
                })
                    .then((response) => {
                        var jsonData = response.body;
                        expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                        var Navbar = jsonData.response.data;
                        for(var j=0;j<1;j++){
                            for(var k=0;k<2;k++){
                        expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                        }
                    }
                    })
            })
            it('Checking Hallyu Play btns are visible', () => {
                for(var i=1;i<3;i++){
                cy.get('#vhl-0 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
                }
            })
            it('Checking Music & Beyond Widgets first 2 Cards size', () => {
                const tem=[];
        
                for(var i=1;i<3;i++){
                cy.get(':nth-child(2) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
                    const temp = urlText.toString();
                    tem.push(temp);
                    cy.log(tem)              
                     })
                     }
                     cy.request({
                        method: "POST",
                        url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                        form: true,
                        body: {
                            user_key: '93650588458740',
                            app_version: '1.3.12'
                        }
                    })
                        .then((response) => {
                            var jsonData = response.body;
                            expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                            var Navbar = jsonData.response.data;
                            for(var j=1;j<2;j++){
                                for(var k=0;k<2;k++){
                            expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][320]).to.equal(tem[k])
                            }
                        }
                        })
                })
                it('Checking Music & Beyond Widgets first 2 Cards are clickable', () => {
                    const tem=[];
            
                    for(var i=1;i<3;i++){
                    cy.get(':nth-child(2) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                    cy.url();
                    cy.location('href').then((urlText) => {
                       const temp = urlText
                       cy.log(temp);
                   tem.push(temp);        
                         })
                         }
                         cy.request({
                            method: "POST",
                            url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                            form: true,
                            body: {
                                user_key: '93650588458740',
                                app_version: '1.3.12'
                            }
                        })
                            .then((response) => {
                                var jsonData = response.body;
                                expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                                var Navbar = jsonData.response.data;
                                for(var j=1;j<2;j++){
                                    for(var k=0;k<2;k++){
                                expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k])
                                }
                            }
                            })
                    })
                it('Checking Music & Beyond Widgets 3rd and 4th Cards size', () => {
                 cy.visit('https://testhtvfun.ventunotech.com/jk_tv')
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
                            url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                            form: true,
                            body: {
                                user_key: '93650588458740',
                                app_version: '1.3.12'
                            }
                        })
                            .then((response) => {
                                var jsonData = response.body;
                                expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                                var Navbar = jsonData.response.data;
                                for(var j=1;j<2;j++){
                                    for(var k=2;k<=3;k++){
                                        for(var r=0;r<2;r++){
                                expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][320]).to.equal(tem[r])
                                k++;
                                    }
                                }
                            }
                            })
                    })
                    it('Checking Music & Beyond Widgets 3rd and 4th Cards are clickable', () => {
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
                                   url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                                   form: true,
                                   body: {
                                    user_key: '93650588458740',
                                    app_version: '1.3.12'
                                   }
                               })
                                   .then((response) => {
                                       var jsonData = response.body;
                                       expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                                       var Navbar = jsonData.response.data;
                                       for(var j=1;j<2;j++){
                                           for(var k=2;k<=3;k++){
                                               for(var r=0;r<2;r++){
                                       expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[r])
                                       k++;
                                           }
                                       }
                                   }
                                   })
                           })
                    it('Checking Widget Card indicator -Music & Beyond icon nxt is visible', () => {
                        cy.visit('https://testhtvfun.ventunotech.com/jk_tv')
                        cy.get('.carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
                    })
                    it('Checking Music & Beyond Widgets 5th Card size', () => {
                        cy.get('.carousel-item-next > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
                       const temp = urlText.toString();
                        cy.log(temp)                
                        cy.request({
                           method: "POST",
                           url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                           form: true,
                           body: {
                            user_key: '93650588458740',
                            app_version: '1.3.12'
                           }
                       })
                            .then((response) => {
                                
                           var jsonData = response.body;
                                        expect(jsonData.response.data.widgets).to.have.length(3)
                                        var Navbar = jsonData.response.data;
                                        expect(Navbar.widgets[1].data.cards[4].data.video_thumbnails["16x9"][320]).to.equal(temp)
                              })
                           })
                       })
                       it('Checking Widget Card indicator -Music & Beyond icon previous is visible', () => {
                        cy.get('.carousel-lg > .carousel-control-prev', { timeout: 10000 }).click();
                    })
                    it('Checking Music & Beyond video 5 title is visible', () => {
                        cy.get(':nth-child(2) > .carousel-lg > .carousel-inner > .active > .v-card > .card-body > .card-primary-text', { timeout: 10000 }).invoke('text').then((urlText) => {
                       const temp = urlText.toString();
                        cy.log(temp)                
                        cy.request({
                           method: "POST",
                           url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                           form: true,
                           body: {
                            user_key: '93650588458740',
                            app_version: '1.3.12'
                           }
                       })
                            .then((response) => {
                                
                           var jsonData = response.body;
                                        expect(jsonData.response.data.widgets).to.have.length(3)
                                        var Navbar = jsonData.response.data;
                                        expect(Navbar.widgets[1].data.cards[4].data.video_name).to.equal(temp)
                              })
                           })
                       })
                       it('Checking Music & Beyond 5th Play btn is visible', () => {
                        cy.get(':nth-child(2) > .carousel-lg > .carousel-inner > .active > .v-card > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
                    })
                    it('Checking Music & Beyond 3rd & 4th Video titles', () => {
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
                                url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                                form: true,
                                body: {
                                    user_key: '93650588458740',
                                    app_version: '1.3.12'
                                }
                            })
                                .then((response) => {
                                    var jsonData = response.body;
                                    expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                                    var Navbar = jsonData.response.data;
                                    for(var j=1;j<2;j++){
                                        for(var k=2;k<4;k++){
                                            for(var r=0;r<2;r++){
                                    expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[r])
                                    k++;
                                }
                            }
                        }
                        })
                })
                it('Checking Music & Beyond first 2 videos titles are visible', () => {
                    const tem=[];

                    for(var i=1;i<3;i++){
                    cy.get(':nth-child(2) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
                        const temp = urlText.toString();
                        tem.push(temp);
                        cy.log(tem)              
                         })
                         }                
                    cy.request({
                       method: "POST",
                       url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                       form: true,
                       body: {
                        user_key: '93650588458740',
                        app_version: '1.3.12'
                       }
                   })
                        .then((response) => {
                            
                                        var jsonData = response.body;
                                        expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                                        var Navbar = jsonData.response.data;
                                        for(var j=1;j<2;j++){
                                            for(var k=0;k<3;k++){
                                                for(var r=0;r<2;r++){
                                        expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[r])
                                        k++;
                                    }
                                }
                            }
                            })
                    })
                    it('Checking Music & Beyond first 2 Play btns are visible', () => {
                        for(var i=1;i<3;i++){
                        cy.get(':nth-child(2) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
                        }
                    })
                    it('Checking Music & Beyond 3rd & 4th Play btns are visible', () => {
                        for(var i=3;i<5;i++){
                        cy.get(':nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
                        }
                    })
                    it('Checking Widget Card indicator -Music & Beyond icon nxt is visible', () => {
                        cy.get('.carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
                    })
                    it('Checking Music & Beyond Widgets 5th Card is clickable', () => {
                        cy.get('.carousel-item-next > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                        cy.url();
                        cy.location('href').then((urlText) => {
                           const temp = urlText
                           cy.log(temp);
                        cy.request({
                           method: "POST",
                           url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                           form: true,
                           body: {
                            user_key: '93650588458740',
                            app_version: '1.3.12'
                           }
                       })
                            .then((response) => {
                                
                           var jsonData = response.body;
                                        expect(jsonData.response.data.widgets).to.have.length(3)
                                        var Navbar = jsonData.response.data;
                                        expect(Navbar.widgets[1].data.cards[4].data.video_url.url).to.equal(temp)
                              })
                           })
                       })
                    it('Checking Japanese Widgets Cards size', () => {
                        cy.visit('https://testhtvfun.ventunotech.com/jk_tv')
                        const tem=[];
                
                        for(var i=1;i<3;i++){
                        cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
                            const temp = urlText.toString();
                            tem.push(temp);
                            cy.log(tem)              
                             })
                             }
                             cy.request({
                                method: "POST",
                                url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                                form: true,
                                body: {
                                    user_key: '93650588458740',
                                    app_version: '1.3.12'
                                }
                            })
                                .then((response) => {
                                    var jsonData = response.body;
                                    expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                                    var Navbar = jsonData.response.data;
                                    for(var j=2;j<3;j++){
                                        for(var k=0;k<2;k++){
                                    expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][150]).to.equal(tem[k])
                                    }
                                }
                                })
                        })
                        it('Checking Japanese Widgets Cards are clickable', () => {
                            const tem=[];
                    
                            for(var i=1;i<3;i++){
                            cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                            cy.url();
                            cy.location('href').then((urlText) => {
                               const temp = urlText
                               cy.log(temp);
                           tem.push(temp);        
                                 })
                                 }
                                 cy.request({
                                    method: "POST",
                                    url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                                    form: true,
                                    body: {
                                        user_key: '93650588458740',
                                        app_version: '1.3.12'
                                    }
                                })
                                    .then((response) => {
                                        var jsonData = response.body;
                                        expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                                        var Navbar = jsonData.response.data;
                                        for(var j=2;j<3;j++){
                                            for(var k=0;k<2;k++){
                                        expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k])
                                        }
                                    }
                                    })
                            })
                    it('Checking Japanese Video titles', () => {
                        cy.visit('https://testhtvfun.ventunotech.com/jk_tv')
                        const tem=[];
                
                        for(var i=1;i<3;i++){
                        cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            tem.push(temp);
                            cy.log(tem)              
                             })
                             }
                             cy.request({
                                method: "POST",
                                url: "https://testottapi.ventunotech.com/v3/ott/jktv/5d145529a7c72/211",
                                form: true,
                                body: {
                                    user_key: '93650588458740',
                                    app_version: '1.3.12'
                                }
                            })
                                .then((response) => {
                                    var jsonData = response.body;
                                    expect(jsonData.response.data.widgets[0].data.cards).to.have.length(2)
                                    var Navbar = jsonData.response.data;
                                    for(var j=2;j<3;j++){
                                        for(var k=0;k<2;k++){
                                    expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                                    }
                                }
                                })
                        })
                        it('Checking Japanese Play btns are visible', () => {
                            for(var i=1;i<3;i++){
                            cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
                            }
                        })
                        })    