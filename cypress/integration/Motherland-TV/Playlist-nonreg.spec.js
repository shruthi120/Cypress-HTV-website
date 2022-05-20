describe("Testing Motherland tab", () => {
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
    it('Checking Motherland link is clickable', () => {
       cy.visit('https://testhtvfun.ventunotech.com/', { timeout: 10000 })
        cy.get(':nth-child(3) > .nav-link', { timeout: 10000 }).click()
        cy.url()
        .wait(1000)
    })
    it('Checking Motherland Widget Card 1 is clickable', () => {
        cy.get('#vhl-0 > .carousel-inner > .carousel-item > :nth-child(1) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
             cy.url();
    })
             it('Checking Motherland Video 1 - Player  is clickable', () => {
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
                     url:'https://testhtvfun.ventunotech.com/playlist/853/nime-nollywood-the-nollywood-insider-episode-5',
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
                    url:'https://testhtvfun.ventunotech.com/playlist/853/nime-nollywood-the-nollywood-insider-episode-5',
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
                    url:'https://testhtvfun.ventunotech.com/playlist/853/nime-nollywood-the-nollywood-insider-episode-5',
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
             it('Checking Motherland Video 1 1st & 2nd - Other Episodes', () => {
                cy.get('.col-3', { timeout: 10000 }).should('exist')
                const tem=[];
                for(var i=1;i<3;i++){
                    cy.get('.v-widget > .row > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                    for(var j=0;j<2;j++){
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/853/nime-nollywood-the-nollywood-insider-episode-5',
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for (var r=0;r<2;r++){
                    expect(Navbar.widgets[0].data.related.data.cards[r].data.video_name).to.equal(tem[r])
                    }
                })
            })
            it('Checking Motherland Video-1 3rd & 4th - Other Episodes', () => {
                cy.get('.col-3', { timeout: 10000 }).should('exist')
                const tem=[];
                for(var i=3;i<5;i++){
                    cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                    for(var j=2;j<4;j++){
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
                url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    url: 'https://testhtvfun.ventunotech.com/playlist/853/nime-nollywood-the-nollywood-insider-episode-5',
                    app_version: '1.3.13'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    for (var r=0;r<2;r++){
                        for(var k=2;k<4;k++){
                    expect(Navbar.widgets[0].data.related.data.cards[k].data.video_name).to.equal(tem[r])
                    r++;
                        }
                    }
                })
            })
            it('Checking Motherland video 1 - Recommended video - title,play btn',()=>{
                //Recommended Video
cy.get('.video-horizontal-listing').should('exist')
//Videos
for(var i=1;i<3;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist')
}
//Play Btns
for(var i=1;i<3;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play').should('exist')
}
//Titles
const tem=[];
for(var i=1;i<3;i++){
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
            url:'https://testhtvfun.ventunotech.com/playlist/853/nime-nollywood-the-nollywood-insider-episode-5',
            app_version: '1.3.13'
        }
    })
        .then((response) => {
            var jsonData = response.body;
            var Navbar = jsonData.response.data;
            for(var j=0;j<2;j++){
            expect(Navbar.widgets[1].data.cards[j].data.video_name).to.equal(tem[j])
            }
        })
  })
  it('Checking Motherland Widget Card 2 is clickable', () => {
      cy.visit('https://testhtvfun.ventunotech.com/motherland_tv')
    cy.get('#vhl-0 > .carousel-inner > .carousel-item > :nth-child(2) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
         cy.url();
})
         it('Checking Motherland Video 2 - Player  is clickable', () => {
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
                     url:'https://testhtvfun.ventunotech.com/playlist/850/government-house-episode-4',
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
                    url:'https://testhtvfun.ventunotech.com/playlist/850/government-house-episode-4',
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
                    url:'https://testhtvfun.ventunotech.com/playlist/850/government-house-episode-4',
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
         it('Checking Motherland Video 2 - 1st & 2nd Other Episodes', () => {
            cy.get('.col-3', { timeout: 10000 }).should('exist')
            const tem=[];
            for(var i=1;i<3;i++){
                cy.get('.v-widget > .row > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                for(var j=0;j<2;j++){
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
            url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93650588458740',
                url: 'https://testhtvfun.ventunotech.com/playlist/850/government-house-episode-4',
                app_version: '1.3.13'
            }
        })
            .then((response) => {
                var jsonData = response.body;
                var Navbar = jsonData.response.data;
                for (var r=0;r<2;r++){
                expect(Navbar.widgets[0].data.related.data.cards[r].data.video_name).to.equal(tem[r])
                }
            })
        })
        it('Checking Motherland Video-2 3rd & 4th - Other Episodes', () => {
            cy.get('.col-3', { timeout: 10000 }).should('exist')
            const tem=[];
            for(var i=3;i<5;i++){
                cy.get(':nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
                for(var j=2;j<4;j++){
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
            url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
            form: true,
            body: {
                user_key: '93650588458740',
                url: 'https://testhtvfun.ventunotech.com/playlist/850/government-house-episode-4',
                app_version: '1.3.13'
            }
        })
            .then((response) => {
                var jsonData = response.body;
                var Navbar = jsonData.response.data;
                for (var r=0;r<2;r++){
                    for(var k=2;k<4;k++){
                expect(Navbar.widgets[0].data.related.data.cards[k].data.video_name).to.equal(tem[r])
                r++;
                    }
                }
            })
        })
        it('Checking Motherland video 2 - Recommended video - title,play btn',()=>{
            //Recommended Video
cy.get('.video-horizontal-listing').should('exist')
//Videos
for(var i=1;i<3;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist')
}
//Play Btns
for(var i=1;i<3;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play').should('exist')
}
//Titles
const tem=[];
for(var i=1;i<3;i++){
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
        url:'https://testhtvfun.ventunotech.com/playlist/850/government-house-episode-4',
        app_version: '1.3.13'
    }
})
    .then((response) => {
        var jsonData = response.body;
        var Navbar = jsonData.response.data;
        for(var j=0;j<2;j++){
        expect(Navbar.widgets[1].data.cards[j].data.video_name).to.equal(tem[j])
        }
    })
})
it('Checking Motherland Widget Card 3 is clickable', () => {
    cy.visit('https://testhtvfun.ventunotech.com/motherland_tv')
  cy.get(':nth-child(3) > .aspect-ratio-box > .img-wrpr > .card-img-top', { timeout: 10000 }).click({force: true})
       cy.url();
})
       it('Checking Motherland Video 3 - Player  is clickable', () => {
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
                     url:'https://testhtvfun.ventunotech.com/playlist/849/naked-truth-season-1-dating-for-marriage-or-just-for-fun',
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
                    url:'https://testhtvfun.ventunotech.com/playlist/849/naked-truth-season-1-dating-for-marriage-or-just-for-fun',
                    app_version: '1.3.13'
    
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    var Navbar = jsonData.response.data;
                    var desc = Navbar.widgets[0].data.video.data.video_description;
                    console.log(desc)
                    desc = desc.replaceAll("\r<br>",'\n');
                    var desc1 = console.log(desc)
                    const desc2 = desc.toString();
                    expect(desc2).to.equal(temp)
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
       it('Checking Motherland Video 3 - Other Episode', () => {
        cy.get('.col-3').should('exist')
        cy.get('.v-widget > .row > :nth-child(1) > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist').trigger('mouseover')
        cy.get('.video-inline-name').should('have.length', 1).eq(0).invoke('text').then((urlText) => {
          const temp = urlText.toString();
          cy.log(temp);
          cy.request({
              method: "POST",
              url: "https://testottapi.ventunotech.com/v1/ott/playlist/5d145529a7c72/211",
              form: true,
              body: {
                  user_key: '93650588458740',
                  url:'https://testhtvfun.ventunotech.com/playlist/849/naked-truth-season-1-dating-for-marriage-or-just-for-fun',
                  app_version: '1.3.13'
              }
          })
              .then((response) => {
                  var jsonData = response.body;
                  var Navbar = jsonData.response.data;
                  expect(Navbar.widgets[0].data.related.data.cards[0].data.video_name).to.equal(temp)
              })
      })
       })
    it('Checking Motherland video 3 - Recommended video - title,play btn',()=>{
        //Recommended Video
cy.get('.video-horizontal-listing').should('exist')
//Videos
for(var i=1;i<3;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .img-wrpr > .card-img-top').should('exist')
}
//Play Btns
for(var i=1;i<3;i++){
cy.get('#vhl-1 > .carousel-inner > .carousel-item > :nth-child('+i+') > .aspect-ratio-box > .video-play-icon > .play').should('exist')
}
//Titles
const tem=[];
for(var i=1;i<3;i++){
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
    url:'https://testhtvfun.ventunotech.com/playlist/849/naked-truth-season-1-dating-for-marriage-or-just-for-fun',
    app_version: '1.3.13'
}
})
.then((response) => {
    var jsonData = response.body;
    var Navbar = jsonData.response.data;
    for(var j=0;j<2;j++){
    expect(Navbar.widgets[1].data.cards[j].data.video_name).to.equal(tem[j])
    }
})
})
})
