describe("Testing Home tab", () => {
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
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
        /*it('Home red highlight',()=>{
            cy.get('.nav-link.true-link.active::after').should('exist')
        })*/
        it('Home red highlight',()=>{
            cy.get(':nth-child(1) > .nav-link')
            .click()
            .should('have.class', 'active')
            })
    it('Checking VideoCarousel is visible', () => {
        cy.get('.active > .carousel-wrpr > :nth-child(2) > :nth-child(1) > .card-img', { timeout: 10000 }).should('exist');
        cy.get('#vc-0 > .carousel-control-prev', { timeout: 10000 }).should('exist');
        cy.get('#vc-0 > .carousel-control-next', { timeout: 10000 }).should('exist');
    })
    it('Checking Carousel Card indicator is visible', () => {
        cy.get('#vc-0 > .carousel-indicators', { timeout: 10000 }).should('exist');
    })
    it('Checking Carousel Card indicator icon nxt & previous are visible', () => {
        cy.get('#vc-0 > .carousel-control-prev > .carousel-control-prev-icon', { timeout: 10000 }).should('exist');
        cy.get('#vc-0 > .carousel-control-next > .carousel-control-next-icon', { timeout: 10000 }).should('exist');
    })
    it('Checking ALSO AVAILABLE ON is visible', () => {
        cy.get('.hybrid-horizontal-listing > .widget-title > h2', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    expect(Navbar.widgets[1].data.title).to.equal(temp)
                })
        })
    })
    it('Checking Card Listing is visible', () => {
        cy.get('.card-listing', { timeout: 10000 }).should('exist');
    })
    it('Checking Android,Youtube & Facebook is visible', () => {
        for(var i=1;i<4;i++){
        cy.get(':nth-child('+i+') > a > .card-img-wrpr > .card-img', { timeout: 10000 }).should('exist');
        }
    })
    it('Validate whether Next indicator is working', () => {
        cy.get('.active > .carousel-wrpr > :nth-child(2) > :nth-child(1) > .card-img', { timeout: 20000 }).should('exist').invoke('attr', 'alt').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.get('#vc-0 > .carousel-control-next', { timeout: 10000 }).click().then(() => {
                if ('#vc-0 > .carousel-control-next' == temp) {
                    cy.log('Next button doesnt work')
                }
                else {
                    cy.log('Next Button works well')
                }
            })
        })
    })
    it('Validate whether Previous indicator is working', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.active > .carousel-wrpr > :nth-child(2) > :nth-child(1) > .card-img', { timeout: 10000 }).should('exist').invoke('attr', 'alt').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.get('#vc-0 > .carousel-control-prev', { timeout: 10000 }).click().then(() => {
                if ('#vc-0 > .carousel-control-prev' == temp) {
                    cy.log('Previous button doesnt work')
                }
                else {
                    cy.log('Previous Button works well')
                }
            })
        })
    })
    it('Validate whether Watch Now - Carousel 1 & 2 are Clickable ', () => {
        const tem=[];
        for(var i=2;i<4;i++){
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(i).click({force:true})
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            tem.push(temp);
        })
       }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widgets[0].data;
                        for(var k=0;k<2;k++){
                    cy.expect(Navbar.cards[k].data.video_url.url).to.equal(tem[k]);
                        }
        })
    })
    it('validate whether Watch Now - Carousel 3 is Clickable', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(6).click({force:true})
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.cards[2].data.video_url.url).to.equal(temp);
                })
        })
    })
     it('validate whether Watch Now - Carousel 4 is Clickable', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(9).click({force:true})
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widgets[0].data;
                    cy.expect(Navbar.cards[3].data.video_url.url).to.equal(temp);
                })
        })
    })
    it('validate whether Buy Now - Carousel 5 is Clickable', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(12).click({force:true})
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
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widget.data;
                    cy.expect(Navbar.links[5].data.link.url).to.equal(temp);
                })
        })
    })
    it('Validation of Android,Youtube,Facebook', () => {
        const tem=[];
        for(var i=0;i<3;i++){
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.v-card.hybrid-list-card.small-card > a').should('have.length', 3).eq(i).click()
            .should('have.attr', 'href')
            .then((url) => {
                const temp = url.toString();
                cy.log(temp);
                tem.push(temp);
        })
       }
                cy.request({
                    method: "POST",
                    url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                    form: true,
                    body: {
                        user_key: '93650588458740',
                        app_version: '1.3.13'

                    }
                })
                    .then((response) => {
                        var jsonData = response.body;
                        var Navbar = jsonData.response.data.widgets[1].data;
                        for(var k=0;k<3;k++){
                        cy.expect(Navbar.cards[k].data.action.primary.url).to.equal(tem[k]);
                        }
            })
    })
    it('Checking Widgets Titles are visible', () => {
        const tem=[];
         for(var i=3;i<6;i++){
         cy.get(':nth-child('+i+') > .widget-title > h2', { timeout: 30000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             tem.push(temp);
         })
        }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=2;j<5;j++){
                         for(var k=0;k<3;k++){
                     expect(Navbar.widgets[j].data.title).to.equal(tem[k])
                     j++;
                         }
                        }
                 })
     })
     it('Checking Widgets Title- Music & Beyond TV is visible', () => {
         cy.get(':nth-child(7) > .widget-title > h2', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp);
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     expect(Navbar.widgets[6].data.title).to.equal(temp)
                 })
         })
     })
     it('Checking Widgets Titles- Motherland TV & Podcast are visible', () => {
        const tem=[];
        for(var i=9;i<11;i++){
         cy.get(':nth-child('+i+') > .widget-title > h2', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             tem.push(temp);
            })
           }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=8;j<10;j++){
                        for(var k=0;k<2;k++){
                     expect(Navbar.widgets[j].data.title).to.equal(tem[k])
                     j++;
                        }
                    }
                 })
         })
     it('Checking Hallyu Widgets Cards size', () => {
        const tem=[];
        for(var i=1;i<3;i++){
         cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
             const temp = urlText.toString();
             tem.push(temp);
            })
           }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=2;j<3;j++){
                        for(var k=0;k<2;k++){
                     expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][150]).to.equal(tem[k])
                        }
                    }
                 })
         })
     it('Checking Hallyu TV - Video titles are visible', () => {
        const tem=[];
        for(var i=1;i<3;i++){
         cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp)
             tem.push(temp);
            })
           }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=2;j<3;j++){
                        for(var k=0;k<2;k++){
                     expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                        }
                    }
        })
    })
     it('Checking Hallyu TV - Video Play btns are visible', () => {
         for(var i=1;i<3;i++){
         cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child(1) > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist');
         }
     })
     it('Checking Hallyu Videos are clickable', () => {
        const tem=[];
            
        for(var i=1;i<3;i++){
        cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top ', { timeout: 10000 }).click({ force: true })
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
                   tem.push(temp);        
                         })
                         }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
                }

            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for(var j=2;j<3;j++){
                        for(var k=0;k<2;k++){
                    cy.expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k]);
                        }
                    }
        })
    })
     it('Checking H-Family firt 2 Widgets Cards size', () => {
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
        const tem=[];
         for(var i=1;i<3;i++){
        cy.get('#vhl-3 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp)
             tem.push(temp);
            })
           }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for(var j=3;j<4;j++){
                        for(var k=0;k<2;k++){
                    expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][150]).to.equal(tem[k])
                        }
                    }
        })
    })
     it('Checking H-Family TV -first 2 Video titles are visible', () => {
        const tem=[];
        for(var i=1;i<3;i++){
         cy.get('#vhl-3 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp);
             tem.push(temp);
            })
           }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=3;j<4;j++){
                        for(var k=0;k<2;k++){
                     expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                        }
                    }
         })
     })
     it('Checking H-Family first 2 videos are clickable', () => {
        const tem=[];
        for(var i=1;i<3;i++){
        cy.get('#vhl-3 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({ force: true })
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            tem.push(temp);
        })
       }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for(var j=3;j<4;j++){
                        for(var k=0;k<2;k++){
                    cy.expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k]);
                        }
                    }
        })
    })
     it('Checking H-Family TV - first 2 Videos  - Play btns are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
         for(var i=1;i<3;i++){
         cy.get('#vhl-3 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist');
         }
     })
     /*it('Checking Widget Card indicator - H-Family icon nxt & previous are visible', () => {
         cy.get(':nth-child(5) > .carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
         cy.get(':nth-child(5) > .carousel-lg > .carousel-control-prev', { timeout: 10000 }).should('exist');
     })
     it('Checking H-Family Widgets Card 5 size', () => {
        cy.get('.carousel-item-next > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    expect(Navbar.widgets[3].data.cards[4].data.video_thumbnails["16x9"][150]).to.equal(temp)
                })
        })
    })
     it('Checking H-Family TV - Video title 5 is visible', () => {
         cy.get(':nth-child(5) > .carousel-lg > .carousel-inner > .active > .v-card > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp);
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     expect(Navbar.widgets[3].data.cards[4].data.video_name).to.equal(temp)
                 })
         })
     })
     it('Checking H-Family Video 5 is clickable', () => {
        cy.get(':nth-child(5) > .carousel-lg > .carousel-inner > .active > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({ force: true })
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widgets[3].data;
                    cy.expect(Navbar.cards[4].data.video_url.url).to.equal(temp);
                })
        })
    })
     it('Checking H-Family TV - Video 5 - Play btn is visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
         cy.get(':nth-child(5) > .carousel-lg > .carousel-inner > .active > .v-card > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist');
     })*/
     it('Checking Japanese Widgets Cards size', () => {
        const tem=[];
        for(var i=1;i<3;i++){
        cy.get('#vhl-4 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            tem.push(temp);
        })
       }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for(var j=4;j<5;j++){
                        for(var k=0;k<2;k++){
                    expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][150]).to.equal(tem[k])
                        }
                    }
        })
    })
     it('Checking Japanese TV - Video titles are visible', () => {
        const tem=[];
        for(var i=1;i<3;i++){
         cy.get('#vhl-4 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp);
             tem.push(temp);
        })
       }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=4;j<5;j++){
                        for(var k=0;k<2;k++){
                     expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                        }
                    }
         })
     })
     it('Checking Japanese Videos are clickable', () => {
        const tem=[];
        for(var i=1;i<3;i++){
        cy.get('#vhl-4 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({ force: true })
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            tem.push(temp);
        })
       }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for(var j=4;j<5;j++){
                        for(var k=0;k<2;k++){
                    cy.expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k]);
                        }
                    }
        })
    })
     it('Checking Japanese TV - Videos - Play btns are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
         for(var i=1;i<3;i++){
         cy.get('#vhl-4 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist');
         }
     })
     it('Checking Container is visible', () => {
         cy.get('#aswift_0', { timeout: 50000 }).should('exist');
         cy.get('#aswift_1', { timeout: 10000 }).should('exist');
     })
     it('Checking Music & Beyond first 4 Widgets Cards size', () => {
        const tem=[];
        for(var i=1;i<5;i++){
        cy.get(':nth-child(7) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            tem.push(temp);
        })
       }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for(var j=6;j<7;j++){
                        for(var k=0;k<4;k++){
                    expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][320]).to.equal(tem[k])
                        }
                    }
        })
    })
     it('Checking Music & Beyond TV - First 4 Video titles are visible', () => {
        const tem=[];
        for(var i=1;i<5;i++){
         cy.get(':nth-child(7) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp);
             tem.push(temp);
        })
       }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=6;j<7;j++){
                        for(var k=0;k<4;k++){
                     expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                        }
                    }
         })
     })
     it('Checking Music & Beyond Widgets first 4 Cards are clickable', () => {
        const tem=[];

        for(var i=1;i<5;i++){
        cy.get(':nth-child(7) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
        cy.url();
        cy.location('href').then((urlText) => {
           const temp = urlText
           cy.log(temp);
       tem.push(temp);        
             })
             }
             cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
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
                    for(var j=6;j<7;j++){
                        for(var k=0;k<4;k++){
                    expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k])
                    }
                }
                })
        })
     it('Checking Music & Beyond TV - Videos - first 4 Play btns are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/') 
         for(var i=1;i<5;i++){
         cy.get(':nth-child(7) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist');
         }
     })
     it('Checking Widget Card indicator - Music & Beyond icon nxt & previous are visible', () => {
         cy.get(':nth-child(7) > .carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
         cy.get(':nth-child(7) > .carousel-lg > .carousel-control-prev', { timeout: 10000 }).should('exist');
     })
     it('Checking Music & Beyond Widgets Card 5 size', () => {
        cy.get('.carousel-item-next > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    expect(Navbar.widgets[6].data.cards[4].data.video_thumbnails["16x9"][320]).to.equal(temp)
                })
        })
    })
     it('Checking Music & Beyond TV - Video title 5 is visible', () => {
         cy.get(':nth-child(7) > .carousel-lg > .carousel-inner > .active > .v-card > .card-body > .card-primary-text', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp);
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     expect(Navbar.widgets[6].data.cards[4].data.video_name).to.equal(temp)
                 })
         })
     })
     it('Checking Music & Beyond Video 5 is clickable', () => {
        cy.get(':nth-child(7) > .carousel-lg > .carousel-inner > .active > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({ force: true })
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widgets[6].data;
                    cy.expect(Navbar.cards[4].data.video_url.url).to.equal(temp);
                })
        })
    })
     it('Checking Music & Beyond TV - Video 5 - Play btn is visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/') 
         cy.get(':nth-child(7) > .carousel-lg > .carousel-inner > .active > .v-card > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist');
     })
     it('Checking Motherland Widgets Cards size', () => {
        const tem=[];
        for(var i=1;i<4;i++){
        cy.get('#vhl-8 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            tem.push(temp);
        })
       }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for(var j=8;j<9;j++){
                        for(var k=0;k<3;k++){
                    expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][150]).to.equal(tem[k])
                        }
                    }
        })
    })
     it('Checking Motherland TV - Video titles are visible', () => {
        const tem=[];
        for(var i=1;i<4;i++){
         cy.get('#vhl-8 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp);
             tem.push(temp);
            })
           }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=8;j<9;j++){
                        for(var k=0;k<3;k++){
                     expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                        }
                    }
         })
     })
     it('Checking Motherland TV - Videos are clickable', () => {
        const tem=[];
        for(var i=1;i<4;i++){
         cy.get('#vhl-8 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({ force: true })
         cy.url()
         cy.location('href').then((urlText) => {
             const temp = urlText
             cy.log(temp);
             tem.push(temp);
            })
           }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=8;j<9;j++){
                        for(var k=0;k<3;k++){
                     expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k])
                        }
                    }
         })
     })
     it('Checking Motherland TV - Videos - Play btns are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/') 
         for(var i=1;i<4;i++){
         cy.get('#vhl-8 > .carousel-inner > .carousel-item > :nth-child(1) > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist');
         }
     })
     it('Checking Podcast Widgets Cards size', () => {
        const tem=[];
        for(var i=1;i<5;i++){
        cy.get('#vhl-9 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            tem.push(temp);
        })
       }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for(var j=9;j<10;j++){
                        for(var k=0;k<4;k++){
                    expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][320]).to.equal(tem[k])
                        }
                    }
        })
    })
    it('Checking Podcast - Video titles are visible', () => {
        const tem=[];
        for(var i=1;i<5;i++){
         cy.get(':nth-child(10) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
             const temp = urlText.toString();
             cy.log(temp);
             tem.push(temp);
        })
       }
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                 form: true,
                 body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'
 
                 }
             })
                 .then((response) => {
                     var jsonData = response.body;
                     var Navbar = jsonData.response.data;
                     for(var j=9;j<10;j++){
                        for(var k=0;k<4;k++){
                     expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                        }
                    }
         })
     })
     it('Checking Podcast Videos are clickable', () => {  
         const tem=[];

        for(var i=1;i<5;i++){
        cy.get(':nth-child(10) > .carousel-lg > .carousel-inner > .active > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({ force: true })
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);tem.push(temp);
        })
       }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for(var j=9;j<10;j++){
                        for(var k=0;k<4;k++){
                    cy.expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k]);
                        }
                    }
        })
    })
     it('Checking Podcast - Videos - Play btns are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/') 
         for(var i=1;i<5;i++){
         cy.get('#vhl-9 > .carousel-inner > .carousel-item > :nth-child(1) > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist');
         }
     })
    it('Checking Widget Card indicator - Podcast icon nxt & previous are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get(':nth-child(10) > .carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
        cy.get(':nth-child(10) > .carousel-lg > .carousel-control-prev', { timeout: 10000 }).should('exist');
    })
    it('Checking Podcast Widgets Card 5 size', () => {
        cy.get('.carousel-item-next > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    expect(Navbar.widgets[9].data.cards[4].data.video_thumbnails["16x9"][150]).to.equal(temp)
                })
        })
    })
    it('Checking Podcast - Video title 5 is visible', () => {
        cy.get(':nth-child(10) > .carousel-lg > .carousel-inner > .active > .v-card > .card-body > .card-primary-text > .video-name > a', { timeout: 20000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    expect(Navbar.widgets[9].data.cards[4].data.video_name).to.equal(temp)
                })
        })
    })
    it('Checking Podcast Video 5 is clickable', () => {
        cy.get(':nth-child(10) > .carousel-lg > .carousel-inner > .active > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({ force: true })
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/home/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.13'

                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data.widgets[9].data;
                    cy.expect(Navbar.cards[4].data.video_url.url).to.equal(temp);
                })
        })
    })
    it('Checking Podcast - Video 5 - Play btn is visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/') 
        cy.get(':nth-child(10) > .carousel-lg > .carousel-inner > .active > .v-card > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist');
    })
    it('Checking all Cards are visible', () => {
        cy.get('.carousel-lg > .carousel-inner > .active > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).should('exist');
    })
   /*//H-Family
    it('Checking Widget Card indicator - H-Family icon nxt & previous are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get(':nth-child(5) > .carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
        cy.get(':nth-child(5) > .carousel-lg > .carousel-control-prev', { timeout: 10000 }).should('exist');
    })
    it('Checking H-Family next card is visible', () => {
        cy.get(':nth-child(5) > .carousel-lg > .carousel-inner > .carousel-item-next > .v-card > .card-body', { timeout: 20000 }).should('exist');
    })*/
    //Music & Beyond
    it('Checking Widget Card indicator - Music & Beyond icon nxt & previous are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get(':nth-child(7) > .carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
        cy.get(':nth-child(7) > .carousel-lg > .carousel-control-prev', { timeout: 10000 }).should('exist');
    })
    it('Checking Music & Beyond next Card is visible', () => {
        cy.get('.carousel-item-next > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).should('exist');
    })
    it('Checking Podcast 4 Cards are visible', () => {
        cy.get(':nth-child(10) > .carousel-lg > .carousel-inner > .active > > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).should('exist');
    })
    /*it('Checking all Cards have innerline', () => {
        cy.get('#vtn-iconmenu-container').should('not.be.visible')
            cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child(1) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).trigger('mouseover',{force: true});
            cy.get('#vtn-iconmenu-container').should('be.visible').wait(1000)
            cy.get('#vhl-2 > .carousel-inner > .carousel-item > :nth-child(1) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).trigger('mouseout',{force: true});
            cy.get('#vtn-iconmenu-container').should('not.be.visible')
    })*/
    it('Checking Watch Now - Carousel 1 & 2 are visible', () => {
        for(var i=2;i<4;i++){
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(i).invoke('attr','title').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
    }
    for(var j=2;j<4;j++){
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(i).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp); 
    })
    }
    })
    it('Checking Watch Now - Carousel 3 is visible', () => {
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(6).invoke('attr','title').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(6).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
    })
    it('Checking Watch Now - Carousel 4 is visible', () => {
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(9).invoke('attr','title').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(9).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
    })
    it('Checking Buy Now - Carousel 5 is visible', () => {
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(12).invoke('attr','title').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
        cy.get('.btn.btn-lg.vt-btn.vt-btn-primary').should('have.length',21 ).eq(12).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
        })
    })
})