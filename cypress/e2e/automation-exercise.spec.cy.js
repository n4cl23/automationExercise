///<reference types="cypress" />
import { faker } from '@faker-js/faker';


describe('Automation Exercise', () => {
   beforeEach(() => {
      cy.visit('https://automationexercise.com/')
      cy.title().should('be.equal', 'Automation Exercise')
   })
   it('Register User', () => {
      cy.verifyEmail()
   })

   it('Delete Account', () => {
      cy.verifyEmail()
      cy.deleteAccount()
   })

   it('Login user with correct email and passoword', () => {
      cy.verifyEmail()
      cy.loginValid()
   })

   it('Login User with incorrect email and password', () => {
      cy.loginIncorrect()
   })

   it('Logout User', () => {
      cy.verifyEmail()
      cy.loginValid()
      //get logout button, checked if visible and click
      cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible').click()
      //checked if returns home page
      cy.title().should('be.equal', 'Automation Exercise - Signup / Login')
   })

   it('Register User with existing email', () => {
      cy.verifyEmail()
      cy.registerExistingEmail()
   })

   it('Contact Us Form', () => {
      const textoAleatorio = faker.lorem.sentence()
      //Launch browser 
      cy.visit('https://automationexercise.com/')
      cy.title().should('be.equal', 'Automation Exercise')
      //Click and acess "Contact Us"
      cy.get('.shop-menu > .nav > :nth-child(8) > a').should('be.visible').click()
      cy.title().should('be.equal', 'Automation Exercise - Contact Us')
      //Fill Form
      cy.get('[data-qa="name"]').should('be.visible').type('userTest')
      cy.get('[data-qa="email"]').should('be.visible').type('usertestapus@gmail.com')
      cy.get('[data-qa="subject"]').should('be.visible').type(textoAleatorio)
      console.log(textoAleatorio)
      cy.get('[data-qa="message"]').should('be.visible').type(textoAleatorio)
      //insert image
      cy.get('input[name="upload_file"]').selectFile('cypress/downloads/imagemdeteste.jpg')
      //search button submit and click
      cy.get('[data-qa="submit-button"]').should('be.visible').click()
      //Alert
      cy.window().then((window) => {
         cy.stub(window, 'confirm').returns(true); //Simulate clicking "OK" on confirm
      })
      cy.get('.status').should('be.visible').contains('Success! Your details have been submitted successfully.')
   })

   it('Verify Test Cases Page', () => {
      //Launch browser 
      cy.visit('https://automationexercise.com/')
      cy.title().should('be.equal', 'Automation Exercise')
      //get and click "Test Cases"
      cy.get('.shop-menu > .nav > :nth-child(5) > a').should('be.visible').click()
      //Verify test cases page sucessfully
      cy.title().should('be.equal', 'Automation Practice Website for UI Testing - Test Cases')
   })

   it('Verify all products and product detail page', () => {
      //Launch browser 
      cy.visit('https://automationexercise.com/')
      cy.title().should('be.equal', 'Automation Exercise')
      //Get and click products menu
      cy.get('.shop-menu > .nav > :nth-child(2) > a').should('be.visible').click()
      cy.title().should('be.equal', 'Automation Exercise - All Products')
      //The product list is visible
      cy.get('.features_items').should('exist')
      //Verify numbers of products
      cy.get('.features_items .col-sm-4').its('length').then((quantidadeProdutos) => {
         cy.log('The quantity of products is: ' + quantidadeProdutos);
         cy.expect(quantidadeProdutos).to.be.equal(34)
      });
      //Get and click details first product
      cy.get('a[href="/product_details/1"]').should('be.visible').click()
      //Verify Url PDP
      cy.url().should('be.equal', 'https://automationexercise.com/product_details/1')
      //Product details
      cy.get('.product-information').should('exist')
      cy.get('.product-information img.newarrival').should('be.visible')
      cy.get('.product-information h2').should('contain', 'Blue Top')
      cy.get('.product-information p:contains("Category")').should('contain', 'Women > Tops')
      cy.get('.product-information img').should('have.attr', 'alt', 'ecommerce website products')
      cy.get('.product-information span').contains('Rs. 500')
      cy.get('.product-information input#quantity').should('be.visible')
      cy.get('.product-information button.cart').should('be.visible').and('contain', 'Add to cart')
      cy.get('.product-information p:contains("Availability")').should('contain', 'In Stock')
      cy.get('.product-information p:contains("Condition")').should('contain', 'New')
      cy.get('.product-information p:contains("Brand")').should('contain', 'Polo')
   })

   it('Search Product', () => {
      //Products menu
      cy.get('.shop-menu > .nav > :nth-child(2) > a').should('be.visible').click()
      //Verify url
      cy.title().should('be.equal', 'Automation Exercise - All Products')
      //get and type in the search for the product and click
      cy.get('#search_product').should('be.visible').type('Men Tshirt')
      cy.get('#submit_search').should('be.visible').click()
      //Verify text inside .col-sm-4
      cy.get('.features_items .col-sm-4').each(($product) => {
         cy.wrap($product).should('contain.text', 'Men Tshirt');
      });
   })

   it('Verify Subscription in home page', () => {
      cy.subscriptionVerify()
   })

   it('Verify Subscription in Cart page', () => {
      cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click();
      cy.get('footer').scrollIntoView();
      cy.get('h2').should('be.visible');
      cy.get('input#susbscribe_email').type('emailteste123@gmail.com').should('have.value', 'emailteste123@gmail.com');
      cy.get('#subscribe').click()
      cy.get('.alert-success').should('be.visible')
   })

   it('Add Products in Cart', () => {
      cy.get('.shop-menu > .nav > :nth-child(2) > a').should('be.visible').click()

      cy.get('.single-products').eq(0).trigger('mouseover')
      cy.get('.single-products').eq(0).find('.overlay-content').should('be.visible')
      cy.get('a[data-product-id="1"]').eq(1).should('exist').click({ force: true })
      cy.get('button[data-dismiss="modal"]').should('contain', 'Continue Shopping').click()

      cy.get('.single-products').eq(1).trigger('mouseover')
      cy.get('.single-products').eq(1).find('.overlay-content').should('be.visible')
      cy.get('a[data-product-id="2"]').eq(1).should('exist').click({ force: true })
      cy.get('button[data-dismiss="modal"]').should('contain', 'Continue Shopping').click()

      cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()
      cy.get('.table-responsive').should('be.visible')
      cy.get('.table-responsive #cart_info_table tbody tr').should('have.length', 2)

      cy.get('#product-1').within(() => {
         cy.get('.cart_price p').should('contain.text', 'Rs. 500'); // Verify price
         cy.get('.cart_quantity button').should('contain.text', '1'); // Verify quantity
         cy.get('.cart_total p').should('contain.text', 'Rs. 500'); // Verify total price
      })
      cy.get('#product-2').within(() => {
         cy.get('.cart_price p').should('contain.text', 'Rs. 400'); // Verify price
         cy.get('.cart_quantity button').should('contain.text', '1'); // Verify quantity
         cy.get('.cart_total p').should('contain.text', 'Rs. 400'); // Verify total price
      })

   })

   it('Verify Product quantity in Cart', () => {
      cy.productQuantityInCart()
   })

   it('Place Order: Register while Checkout', () => {
      const textoAleatorio = faker.lorem.sentence(80)

      cy.productQuantityInCart()
      cy.get('.col-sm-6 > .btn').should('be.visible').click()
      cy.get('button[data-dismiss="modal"]').should('be.visible')
      cy.get('a[href="/login"]').should('exist').eq(1).click()

      cy.verifyEmail()
      cy.loginValid()

      cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()

      cy.get('#product-1').within(() => {
         cy.get('.cart_price p').should('contain.text', 'Rs. 500'); // Verify price
         cy.get('.cart_quantity button').should('contain.text', '4'); // Verify quantity
         cy.get('.cart_total p').should('contain.text', 'Rs. 2000'); // Verify total price
      })
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

   it('Place Order: Register before Checkout', () => {
      cy.verifyEmail()
      cy.loginValid()
      cy.productQuantityInCart()
      cy.placedOrder()
   })

   it('Place Order: Login before Checkout', () => {
      cy.verifyEmail()
      cy.loginValid()
      cy.productQuantityInCart()
      cy.placedOrder()
   })

   it('Remove Products From Cart', () => {
      cy.productQuantityInCart()
      cy.get('.cart_quantity_delete').should('be.visible').click()
      cy.get('#empty_cart > .text-center').should('contain.text', 'Cart is empty!')
   })

   it('View Category Products', () => {
      cy.get('.left-sidebar').should('be.visible')
      cy.get('a[href="#Women"]').should('be.visible').click()
      cy.get('a[href="/category_products/1"]').should('be.visible').click()
      cy.get('.title').should('be.visible').and('contain.text', 'Women - Dress Products')
      cy.get('.panel-title').should('be.visible')
      cy.get('a[href="#Men"]').click()
      cy.title('be.equal', 'Automation Exercise - Tshirts Products')
   })

   it('View & Cart Brand Products', () => {
      cy.get('a[href="/products"]').should('be.visible').click()
      cy.get('.brands-name > ul.nav.nav-pills.nav-stacked').find('li').its('length').then((quantidadeProdutos) => {
         cy.log('The quantity of products is: ' + quantidadeProdutos)
         cy.wrap(quantidadeProdutos).should('eq', 8);
      });
      cy.get('.brands-name > .nav > :nth-child(3) > a').should('be.visible').click()
      cy.get('.title').should('contains.text', 'Brand - Madame Products')
      cy.title('be.equal', 'Automation Exercise - Madame Products')
   })

   it('Search Products and Verify Cart After Login', () => {
      cy.verifyEmail()
      cy.get('a[href="/products"]').should('be.visible').click()
      cy.get('#search_product').should('be.visible').type('Blue Top')
      cy.get('#submit_search').should('be.visible').click()
      cy.get('.features_items > .col-sm-4').its('length').then((quantidadeItens) => {
         cy.log('The quantity of items is: ' + quantidadeItens);
         cy.wrap(quantidadeItens).should('eq', 1);
      });
      cy.get('.productinfo > .btn').should('be.visible').click()
      cy.get('.modal-footer > .btn').click()
      cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()
      cy.get('.cart_info tbody tr').its('length').then((quantidadeItens) => {
         cy.log('The quantity of items is: ' + quantidadeItens);
         cy.wrap(quantidadeItens).should('eq', 1);
      });
      cy.get(':nth-child(4) > a').should('be.visible').click()
      cy.loginValid()
      cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()
      cy.get('.cart_info tbody tr').its('length').then((quantidadeItens) => {
         cy.log('The quantity of items is: ' + quantidadeItens);
         cy.wrap(quantidadeItens).should('eq', 1);
      });
   })

   it('Add review on product', () => {
      const textoAleatorio = faker.lorem.sentence(30)

      cy.get('.shop-menu > .nav > :nth-child(2) > a').should('be.visible').click()
      cy.title('be.equal', 'Automation Exercise - All Products')
      cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').should('be.visible').click()
      cy.get('.active > a').should('contain.text', 'Write Your Review')
      cy.get('#name').should('be.visible').type('Uélitu')
      cy.get('#email').should('be.visible').type('emailteste123@gmail.com')
      cy.get('#review').should('be.visible').type(textoAleatorio)
      cy.get('#button-review').should('be.visible').click()
      cy.get('.col-md-12 > .alert-success').should('be.visible')
   })

   it('Add to cart from Recommended items', () => {
      cy.get('.recommended_items').should('be.visible')
      cy.get('.carousel-inner .item.active').eq(1).first().find('.add-to-cart').eq(0).click();
      cy.get('.modal-footer > .btn').should('be.visible').click()
      cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()
      cy.get('.table-responsive.cart_info').within(() => {
         cy.get('#cart_info_table').within(() => {
            cy.get('.cart_menu').should('exist');
            cy.get('#product-4').within(() => {
               cy.get('.product_image').should('be.visible')
               cy.get('.cart_description').should('contain.text', 'Women > Dress')
               cy.get('.cart_price').should('contain.text', 'Rs. 1500')
               cy.get('.cart_quantity').should('contain.text', '1')
               cy.get('.cart_total').should('contain.text', 'Rs. 1500')
            });
         });
      });


   })

   it('Verify address details in checkout page', () => {
      cy.verifyEmail()
      cy.loginValid()
      cy.productQuantityInCart()
      cy.verifyDelivery()
      cy.get('.nav > :nth-child(5)').should('be.visible').click()
      cy.get('.col-sm-9').should('contain', 'Account Deleted!')
   })

   it('Download Invoice after purchase order', () => {
      const textoAleatorio = faker.lorem.sentence(30)
      cy.productQuantityInCart()
      cy.verifyEmail()
      cy.loginValid()
      cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()
      cy.verifyDelivery()
      cy.get('.form-control').should('exist').type(textoAleatorio)
      cy.get(':nth-child(7) > .btn').should('be.visible').click()
      cy.get('[data-qa="name-on-card"]').type('Uélitu').should('have.value', 'Uélitu')
      cy.get('[data-qa="card-number"]').type('5467 3732 6228 4165').should('have.value', '5467 3732 6228 4165')
      cy.get('[data-qa="cvc"]').type('226')
      cy.get('[data-qa="expiry-month"]').type('04')
      cy.get('[data-qa="expiry-year"]').type('2025')
      cy.get('[data-qa="pay-button"]').click()
      cy.get('.col-sm-9 > .btn-default').should('be.visible').click()
      cy.deleteAcc()
   })

   it('Verify Scroll Up using Arrow button and Scroll Down functionality', () => {
      cy.get('.single-widget').should('be.visible').type('{downarrow}')
      cy.get('#scrollUp').should('exist').and('be.visible').click()
      cy.get('#slider-carousel > .carousel-inner').should('contain', 'Full-Fledged practice website for Automation Engineers')
   })

   it('Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
      cy.scrollTo('bottom')
      cy.get('.single-widget').should('be.visible')
      cy.get('#scrollUp').should('exist').and('be.visible').click()
      cy.get('#slider-carousel > .carousel-inner').should('contain', 'Full-Fledged practice website for Automation Engineers')
   })
})