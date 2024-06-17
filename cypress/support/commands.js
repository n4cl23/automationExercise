// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
import { faker } from '@faker-js/faker';

Cypress.Commands.add('deleteAccount', () => {
   //Check and click logout button
   cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').click()
   ///Fill login form
   cy.get('input[data-qa="login-email"]').type('emailteste123@gmail.com').should('have.value', 'emailteste123@gmail.com')
   cy.get('input[data-qa="login-password"]').type('P@ssword').should('have.value', 'P@ssword')
   cy.get('button[data-qa="login-button"]').should('be.visible').click()
   ///checked login
   cy.get('b').contains('userTest')
   cy.deleteAcc()
})

Cypress.Commands.add('newRegister', () => {
   cy.verifyEmail()
   //Logout
   cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').click()
   //Fill login form
   cy.get('input[data-qa="login-email"]').type('emailteste123@gmail.com').should('have.value', 'emailteste123@gmail.com')
   cy.get('input[data-qa="login-password"]').type('P@ssword').should('have.value', 'P@ssword')
   cy.get('button[data-qa="login-button"]').should('be.visible').click()
   ///checked login
   cy.get('b').contains('userTest')
   ///Delete Account
   cy.deleteAcc()
})

Cypress.Commands.add('loginValid', () => {
   //Fill login form
   cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').click()
   cy.get('input[data-qa="login-email"]').type('emailteste123@gmail.com').should('have.value', 'emailteste123@gmail.com')
   cy.get('input[data-qa="login-password"]').type('P@ssword').should('have.value', 'P@ssword')
   cy.get('button[data-qa="login-button"]').should('be.visible').click()
   ///checked login
   cy.get('b').contains('userTest')
})

Cypress.Commands.add('deleteAcc', () => {
   cy.get('.shop-menu > .nav > :nth-child(5) > a').should('be.visible').click()
   cy.contains('b', /^Account Deleted!$/).should('exist');
   cy.get('[data-qa="continue-button"]').should('be.visible').click()
   cy.title().should('be.equal', 'Automation Exercise')
})

Cypress.Commands.add('loginIncorrect', () => {
   let randomEmail = faker.internet.email();
   let fakePassword = faker.internet.password();
   ///Get and click signup/login
   cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
   ///Fill in incorrect data
   cy.get('input[data-qa="login-email"]').should('be.visible').type(randomEmail)
   cy.get('input[data-qa="login-password"]').should('be.visible').type(fakePassword)
   cy.get('button[data-qa="login-button"]').should('be.visible').click()
   ///Verify if message "incorrect data"
   cy.contains('p', /^Your email or password is incorrect!$/).should('exist')
})

Cypress.Commands.add('verifyEmail', () => {
   const email = 'emailteste123@gmail.com';
   const password = 'P@ssword';
   const user = 'userTest';

   cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: true,
      body: {
         csrfmiddlewaretoken: 'IWhy1iWgRxGqWZ6lKtbMM8LGQavU7JiUMIbXLbZod8KWBH4iq5cqKdRfhM3Zns10',
         email: email,
         password: password,
         form_type: 'signup'
      }
   }).then((response) => {
      if (response.status === 200 && response.body === '{"responseCode": 200, "message": "User exists!"}') {
         cy.request({
            method: 'DELETE',
            url: 'https://automationexercise.com/api/deleteAccount',
            form: true,
            body: {
               email: email,
               password: password,
            }
         }).then(() => {
            cy.request({
               method: 'POST',
               url: 'https://automationexercise.com/api/createAccount',
               form: true,
               body: {
                  name: user,
                  email: email,
                  password: password,
                  title: 'Mr',
                  birth_date: '23',
                  birth_month: 'March',
                  birth_year: '2000',
                  firstname: 'Uélitu',
                  lastname: 'Biruleibi',
                  company: 'Freud S.a',
                  address1: 'Rua do cucumber',
                  address2: 'travessa das bananeiras',
                  country: 'India',
                  zipcode: '40758952',
                  state: 'Kali',
                  city: 'Ganesha',
                  mobile_number: '+5571999999999'
               }
            }).then((response) => {
               cy.log('Resposta do novo usuário:', response);
               expect(response.status).to.eq(200);
               expect(response.body).to.eq('{"responseCode": 201, "message": "User created!"}');
            });
         });
      } else {
         cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount',
            form: true,
            body: {
               name: user,
               email: email,
               password: password,
               title: 'Mr',
               birth_date: '23',
               birth_month: 'March',
               birth_year: '2000',
               firstname: 'Uélitu',
               lastname: 'Biruleibi',
               company: 'Freud S.a',
               address1: 'Rua do cucumber',
               address2: 'travessa das bananeiras',
               country: 'India',
               zipcode: '40758952',
               state: 'Kali',
               city: 'Ganesha',
               mobile_number: '+5571999999999'
            }
         }).then((response) => {
            cy.log('User created!:', response);
            expect(response.status).to.eq(200);
            expect(response.body).to.eq('{"responseCode": 201, "message": "User created!"}');
         });
      }
   });
});

Cypress.Commands.add('registerExistingEmail', () => {
   cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').click()
   cy.get('[data-qa="signup-name"]').type('userTest').should('have.value', 'userTest')
   cy.get('[data-qa="signup-email"]').type('emailteste123@gmail.com').should('have.value', 'emailteste123@gmail.com')
})

