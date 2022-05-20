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
    it('Checking H-Family Tv link is clickable', () => {
        cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
        cy.get(':nth-child(4) > .nav-link', { timeout: 20000 }).click({force:true})
        cy.url()
    })
    it('Checking H-Family Widget Card 1 is clickable', () => {
        cy.get('#vhl-0 > .carousel-inner > .carousel-item > :nth-child(1) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
             cy.url();
    })
             it('Checking H-Family Video 1 - Player  is clickable', () => {
                cy.get('.vtn-ply-view-hit', { timeout: 30000 }).should('exist')
                //Video Title
        cy.get('.heading').should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                 form: true,
                 body: {
                     user_key: '93650588458740',
                     url: 'https://testhtvfun.ventunotech.com/playlist/810/yangmadam-episode-3',
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/810/yangmadam-episode-3',
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/810/yangmadam-episode-3',
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
         //Settings
         cy.get(' .vtn-webplyr-bwc-holder > .vtn-webplyr-bar-button').should('exist').click()
        //FullScreen
          cy.get('.vtn-webplyr-bar-button-fulllscreen').should('exist').click()
             })
             it('Checking H-family Video 1 - 1 to 4-Other Episodes', () => {
                cy.get('.col-3', { timeout: 10000 }).should('exist')
                const tem=[];
                for(var i=1;i<5;i++){
                    cy.get('.v-widget > .row > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                    for(var j=0;j<4;j++){
                        cy.get('.video-inline-name').should('have.length', 8).eq(j).invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp);
                            tem.push(temp);
                        cy.log(tem) 
                        })
                    }
                }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/810/yangmadam-episode-3',
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
            it('Checking H-family Video 1 - 5 to 8-Other Episodes', () => {
                cy.get('.col-3', { timeout: 10000 }).should('exist')
                const tem=[];
                for(var i=5;i<9;i++){
                    cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                    for(var j=4;j<8;j++){
                        cy.get('.video-inline-name').should('have.length', 8).eq(j).invoke('text').then((urlText) => {
                            const temp = urlText.toString();
                            cy.log(temp);
                            tem.push(temp);
                        cy.log(tem) 
                        })
                    }
                }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/810/yangmadam-episode-3',
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for (var r=4;r<8;r++){
                        for(var k=0;k<4;k++){
                    expect(Navbar.widgets[0].data.related.data.cards[r].data.video_name).to.equal(tem[k])
                    r++;
                    }
                }
                })
            })
            it('Checking H-Family video 1 - Recommended video - title,play btn',()=>{
               //Recommended Video
cy.get('.video-horizontal-listing').should('exist')
//Videos
for(var i=1;i<2;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist')
 }
 //Play btns
 for(var i=1;i<2;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play').should('exist')
}
//Titles
const tem=[];
for(var i=1;i<2;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text').should('exist').invoke('text').then((urlText) => {
    const temp = urlText.toString();
    cy.log(temp);tem.push(temp);
    cy.log(tem) 
})
}
    cy.request({
        method: "POST",
        url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
        form: true,
        body: {
            user_key: '93650588458740',
            url:'https://testhtvfun.ventunotech.com/playlist/810/yangmadam-episode-3',
            app_version: '1.3.13'
        }
    })
        .then((response) => {
            var jsonData = response.body;
            var Navbar = jsonData.response.data;
            for(var j=0;j<1;j++){
            expect(Navbar.widgets[1].data.cards[j].data.video_name).to.equal(tem[j])
            }
        })
  })
  it('Checking H-Family Widget Card 2 is clickable', () => {
      cy.visit('https://testhtvfun.ventunotech.com/h_family_tv')
    cy.get('#vhl-0 > .carousel-inner > .carousel-item > :nth-child(2) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
         cy.url();
})
         it('Checking H-Family Video 2 - Player  is clickable', () => {
            cy.get('.vtn-ply-view-hit', { timeout: 20000 }).should('exist')
            //Video Title
        cy.get('.heading').should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                 form: true,
                 body: {
                     user_key: '93650588458740',
                      url: 'https://testhtvfun.ventunotech.com/playlist/617/mexican-casserole',
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                     url: 'https://testhtvfun.ventunotech.com/playlist/617/mexican-casserole',
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/617/mexican-casserole',
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
        cy.get('.vtn-info-title-div > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-views').should('exist').invoke('text').then((urlText) => {
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
         it('Checking H-family Video 2 - 1 to 4-Other Episodes', () => {
            cy.get('.col-3', { timeout: 10000 }).should('exist')
            const tem=[];
            for(var i=1;i<5;i++){
                cy.get('.v-widget > .row > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                for(var j=0;j<4;j++){
                    cy.get('.video-inline-name').should('have.length', 6).eq(j).invoke('text').then((urlText) => {
                        const temp = urlText.toString();
                        cy.log(temp);
                        tem.push(temp);
                    cy.log(tem) 
                    })
                }
            }
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93650588458740',
                url: 'https://testhtvfun.ventunotech.com/playlist/617/mexican-casserole',
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
        it('Checking H-family Video 2 - 5 to 6-Other Episodes', () => {
            cy.get('.col-3', { timeout: 10000 }).should('exist')
            const tem=[];
            for(var i=5;i<7;i++){
                cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                for(var j=4;j<6;j++){
                    cy.get('.video-inline-name').should('have.length', 6).eq(j).invoke('text').then((urlText) => {
                        const temp = urlText.toString();
                        cy.log(temp);
                        tem.push(temp);
                    cy.log(tem) 
                    })
                }
            }
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93650588458740',
                url: 'https://testhtvfun.ventunotech.com/playlist/617/mexican-casserole',
                app_version: '1.3.13'
            }
        })
            .then((response) => {
                var jsonData = response.body;
                var Navbar = jsonData.response.data;
                for (var r=4;r<6;r++){
                    for(var k=0;k<2;k++){
                        expect(Navbar.widgets[0].data.related.data.cards[r].data.video_name).to.equal(tem[k])
                        r++;
                        }
                    }
            })
        })
        it('Checking H-Family video 2 - Recommended video - title,play btn',()=>{
           //Recommended Video
cy.get('.video-horizontal-listing').should('exist')
//Videos
for(var i=1;i<2;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist')
}
//Play btns
for(var i=1;i<2;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play').should('exist')
}
//Titles
const tem=[];
for(var i=1;i<2;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text').should('exist').invoke('text').then((urlText) => {
const temp = urlText.toString();
cy.log(temp);tem.push(temp);
cy.log(tem) 
})
}
cy.request({
    method: "POST",
    url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
    form: true,
    body: {
        user_key: '93650588458740',
        url:'https://testhtvfun.ventunotech.com/playlist/617/mexican-casserole',
        app_version: '1.3.13'
    }
})
    .then((response) => {
        var jsonData = response.body;
        var Navbar = jsonData.response.data;
        for(var j=0;j<1;j++){
        expect(Navbar.widgets[1].data.cards[j].data.video_name).to.equal(tem[j])
        }
    })
})
/*it('Checking H-Family Widget Card 3 is clickable', () => {
    cy.visit('https://testhtvfun.ventunotech.com/h_family_tv')
  cy.get(':nth-child(3) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
       cy.url();
})
       it('Checking H-Family Video 3 - Player  is clickable', () => {
        cy.get('.img-fluid', { timeout: 10000 }).should('exist')
        //Video Title
        cy.get('.heading').should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                 form: true,
                 body: {
                     user_key: '93650588458740',
                     url: 'https://testhtvfun.ventunotech.com/playlist/595/episode-1-great-dance-performance-part-1',
                     app_version: '1.3.12'
     
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/595/episode-1-great-dance-performance-part-1',
                    app_version: '1.3.12'
    
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
        cy.get('.heading').should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/595/episode-1-great-dance-performance-part-1',
                    app_version: '1.3.12'
    
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                })
        })
       })
       it('Checking H-Family video 3 - Recommended video - title,play btn',()=>{
        //Recommended Video
cy.get('.video-horizontal-listing').should('exist')
//Videos
for(var i=1;i<5;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist')
}
//Play btns
for(var i=1;i<5;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play').should('exist')
}
//Titles
const tem=[];
for(var i=1;i<5;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text').should('exist').invoke('text').then((urlText) => {
const temp = urlText.toString();
cy.log(temp);tem.push(temp);
cy.log(tem) 
})
}
cy.request({
 method: "POST",
 url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
 form: true,
 body: {
     user_key: '93650588458740',
     url:'https://testhtvfun.ventunotech.com/playlist/595/episode-1-great-dance-performance-part-1',
     app_version: '1.3.12'
 }
})
 .then((response) => {
     var jsonData = response.body;
     var Navbar = jsonData.response.data;
     for(var j=0;j<4;j++){
     expect(Navbar.widgets[1].data.cards[j].data.video_name).to.equal(tem[j])
     }
 })
})
it('Checking H-Family Widget Card 4 is clickable', () => {
 cy.visit('https://testhtvfun.ventunotech.com/h_family_tv')
cy.get(':nth-child(4) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
    cy.url();
})
    it('Checking H-Family Video 4 - Player  is clickable', () => {
        cy.get('.img-fluid', { timeout: 10000 }).should('exist')
        //Video Title
        cy.get('.heading').should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                 form: true,
                 body: {
                     user_key: '93650588458740',
                     url: 'https://testhtvfun.ventunotech.com/playlist/594/episode-1-great-dance-performance-part-2',
                     app_version: '1.3.12'
     
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/594/episode-1-great-dance-performance-part-2',
                    app_version: '1.3.12'
    
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
    })
    it('Checking H-Family video 4 - Recommended video - title,play btn',()=>{
        //Recommended Video
cy.get('.video-horizontal-listing').should('exist')
//Videos
for(var i=1;i<5;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist')
}
//Play btns
for(var i=1;i<5;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play').should('exist')
}
//Titles
const tem=[];
for(var i=1;i<5;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text').should('exist').invoke('text').then((urlText) => {
const temp = urlText.toString();
cy.log(temp);tem.push(temp);
cy.log(tem) 
})
}
cy.request({
 method: "POST",
 url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
 form: true,
 body: {
     user_key: '93650588458740',
     url:'https://testhtvfun.ventunotech.com/playlist/594/episode-1-great-dance-performance-part-2',
     app_version: '1.3.12'
 }
})
 .then((response) => {
     var jsonData = response.body;
     var Navbar = jsonData.response.data;
     for(var j=0;j<4;j++){
     expect(Navbar.widgets[1].data.cards[j].data.video_name).to.equal(tem[j])
     }
 })
})
it('Checking Widget Card indicator - H-Family icon nxt is visible', () => {
    cy.visit('https://testhtvfun.ventunotech.com/h_family_tv')
    cy.get('.carousel-lg > .carousel-control-next', { timeout: 10000 }).should('exist').click();
})
it('Checking H-Family Video 5 is clickable', () => {
    cy.get('.carousel-item-next > .v-card > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({ force: true })
    cy.url()
})
it('Checking H-Family 5 - Player  is clickable', () => {
    cy.get('.vtn-ply-view-hit', { timeout: 20000 }).should('exist')
        //Video Title
        cy.get('.heading').should('exist').invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp);
             cy.request({
                 method: "POST",
                 url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                 form: true,
                 body: {
                     user_key: '93650588458740',
                     url : 'https://testhtvfun.ventunotech.com/playlist/593/episode-1-beautiful-fireworks-capture-from-short-distant',
                     app_version: '1.3.12'
     
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url : 'https://testhtvfun.ventunotech.com/playlist/593/episode-1-beautiful-fireworks-capture-from-short-distant',
                    app_version: '1.3.12'
    
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url : 'https://testhtvfun.ventunotech.com/playlist/593/episode-1-beautiful-fireworks-capture-from-short-distant',
                    app_version: '1.3.12'
    
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    expect(Navbar.widgets[0].data.video.data.video_name).to.equal(temp)
                })
        })
        //Video views
        cy.get('.vtn-info-title-div > .vtn-webplyr-tltxt-wrapper > .vtn-webplyr-tltxt-views').should('exist').invoke('text').then((urlText) => {
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
it('Checking H-Family video 5 - Recommended video - title,play btn',()=>{
    //Recommended Video
cy.get('.video-horizontal-listing').should('exist')
//Videos
for(var i=1;i<5;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist')
}
//Play btns
for(var i=1;i<5;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play').should('exist')
}
//Titles
const tem=[];
for(var i=1;i<5;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .card-body > .card-primary-text').should('exist').invoke('text').then((urlText) => {
const temp = urlText.toString();
cy.log(temp);tem.push(temp);
cy.log(tem) 
})
}
cy.request({
method: "POST",
url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
form: true,
body: {
 user_key: '93650588458740',
 url:'https://testhtvfun.ventunotech.com/playlist/593/episode-1-beautiful-fireworks-capture-from-short-distant',
 app_version: '1.3.12'
}
})
.then((response) => {
 var jsonData = response.body;
 var Navbar = jsonData.response.data;
 for(var j=0;j<4;j++){
 expect(Navbar.widgets[1].data.cards[j].data.video_name).to.equal(tem[j])
 }
})
})*/
})