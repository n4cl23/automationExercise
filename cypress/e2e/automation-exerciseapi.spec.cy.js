import { expect } from "chai";

describe('Automation Exercise API', () => {

    it.only('Get All Products List', () => {
        const apiUrl = 'https://automationexercise.com/api/productsList';

        cy.request({
            method: 'GET',
            url: apiUrl
        }).then((response) => {
            // Verificar se a solicitação foi bem-sucedida
            expect(response.status).to.equal(200);
        
            // Acessar o conteúdo JSON "All products list"
            const productList = response.body;
        
            // Fazer algo com a lista de produtos, por exemplo, imprimir no console
            console.log(productList);
        });
    });
});