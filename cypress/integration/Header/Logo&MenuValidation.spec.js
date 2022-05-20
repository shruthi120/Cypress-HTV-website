describe("Testing Navbar api links", () => {
    it("Checking status for response", () => {
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
                expect(response.body).have.property('response')
                expect(response).to.have.property('status', 200)
                expect(response.body).to.not.be.null
            })
    })
    it('Checking Site-logo is visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get('.app-logo', { timeout: 10000 }).should('exist')
    })
    it('Checking navbar links are visible', () => {
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
        it('Validation of Site_logo link', () => {
            cy.url()
            cy.get('.app-logo', { timeout: 20000 }).click({ force: true });
            cy.location('href').then((urlText) => {
                const temp = urlText
                cy.log(temp);
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
                        var Navbar = jsonData.response.data.widget.data;
                        expect(Navbar.site_logo.data.link.url).to.equal(temp)
                    })
            })
        })
        it('Validation of navbar links are clickable', () => {
            cy.visit('https://testhtvfun.ventunotech.com/')
            const tem=[];
          
               for(var i=1;i<=6;i++){
                cy.get(':nth-child('+i+') > .nav-link', { timeout: 10000 }).click({force: true})
                cy.url();
                cy.location('href').then((urlText) => {
                   const temp = urlText
                   cy.log(temp);
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
                                expect(Navbar.links[j].data.link.url).to.equal(tem[j])
                                }
              })
            })
    })