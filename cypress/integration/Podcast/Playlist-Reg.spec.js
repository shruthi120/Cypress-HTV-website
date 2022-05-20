describe("Testing Podcast tab", () => {
    let Token = " ";
    let Hash=" ";
    let code =" ";
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v1/ott/videoListing/5d145529a7c72/211",
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
    it('Hashcode ', () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v1/ott/loginPage/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93629304115088',
                url: 'https://testhtvfun.ventunotech.com/profile',
                app_version: '1.3.13'
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
                app_version: '1.3.13'
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
    //Login into a specific user
    it('Verification of Login link', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.navbar-text > .btn', { timeout: 10000 }).click()
        cy.url()
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
    it('Checking Podcast link is clickable', () => {
        //cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
        cy.get(':nth-child(5) > .nav-link', { timeout: 10000 }).click({force:true})
        cy.url()
        .wait(1000)
    })
    it('Checking Podcast Widget Card 1 is clickable', () => {
        cy.get(':nth-child(2) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
             cy.url();
    })
             it('Checking Podcast Video 1 - Player  is clickable', () => {
                cy.get('.vtn-ply-view-hit', { timeout: 30000 }).should('exist')
                //Video Title
                cy.get('.heading').should('exist').invoke('text').then((urlText) => {
                    const temp = urlText.toString();
                    cy.log(temp);
                     cy.request({
                         method: "POST",
                         url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                         form: true,
                         body: {
                            user_key:'  95077574069748',
                            token:Token,
                            user_id: '95480',
                             url:'https://testhtvfun.ventunotech.com/watch/podcast/park-taemin-gunaa-cmon-i-will-hug-you',
                             app_version: '1.3.13'
             
                         }
                     })
                         .then((response) => {
                             var jsonData = response.body;
                             var Navbar = jsonData.response.data;
                             expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                         })
                })
                //Video Description
                cy.get('.video-description').should('exist').invoke('text').then((urlText) => {
                    const temp = urlText.toString();
                    cy.log(temp);
                    cy.request({
                        method: "POST",
                        url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                        form: true,
                        body: {
                            user_key:' 95077574069748',
                    token:Token,
                    user_id: '95480',
                            url:'https://testhtvfun.ventunotech.com/watch/podcast/park-taemin-gunaa-cmon-i-will-hug-you',
                            app_version: '1.3.13'
            
                        }
                    })
                        .then((response) => {
                            var jsonData = response.body;
                            var Navbar = jsonData.response.data;
                            var desc = Navbar.widgets[0].data.video.data.video_description;
                            console.log(desc)
                            desc = desc.replace("\r<br>",'\n');
                            var desc1 = console.log(desc)
                            const desc2 = desc.toString();
                            expect(desc2).to.equal(temp)
                        })
                })
                //Video name
                cy.get('.vtn-title-wrp > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-title').should('exist').invoke('text').then((urlText) => {
                    const temp = urlText.toString();
                    cy.log(temp);
                    cy.request({
                        method: "POST",
                        url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                        form: true,
                        body: {
                            user_key:' 95077574069748',
                    token:Token,
                    user_id: '95480',
                            url:'https://testhtvfun.ventunotech.com/watch/podcast/park-taemin-gunaa-cmon-i-will-hug-you',
                            app_version: '1.3.13'
            
                        }
                    })
                        .then((response) => {
                            var jsonData = response.body;
                            var Navbar = jsonData.response.data;
                            expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                        })
                })
                //Video views
                cy.get(' .vtn-info-title-div > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-views').should('exist').invoke('text').then((urlText) => {
                    const temp = urlText.toString();
                    cy.log(temp);
                })
                //Video info
                cy.get('.vtn-icon-box-active').should('exist').click()
                cy.get('.vtn-popup-close-btn').should('exist').click()
                //Video Progress
                cy.get('.vtn-webplyr-progress-bar-load').should('exist')
                //Play or Pause Button
                cy.get('.vtn-webplyr-bar-button-play').should('exist').click()
                //Video Length
                cy.get('.vtn-webplyr-bar-time-area').should('exist').invoke('text').then((urlText) => {
                    const temp = urlText.toString();
                    cy.log(temp);
                 })
                 //Speaker
                 cy.get(' .vtn-webplyr-bar-volume-area > .vtn-webplyr-bar-button').should('exist')
                //FullScreen
                  cy.get('.vtn-webplyr-bar-button-fulllscreen').should('exist').click()
             })
             it('Checking Podcast Video 1 - Other Episodes', () => {
                cy.get('.col-3', { timeout: 10000 }).should('exist')
                const tem=[];
                for(var i=1;i<5;i++){
                    cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                    for(var j=0;j<4;j++){
                        cy.get('.video-inline-name').should('have.length', 4).eq(j).invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp);
                            tem.push(temp);
                        cy.log(tem) 
                        })
                    }
                }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                form: true,
                body: {
                    user_key:' 95077574069748',
                    token:Token,
                    user_id: '95480',
                    url:'https://testhtvfun.ventunotech.com/watch/podcast/park-taemin-gunaa-cmon-i-will-hug-you',
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for (var r=0;r<4;r++){
                    expect(Navbar.widgets[0].data.related.data.cards[r].data.video_name).to.equal(tem[r])
                    }
                })
            })
            it('Checking Podcast Widget Card 2 is clickable', () => {
                cy.get('.app-logo').click()
                            .wait(1000)
                            cy.get(':nth-child(5) > .nav-link', { timeout: 10000 }).click()
                        cy.url()
                        .wait(3000)
                //cy.visit('https://testhtvfun.ventunotech.com/show/podcast')
                cy.get(':nth-child(3) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                     cy.url();
            })
                     it('Checking Podcast Video 2 - Player  is clickable', () => {
                        cy.get('.vtn-ply-view-hit', { timeout: 10000 }).should('exist')
                        //Video Title
                        cy.get('.heading').should('exist').invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp);
                        })
                        //Video Description
                        cy.get('.video-description').should('exist').invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp);
                            cy.request({
                                method: "POST",
                                url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                        form: true,
                        body: {
                            user_key:' 95077574069748',
                    token:Token,
                    user_id: '95480',
                            url:'https://testhtvfun.ventunotech.com/watch/podcast/ya-no-hay-amor--1',
                                    app_version: '1.3.13'
                
                                }
                            })
                                .then((response) => {
                                    var jsonData = response.body;
                                var Navbar = jsonData.response.data;
                                var desc = Navbar.widgets[0].data.video.data.video_description;
                                console.log(desc)
                                desc = desc.replace("<br>",'');
                                var desc1 = console.log(desc)
                                const desc2 = desc.toString();
                                expect(desc2).to.equal(temp)
                                })
                        })
                        //Video name
                        cy.get('.vtn-title-wrp > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-title').should('exist').invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp);
                            cy.request({
                                method: "POST",
                                url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                form: true,
                                body: {
                                    user_key:' 95077574069748',
                    token:Token,
                    user_id: '95480',
                                    url:'https://testhtvfun.ventunotech.com/watch/podcast/ya-no-hay-amor--1',
                                    app_version: '1.3.13'
                    
                                }
                            })
                                .then((response) => {
                                    var jsonData = response.body;
                                    var Navbar = jsonData.response.data;
                                    expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                                })
                        })
                        //Video views
                        cy.get(' .vtn-info-title-div > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-views').should('exist').invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp);
                        })
                        //Video info
                        cy.get('.vtn-icon-box-active').should('exist').click()
                        cy.get('.vtn-popup-close-btn').should('exist').click()
                        //Video Progress
                        cy.get('.vtn-webplyr-progress-bar-load').should('exist')
                        //Play or Pause Button
                        cy.get('.vtn-webplyr-bar-button-play').should('exist').click()
                        //Video Length
                        cy.get('.vtn-webplyr-bar-time-area').should('exist').invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp);
                         })
                         //Speaker
                         cy.get(' .vtn-webplyr-bar-volume-area > .vtn-webplyr-bar-button').should('exist')
                        //FullScreen
                          cy.get('.vtn-webplyr-bar-button-fulllscreen').should('exist').click()
                     })
                     it('Checking Podcast Video 2 - Other Episodes', () => {
                        cy.get('.col-3', { timeout: 10000 }).should('exist')
                        const tem=[];
                        for(var i=1;i<5;i++){
                            cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                            for(var j=0;j<4;j++){
                                cy.get('.video-inline-name').should('have.length', 4).eq(j).invoke('text').then((urlText) => {
                                    const temp = urlText.toString();
                                    cy.log(temp);
                                    tem.push(temp);
                                cy.log(tem) 
                                })
                            }
                        }
                    cy.request({
                        method: "POST",
                        url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                form: true,
                                body: {
                                    user_key:' 95077574069748',
                    token:Token,
                    user_id: '95480',
                                    url:'https://testhtvfun.ventunotech.com/watch/podcast/ya-no-hay-amor--1',
                            app_version: '1.3.13'
                        }
                    })
                        .then((response) => {
                            var jsonData = response.body;
                            var Navbar = jsonData.response.data;
                            for (var r=0;r<4;r++){
                            expect(Navbar.widgets[0].data.related.data.cards[r].data.video_name).to.equal(tem[r])
                            }
                        })
                    })
                    it('Checking Podcast Widget Card 3 is clickable', () => {
                        cy.get('.app-logo').click()
                            .wait(1000)
                            cy.get(':nth-child(5) > .nav-link', { timeout: 10000 }).click()
                        cy.url()
                        .wait(3000)
                        //cy.visit('https://testhtvfun.ventunotech.com/show/podcast')
                        cy.get(':nth-child(4) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                             cy.url();
                    })
                             it('Checking Podcast Video 3 - Player  is clickable', () => {
                                cy.get('.vtn-ply-view-hit', { timeout: 10000 }).should('exist')
                                //Video Title
                                cy.get('.heading').should('exist').invoke('text').then((urlText) => {
                                    const temp = urlText.toString();
                                    cy.log(temp);
                                    cy.request({
                                         method: "POST",
                                         url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                         form: true,
                                         body: {
                                            user_key:'  95077574069748',
                                            token:Token,
                                            user_id: '95480',
                                             url:'https://testhtvfun.ventunotech.com/watch/podcast/ya-no-hay-amor',
                                             app_version: '1.3.13'
                             
                                         }
                                     })
                                         .then((response) => {
                                             var jsonData = response.body;
                                             var Navbar = jsonData.response.data;
                                             expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                                         })
                                })
                                //Video Description
                                cy.get('.video-description').should('exist').invoke('text').then((urlText) => {
                                    const temp = urlText.toString();
                                    cy.log(temp);
                                    cy.request({
                                        method: "POST",
                                        url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                        form: true,
                                        body: {
                                            user_key:'  95077574069748',
                    token:Token,
                    user_id: '95480',
                                            url:'https://testhtvfun.ventunotech.com/watch/podcast/ya-no-hay-amor',
                                            app_version: '1.3.13'
                            
                                        }
                                    })
                                        .then((response) => {
                                            var jsonData = response.body;
                                      var Navbar = jsonData.response.data;
                                      var desc = Navbar.widgets[0].data.video.data.video_description;
                                      console.log(desc)
                                      desc = desc.replace("\r<br>\r<br>",'\n\n');
                                      var desc1 = console.log(desc)
                                      const desc2 = desc.toString();
                                      expect(desc2).to.equal(temp)
                                        })
                                })
                                //Video name
                                cy.get('.vtn-title-wrp > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-title').should('exist').invoke('text').then((urlText) => {
                                    const temp = urlText.toString();
                                    cy.log(temp);
                                    cy.request({
                                        method: "POST",
                                        url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                         form: true,
                                         body: {
                                            user_key:' 95077574069748',
                                            token:Token,
                                            user_id: '95480',
                                            url:'https://testhtvfun.ventunotech.com/watch/podcast/ya-no-hay-amor',
                                            app_version: '1.3.13'
                            
                                        }
                                    })
                                        .then((response) => {
                                            var jsonData = response.body;
                                            var Navbar = jsonData.response.data;
                                            expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                                        })
                                })
                                //Video views
                                cy.get(' .vtn-info-title-div > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-views').should('exist').invoke('text').then((urlText) => {
                                    const temp = urlText.toString();
                                    cy.log(temp);
                                })
                                //Video info
                                cy.get('.vtn-icon-box-active').should('exist').click()
                                cy.get('.vtn-popup-close-btn').should('exist').click()
                                //Video Progress
                                cy.get('.vtn-webplyr-progress-bar-load').should('exist')
                                //Play or Pause Button
                                cy.get('.vtn-webplyr-bar-button-play').should('exist').click()
                                //Video Length
                                cy.get('.vtn-webplyr-bar-time-area').should('exist').invoke('text').then((urlText) => {
                                    const temp = urlText.toString();
                                    cy.log(temp);
                                 })
                                 //Speaker
                                 cy.get(' .vtn-webplyr-bar-volume-area > .vtn-webplyr-bar-button').should('exist')
                                //FullScreen
                                  cy.get('.vtn-webplyr-bar-button-fulllscreen').should('exist').click()
                             })
                             it('Checking Podcast Video 3 - Other Episodes', () => {
                                cy.get('.col-3', { timeout: 10000 }).should('exist')
                                const tem=[];
                                for(var i=1;i<5;i++){
                                    cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                                    for(var j=0;j<4;j++){
                                        cy.get('.video-inline-name').should('have.length', 4).eq(j).invoke('text').then((urlText) => {
                                            const temp = urlText.toString();
                                            cy.log(temp);
                                            tem.push(temp);
                                        cy.log(tem) 
                                        })
                                    }
                                }
                            cy.request({
                                method: "POST",
                                url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                         form: true,
                                         body: {
                                            user_key:' 95077574069748',
                                            token:Token,
                                            user_id: '95480',
                                            url:'https://testhtvfun.ventunotech.com/watch/podcast/ya-no-hay-amor',
                                    app_version: '1.3.13'
                                }
                            })
                                .then((response) => {
                                    var jsonData = response.body;
                                    var Navbar = jsonData.response.data;
                                    for (var r=0;r<4;r++){
                                    expect(Navbar.widgets[0].data.related.data.cards[r].data.video_name).to.equal(tem[r])
                                    }
                                })
                            })
                            it('Checking Podcast Widget Card 4 is clickable', () => {
                                cy.get('.app-logo').click()
                            .wait(1000)
                            cy.get(':nth-child(5) > .nav-link', { timeout: 10000 }).click()
                        cy.url()
                        .wait(1000)
                                //cy.visit('https://testhtvfun.ventunotech.com/show/podcast')
                                cy.get(':nth-child(5) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                                     cy.url();
                            })
                                     it('Checking Podcast Video 4 - Player  is clickable', () => {
                                        cy.get('.vtn-ply-view-hit', { timeout: 10000 }).should('exist')
                                        //Video Title
                                        cy.get('.heading').should('exist').invoke('text').then((urlText) => {
                                            const temp = urlText.toString();
                                            cy.log(temp);
                                             cy.request({
                                                 method: "POST",
                                                 url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                                 form: true,
                                                 body: {
                                                    user_key:'  95077574069748',
                                                    token:Token,
                                                    user_id: '95480',
                                                     url:'https://testhtvfun.ventunotech.com/watch/podcast/cero-bulto-no-paquete',
                                                     app_version: '1.3.13'
                                    
                                                 }
                                             })
                                                 .then((response) => {
                                                     var jsonData = response.body;
                                                     var Navbar = jsonData.response.data;
                                                     expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                                                 })
                                        })
                                        //Video Description
                                        cy.get('.video-description').should('exist').invoke('text').then((urlText) => {
                                            const temp = urlText.toString();
                                            cy.log(temp);
                                            cy.request({
                                                method: "POST",
                                                url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                                form: true,
                                                body: {
                                                    user_key:'  95077574069748',
                    token:Token,
                    user_id: '95480',
                                                    url:'https://testhtvfun.ventunotech.com/watch/podcast/cero-bulto-no-paquete',
                                                    app_version: '1.3.13'
                                   
                                                }
                                            })
                                                .then((response) => {
                                                    var jsonData = response.body;
                                              var Navbar = jsonData.response.data;
                                              var desc = Navbar.widgets[0].data.video.data.video_description;
                                              console.log(desc)
                                              desc = desc.replace("\r<br>",'\n');
                                              var desc1 = console.log(desc)
                                              const desc2 = desc.toString();
                                              expect(desc2).to.equal(temp)
                                                })
                                        })
                                        //Video name
                                        cy.get('.vtn-title-wrp > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-title').should('exist').invoke('text').then((urlText) => {
                                            const temp = urlText.toString();
                                            cy.log(temp);
                                            cy.request({
                                                method: "POST",
                                                url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                                 form: true,
                                                 body: {
                                                    user_key:'  95077574069748',
                    token:Token,
                    user_id: '95480',
                                                    url:'https://testhtvfun.ventunotech.com/watch/podcast/cero-bulto-no-paquete',
                                                    app_version: '1.3.13'
                                   
                                                }
                                            })
                                                .then((response) => {
                                                    var jsonData = response.body;
                                                    var Navbar = jsonData.response.data;
                                                    expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                                                })
                                        })
                                        //Video views
                                        cy.get(' .vtn-info-title-div > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-views').should('exist').invoke('text').then((urlText) => {
                                            const temp = urlText.toString();
                                            cy.log(temp);
                                        })
                                        //Video info
                                        cy.get('.vtn-icon-box-active').should('exist').click()
                                        cy.get('.vtn-popup-close-btn').should('exist').click()
                                        //Video Progress
                                        cy.get('.vtn-webplyr-progress-bar-load').should('exist')
                                        //Play or Pause Button
                                        cy.get('.vtn-webplyr-bar-button-play').should('exist').click()
                                        //Video Length
                                        cy.get('.vtn-webplyr-bar-time-area').should('exist').invoke('text').then((urlText) => {
                                            const temp = urlText.toString();
                                            cy.log(temp);
                                         })
                                         //Speaker
                                         cy.get(' .vtn-webplyr-bar-volume-area > .vtn-webplyr-bar-button').should('exist')
                                        //FullScreen
                                          cy.get('.vtn-webplyr-bar-button-fulllscreen').should('exist').click()
                                     })
                                     it('Checking Podcast Video 4 - Other Episodes', () => {
                                        cy.get('.col-3', { timeout: 10000 }).should('exist')
                                        const tem=[];
                                        for(var i=1;i<5;i++){
                                            cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                                            for(var j=0;j<4;j++){
                                                cy.get('.video-inline-name').should('have.length', 4).eq(j).invoke('text').then((urlText) => {
                                                    const temp = urlText.toString();
                                                    cy.log(temp);
                                                    tem.push(temp);
                                                cy.log(tem) 
                                                })
                                            }
                                        }
                                    cy.request({
                                        method: "POST",
                                        url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                                 form: true,
                                                 body: {
                                                    user_key:'  95077574069748',
                    token:Token,
                    user_id: '95480',
                                                    url:'https://testhtvfun.ventunotech.com/watch/podcast/cero-bulto-no-paquete',
                                            app_version: '1.3.13'
                                        }
                                    })
                                        .then((response) => {
                                            var jsonData = response.body;
                                            var Navbar = jsonData.response.data;
                                            for (var r=0;r<4;r++){
                                            expect(Navbar.widgets[0].data.related.data.cards[r].data.video_name).to.equal(tem[r])
                                            }
                                        })
                                    })
                                    it('Checking Podcast Widget Card 5 is clickable', () => {
                                        cy.get('.app-logo').click()
                            .wait(1000)
                            cy.get(':nth-child(5) > .nav-link', { timeout: 10000 }).click()
                        cy.url()
                        .wait(1000)
                                        //cy.visit('https://testhtvfun.ventunotech.com/show/podcast')
                                        cy.get(':nth-child(6) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                                             cy.url();
                                    })
                                             it('Checking Podcast Video 5 - Player  is clickable', () => {
                                                cy.get('.vtn-ply-view-hit', { timeout: 10000 }).should('exist')
                                                //Video Title
                                                cy.get('.heading').should('exist').invoke('text').then((urlText) => {
                                                    const temp = urlText.toString();
                                                    cy.log(temp);
                                                     cy.request({
                                                         method: "POST",
                                                         url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                                         form: true,
                                                         body: {
                                                            user_key:'  95077574069748',
                                                            token:Token,
                                                            user_id: '95480',
                                                             url:'https://testhtvfun.ventunotech.com/watch/podcast/no-puedo-olvidarte-ft-the-princess--1',
                                                             app_version: '1.3.13'
                                             
                                                         }
                                                     })
                                                         .then((response) => {
                                                             var jsonData = response.body;
                                                             var Navbar = jsonData.response.data;
                                                             expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                                                         })
                                                })
                                                //Video Description
                                                cy.get('.video-description').should('exist').invoke('text').then((urlText) => {
                                                    const temp = urlText.toString();
                                                    cy.log(temp);
                                                    cy.request({
                                                    method: "POST",
                                                    url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                                    form: true,
                                                    body: {
                                                        user_key:' 95077574069748',
                                                        token:Token,
                                                        user_id: '95480',
                                                        url:'https://testhtvfun.ventunotech.com/watch/podcast/no-puedo-olvidarte-ft-the-princess--1',
                                                        app_version: '1.3.13'
                                        
                                                    }
                                                })
                                                    .then((response) => {
                                                        var jsonData = response.body;
                                                      var Navbar = jsonData.response.data;
                                                      var desc = Navbar.widgets[0].data.video.data.video_description;
                                                      console.log(desc)
                                                      desc = desc.replace("\r<br>",'\n');
                                                      var desc1 = console.log(desc)
                                                      const desc2 = desc.toString();
                                                      expect(desc2).to.equal(temp)
                                                    })
                                                })
                                                //Video name
                                                cy.get('.vtn-title-wrp > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-title').should('exist').invoke('text').then((urlText) => {
                                                    const temp = urlText.toString();
                                                    cy.log(temp);
                                                    cy.request({
                                                        method: "POST",
                                                        url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                                         form: true,
                                                         body: {
                                                            user_key:'  95077574069748',
                                                            token:Token,
                                                            user_id: '95480',
                                                            url:'https://testhtvfun.ventunotech.com/watch/podcast/no-puedo-olvidarte-ft-the-princess--1',
                                                            app_version: '1.3.13'
                                            
                                                        }
                                                    })
                                                        .then((response) => {
                                                            var jsonData = response.body;
                                                            var Navbar = jsonData.response.data;
                                                            expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                                                        })
                                                })
                                                //Video views
                                                cy.get(' .vtn-info-title-div > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-views').should('exist').invoke('text').then((urlText) => {
                                                    const temp = urlText.toString();
                                                    cy.log(temp);
                                                })
                                                //Video info
                                                cy.get('.vtn-icon-box-active').should('exist').click()
                                                cy.get('.vtn-popup-close-btn ').should('exist').click()
                                                //Video Progress
                                                cy.get('.vtn-webplyr-progress-bar-load').should('exist')
                                                //Play or Pause Button
                                                cy.get('.vtn-webplyr-bar-button-play').should('exist').click()
                                                //Video Length
                                                cy.get('.vtn-webplyr-bar-time-area').should('exist').invoke('text').then((urlText) => {
                                                    const temp = urlText.toString();
                                                    cy.log(temp);
                                                 })
                                                 //Speaker
                                                 cy.get(' .vtn-webplyr-bar-volume-area > .vtn-webplyr-bar-button').should('exist')
                                                //FullScreen
                                                  cy.get('.vtn-webplyr-bar-button-fulllscreen').should('exist').click()
                                             })
                                             it('Checking Podcast Video 5 - Other Episodes', () => {
                                                cy.get('.col-3', { timeout: 10000 }).should('exist')
                                                const tem=[];
                                                for(var i=1;i<5;i++){
                                                    cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                                                    for(var j=0;j<4;j++){
                                                        cy.get('.video-inline-name').should('have.length', 4).eq(j).invoke('text').then((urlText) => {
                                                            const temp = urlText.toString();
                                                            cy.log(temp);
                                                            tem.push(temp);
                                                        cy.log(tem) 
                                                        })
                                                    }
                                                }
                                            cy.request({
                                                method: "POST",
                                                url: "https://testottapi.ventunotech.com/v1/ott/video/5d145529a7c72/211",
                                                         form: true,
                                                         body: {
                                                            user_key:'  95077574069748',
                    token:Token,
                    user_id: '95480',
                                                            url:'https://testhtvfun.ventunotech.com/watch/podcast/no-puedo-olvidarte-ft-the-princess--1',
                                                    app_version: '1.3.13'
                                                }
                                            })
                                                .then((response) => {
                                                    var jsonData = response.body;
                                                    var Navbar = jsonData.response.data;
                                                    for (var r=0;r<4;r++){
                                                    expect(Navbar.widgets[0].data.related.data.cards[r].data.video_name).to.equal(tem[r])
                                                    }
                                                })
                                            })
})