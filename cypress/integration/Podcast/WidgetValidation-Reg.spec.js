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
       // cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
        const tem=[];
      
           for(var i=1;i<=6;i++){
            cy.get('.mr-auto >:nth-child('+i+') > .nav-link', { timeout: 20000 }).invoke('text').then((urlText) => {
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
    it('Checking Podcast link is clickable', () => {
        cy.get(':nth-child(5) > .nav-link', { timeout: 10000 }).click()
        cy.url()
        .wait(1000)
    })
    it('Podcast red highlight',()=>{
        cy.get(':nth-child(5) > .nav-link')
        .click()
        .should('have.class', 'active')
        .wait(3000)
        })
    it('Checking Podcast widget title is visible', () => {
        cy.get('.row > .widget-title > h2', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
             cy.log(temp)   
             var id = temp.slice(0,7);
             cy.log(id)             
             cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/videoListing/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93264865961166',
                    token:Token,
                    user_id: '95480',
                    url: 'https://testhtvfun.ventunotech.com/show/podcast',
                    app_version: '1.3.12'
                }
            })
                 .then((response) => {
                     
                var jsonData = response.body;
                             var Navbar = jsonData.response.data;
                             expect(Navbar.title).to.equal(id)
                   })
                })
            })
            it('Checking Podcast Widgets Cards size', () => {
                    const tem=[];
            
                    for(var i=2;i<7;i++){
                    cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).invoke('attr', 'src').then((urlText) => {
                        const temp = urlText.toString();
                        tem.push(temp);
                        cy.log(tem)              
                         })
                         }
                         cy.request({
                            method: "POST",
                            url: "https://testottapi.ventunotech.com/v1/ott/videoListing/5d145529a7c72/211",
                            form: true,
                            body: {
                                user_key: '93264865961166',
                                token:Token,
                                user_id: '95480',
                            url: 'https://testhtvfun.ventunotech.com/show/podcast',
                                app_version: '1.3.12'
                            }
                        })
                            .then((response) => {
                                var jsonData = response.body;
                                expect(jsonData.response.data.widgets[0].data.cards).to.have.length(5)
                                var Navbar = jsonData.response.data;
                                for(var j=0;j<1;j++){
                                    for(var k=0;k<5;k++){
                                expect(Navbar.widgets[j].data.cards[k].data.video_thumbnails["16x9"][320]).to.equal(tem[k])
                                }
                            }
                            })
                    })
                    it('Checking Podcast Widgets are clickable', () => {
                        const tem=[];
                
                        for(var i=2;i<7;i++){
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
                                url: "https://testottapi.ventunotech.com/v1/ott/videoListing/5d145529a7c72/211",
                            form: true,
                            body: {
                                user_key: '93264865961166',
                                token:Token,
                                user_id: '95480',
                            url: 'https://testhtvfun.ventunotech.com/show/podcast',
                                    app_version: '1.3.12'
                                }
                            })
                                .then((response) => {
                                    var jsonData = response.body;
                                    expect(jsonData.response.data.widgets[0].data.cards).to.have.length(5)
                                    var Navbar = jsonData.response.data;
                                    for(var j=0;j<1;j++){
                                        for(var k=0;k<5;k++){
                                    expect(Navbar.widgets[j].data.cards[k].data.video_url.url).to.equal(tem[k])
                                    }
                                }
                                })
                        })
                        it('Checking Podcast Video titles', () => {
                            cy.get('.app-logo').click()
                            .wait(1000)
                            cy.get(':nth-child(5) > .nav-link', { timeout: 10000 }).click()
                        cy.url()
                        .wait(1000)
                            //cy.visit('https://testhtvfun.ventunotech.com/show/podcast')
                                const tem=[];
                        
                                for(var i=2;i<7;i++){
                                cy.get(':nth-child('+i+') >.card-body > .card-primary-text > .video-name > a', { timeout: 10000 }).invoke('text').then((urlText) => {
                                    const temp = urlText.toString();
                                    tem.push(temp);
                                    cy.log(tem)              
                                     })
                                     }
                                     cy.request({
                                        method: "POST",
                                        url: "https://testottapi.ventunotech.com/v1/ott/videoListing/5d145529a7c72/211",
                            form: true,
                            body: {
                                user_key: '93264865961166',
                                token:Token,
                                user_id: '95480',
                            url: 'https://testhtvfun.ventunotech.com/show/podcast',
                                            app_version: '1.3.12'
                                        }
                                    })
                                        .then((response) => {
                                            var jsonData = response.body;
                                            expect(jsonData.response.data.widgets[0].data.cards).to.have.length(5)
                                            var Navbar = jsonData.response.data;
                                            for(var j=0;j<1;j++){
                                                for(var k=0;k<5;k++){
                                            expect(Navbar.widgets[j].data.cards[k].data.video_name).to.equal(tem[k])
                                            }
                                        }
                                        })
                                })
                                it('Checking Podcast Play btns are visible', () => {
                                    for(var i=2;i<7;i++){
                                    cy.get(':nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play', { timeout: 10000 }).should('exist')
                                    }
    })
})