Cypress.Commands.add('subscriptionVerify', () => {
   cy.get('footer').scrollIntoView()
   cy.get('.single-widget > h2').contains('Subscription')
   cy.get('input#susbscribe_email').type('emailteste123@gmail.com').should('have.value', 'emailteste123@gmail.com')
   cy.get('#subscribe').click()
   cy.get('.alert-success').should('be.visible')
})

Cypress.Commands.add('productQuantityInCart', () => {
   cy.get('.single-products').eq(0).should('be.visible')
   cy.get('a[href="/product_details/1"]').click()
   cy.get('#quantity').clear().type('4')
   cy.get(':nth-child(5) > .btn').should('be.visible').click()

   cy.get('button[data-dismiss="modal"]').should('be.visible').click()
   cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()

   cy.get('.table-responsive #cart_info_table tbody tr').should('have.length', 1)

   cy.get('#product-1').within(() => {
      cy.get('.cart_price p').should('contain.text', 'Rs. 500'); // Verify price
      cy.get('.cart_quantity button').should('contain.text', '4'); // Verify quantity
      cy.get('.cart_total p').should('contain.text', 'Rs. 2000'); // Verify total price
   })
})

Cypress.Commands.add('placedOrder', () => {
   const textoAleatorio = faker.lorem.sentence(80)

   cy.get('.col-sm-6 > .btn').should('be.visible').click()

   cy.get('#address_delivery').within(() => {
      cy.get('.address_firstname.address_lastname').should('contain.text', 'Mr. Uélitu Biruleibi')
      cy.get('.address_address1.address_address2').eq(0).should('contain.text', 'Freud S.a')
      cy.get('.address_address1.address_address2').eq(1).should('contain.text', 'Rua do cucumber')
      cy.get('.address_address1.address_address2').eq(2).should('contain.text', 'travessa das bananeiras')
      cy.get('.address_city.address_state_name.address_postcode').should('contain.text', 'Ganesha Kali\n\t\t\t\t\t\t\t\t40758952')
      cy.get('.address_country_name').should('contain.text', 'India')
      cy.get('.address_phone').should('contain.text', '+5571999999999')
   })

   cy.get('#address_invoice').within(() => {
      cy.get('.address_firstname.address_lastname').should('contain.text', 'Mr. Uélitu Biruleibi')
      cy.get('.address_address1.address_address2').eq(0).should('contain.text', 'Freud S.a')
      cy.get('.address_address1.address_address2').eq(1).should('contain.text', 'Rua do cucumber')
      cy.get('.address_address1.address_address2').eq(2).should('contain.text', 'travessa das bananeiras')
      cy.get('.address_city.address_state_name.address_postcode').should('contain.text', 'Ganesha Kali\n\t\t\t\t\t\t\t\t40758952')
      cy.get('.address_country_name').should('contain.text', 'India')
      cy.get('.address_phone').should('contain.text', '+5571999999999')
   })

   cy.get('.form-control').should('exist').type(textoAleatorio)
   cy.get(':nth-child(7) > .btn').should('be.visible').click()
   cy.get('[data-qa="name-on-card"]').type('Uélitu').should('have.value', 'Uélitu')
   cy.get('[data-qa="card-number"]').type('5467 3732 6228 4165').should('have.value', '5467 3732 6228 4165')
   cy.get('[data-qa="cvc"]').type('226')
   cy.get('[data-qa="expiry-month"]').type('04')
   cy.get('[data-qa="expiry-year"]').type('2025')

   cy.get('[data-qa="pay-button"]').click()

   cy.deleteAcc()
})

Cypress.Commands.add('verifyDelivery', () => {
   cy.get('.col-sm-6 > .btn').should('be.visible').click()

   cy.get('#address_delivery').within(() => {
      cy.get('.address_firstname.address_lastname').should('contain.text', 'Mr. Uélitu Biruleibi')
      cy.get('.address_address1.address_address2').eq(0).should('contain.text', 'Freud S.a')
      cy.get('.address_address1.address_address2').eq(1).should('contain.text', 'Rua do cucumber')
      cy.get('.address_address1.address_address2').eq(2).should('contain.text', 'travessa das bananeiras')
      cy.get('.address_city.address_state_name.address_postcode').should('contain.text', 'Ganesha Kali\n\t\t\t\t\t\t\t\t40758952')
      cy.get('.address_country_name').should('contain.text', 'India')
      cy.get('.address_phone').should('contain.text', '+5571999999999')
   })

   cy.get('#address_invoice').within(() => {
      cy.get('.address_firstname.address_lastname').should('contain.text', 'Mr. Uélitu Biruleibi')
      cy.get('.address_address1.address_address2').eq(0).should('contain.text', 'Freud S.a')
      cy.get('.address_address1.address_address2').eq(1).should('contain.text', 'Rua do cucumber')
      cy.get('.address_address1.address_address2').eq(2).should('contain.text', 'travessa das bananeiras')
      cy.get('.address_city.address_state_name.address_postcode').should('contain.text', 'Ganesha Kali\n\t\t\t\t\t\t\t\t40758952')
      cy.get('.address_country_name').should('contain.text', 'India')
      cy.get('.address_phone').should('contain.text', '+5571999999999')
   })
})


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })