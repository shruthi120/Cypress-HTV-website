describe("Testing Motherland tab", () => {
    let Token = " ";
    let Hash=" ";
    let code =" ";
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/motherlandtv/5d145529a7c72/211",
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
        it('Checking navbar links are visible', () => {
            //cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
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
                    user_key: '93650588458740',
                    app_version: '1.3.12',
                    token:Token,
                    user_id: '95480',
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
    it('Checking Motherland link is clickable', () => {
        cy.get(':nth-child(3) > .nav-link', { timeout: 10000 }).click()
        cy.url()
        .wait(3000)
    })
    it('Motherland red highlight',()=>{
        cy.get(':nth-child(3) > .nav-link')
        .click()
        .should('have.class', 'active')
        .wait(3000)
        })
    it('Checking Motherland widget title is visible', () => {
        cy.get('.video-horizontal-listing > .widget-title > h2', { timeout: 50000 }).invoke('text').then((urlText) => {
       const temp = urlText.toString();
        cy.log(temp)                
        cy.request({
           method: "POST",
           url: "https://testottapi.ventunotech.com/v3/ott/motherlandtv/5d145529a7c72/211",
           form: true,
           body: {
            user_key: '10185419677031',
            app_version: '1.3.13',
            token:Token,
            user_id: 95480
           }
       })
            .then((response) => {
                
           var jsonData = response.body;
                        expect(jsonData.response.data.widgets).to.have.length(2)
                        var Navbar = jsonData.response.data;
                        expect(Navbar.title).to.equal(temp)
              })
           })
       })
       it('Checking Motherland Widgets first 2 Cards size', () => {
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
                url: "https://testottapi.ventunotech.com/v3/ott/motherlandtv/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '10185419677031',
            app_version: '1.3.13',
            token:Token,
            user_id: 95480
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets[0].data.cards).to.have.length(3)
                    var Navbar = jsonData.response.data;
                    for(var j=0;j<1;j++){
                        for(var k=0;k<2;k++){
                    expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][150]).to.equal(tem[k])
                    }
                }
                })
        })
        it('Checking Motherland Widgets Card 3 size', () => {
            cy.get(':nth-child(3) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 20000 }).invoke('attr', 'src').then((urlText) => {
                const temp = urlText.toString();
                cy.log(temp);
                cy.request({
                    method: "POST",
                    url: "https://testottapi.ventunotech.com/v3/ott/motherlandtv/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '10185419677031',
            app_version: '1.3.13',
            token:Token,
            user_id: 95480
    
                    }
                })
                    .then((response) => {
                        var jsonData = response.body;
                        var Navbar = jsonData.response.data;
                        expect(Navbar.widgets[0].data.cards[2].data.video_thumbnails["16x9"][150]).to.equal(temp)
                    })
            })
        })
        it('Checking Motherland first 2 Video titles', () => {
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
                        url: "https://testottapi.ventunotech.com/v3/ott/motherlandtv/5d145529a7c72/211",
                        form: true,
                        body: {
                            user_key: '10185419677031',
            app_version: '1.3.13',
            token:Token,
            user_id: 95480
                        }
                    })
                        .then((response) => {
                            var jsonData = response.body;
                            expect(jsonData.response.data.widgets[0].data.cards).to.have.length(3)
                            var Navbar = jsonData.response.data;
                            for(var j=0;j<1;j++){
                                for(var k=0;k<2;k++){
                            expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                            }
                        }
                        })
                })
                it('Checking Motherland first 2 Widgets Cards are clickable', () => {
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
                            url: "https://testottapi.ventunotech.com/v3/ott/motherlandtv/5d145529a7c72/211",
                            form: true,
                            body: {
                                user_key: '10185419677031',
            app_version: '1.3.13',
            token:Token,
            user_id: 95480
                            }
                        })
                            .then((response) => {
                                var jsonData = response.body;
                                expect(jsonData.response.data.widgets[0].data.cards).to.have.length(3)
                                var Navbar = jsonData.response.data;
                                for(var j=0;j<1;j++){
                                    for(var k=0;k<2;k++){
                                expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k])
                                }
                            }
                            })
                    })
                    it('Checking Motherland 3rd Widgets Card is clickable', () => {
                        cy.get(':nth-child(3) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
                         cy.url();
                         cy.location('href').then((urlText) => {
                            const temp = urlText
                            cy.log(temp);        
                         cy.request({
                            method: "POST",
                            url: "https://testottapi.ventunotech.com/v3/ott/motherlandtv/5d145529a7c72/211",
                            form: true,
                            body: {
                                user_key: '10185419677031',
            app_version: '1.3.13',
            token:Token,
            user_id: 95480
                            }
                        })
                            .then((response) => {
                                var jsonData = response.body;
                                expect(jsonData.response.data.widgets[0].data.cards).to.have.length(3)
                                var Navbar = jsonData.response.data;
                                expect(Navbar.widgets[0].data.cards[2].data.video_url.url).to.equal(temp)
                    })
                })
            })
                it('Checking Motherland 3rd Video title', () => {
                    cy.get('.app-logo').click()
    .wait(3000)
    cy.get(':nth-child(3) > .nav-link', { timeout: 10000 }).click()
cy.url()
.wait(3000)
                    //cy.visit('https://testhtvfun.ventunotech.com/motherland_tv')
                    cy.get(':nth-child(3) > .card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
                        const temp = urlText.toString();
                        cy.log(temp)
                        cy.request({
                            method: "POST",
                            url: "https://testottapi.ventunotech.com/v3/ott/motherlandtv/5d145529a7c72/211",
                            form: true,
                            body: {
                                user_key: '10185419677031',
            app_version: '1.3.13',
            token:Token,
            user_id: 95480
                            }
                        })
                            .then((response) => {
                                var jsonData = response.body;
                                expect(jsonData.response.data.widgets[0].data.cards).to.have.length(3)
                                var Navbar = jsonData.response.data;
                                expect(Navbar.widgets[0].data.cards[2].data.video_name).to.equal(temp)
                })
            })
        })
        it('Checking MOtherland first 2 Play btns are visible', () => {
            for(var i=1;i<3;i++){
            cy.get('#vhl-0 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
            }
        })
        it('Checking MOtherland 3rd Play btn is visible', () => {
            cy.get(':nth-child(3) > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
        })
})