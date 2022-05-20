describe("Testing Footer links", () => {
    it("Checking status for response", () => {
        cy.request({
            method: "POST",
            url: "https://testottapi.ventunotech.com/v3/ott/footer/5d145529a7c72/211",
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
    it('Checking Footer links are visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        const tem=[];
        for(var i=1;i<4;i++){
            for(var j=1;j<2;j++){
        cy.get(':nth-child('+i+') > :nth-child('+j+') > .m-1 > a.link > .link', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            tem.push(temp);
        })
    }
     }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/footer/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(5)
                    var Navbar = jsonData.response.data;
                    for(var r=0;r<3;r++){
                    for(var k=0;k<1;k++){
                    cy.expect(Navbar.widgets[r].data.cards[k].data.action.primary.label).to.equal(tem[r]);
                    }
                    }
                })
    })
    it('Validation of footer links are clickable', () => {
        const tem=[];
        for(var i=1;i<4;i++){
            for(var j=1;j<2;j++){
        cy.get(':nth-child('+i+') > :nth-child('+j+') > .m-1 > a.link > .link', { timeout: 20000 }).click()
        cy.url()
        cy.location('href').then((urlText) => {
            const temp = urlText
            cy.log(temp);
            tem.push(temp); 
        })
    }
    }
            cy.request({
                method: "POST",
                url: "https://testottapi.ventunotech.com/v3/ott/footer/5d145529a7c72/211",
                form: true,
                body: {
                    user_key: '93650588458740',
                    app_version: '1.3.12'
                }
            })
                .then((response) => {
                    var jsonData = response.body;
                    expect(jsonData.response.data.widgets).to.have.length(5)
                    var Navbar = jsonData.response.data;
                    for(var r=0;r<3;r++){
                        for(var k=0;k<1;k++){
                    cy.expect(Navbar.widgets[r].data.cards[k].data.action.primary.url).to.equal(tem[r]);
                        }
                    }
                })
    })
    it('Checking ContactUs Title & Content is visible', () => {
        cy.visit('https://testhtvfun.ventunotech.com/')
        cy.get(':nth-child(3) > :nth-child(1) > .m-1 > a.link > .link', { timeout: 20000 }).click()
        cy.get('.text-center', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp)
        })
        cy.get('.html-text', { timeout: 10000 }).invoke('text').then((urlText) => {
            const temp = urlText.toString();
            cy.log(temp)
        })
    })
})