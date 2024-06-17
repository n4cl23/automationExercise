# AutomationExercise Test Automation

Este repositório contém testes automatizados para o site [Automation Exercise](https://automationexercise.com/) utilizando Cypress e Faker.js.

## Funcionalidades Principais

- Testes de automação para diversas funcionalidades do site Automation Exercise.
- Geração de dados de teste utilizando Faker.js para criar dados realistas e aleatórios.

## Pré-requisitos

- Node.js (versão 12 ou superior)
- npm (geralmente incluído com o Node.js)

## Instalação

1. Clone o repositório do GitHub:
    ```sh
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd nome-do-repositorio
    ```

3. Instale as dependências do projeto:
    ```sh
    npm install
    ```

## Cypress

[Cypress](https://www.cypress.io/) é uma ferramenta de teste de ponta a ponta para a web. Ele facilita a escrita e a execução de testes automatizados para aplicações web.

### Instalação do Cypress

O Cypress já deve estar incluído no arquivo `package.json` do projeto. Após executar `npm install`, ele deve ser instalado automaticamente. Para instalar manualmente, use o seguinte comando:

```sh
npm install cypress --save-dev
Executando Cypress
Para abrir a interface gráfica do Cypress e executar os testes, use o comando:

sh
Copiar código
npx cypress open
Para executar os testes em modo headless (sem interface gráfica), use o comando:

sh
Copiar código
npx cypress run
Faker.js
Faker.js é uma biblioteca para gerar dados falsos para uso em desenvolvimento e testes.


Este arquivo README.md fornece uma visão geral do projeto, instruções de instalação e uso do Cypress e Faker.js, bem como informações sobre como clonar o repositório e contribuir para o projeto. Certifique-se de ajustar os links e comandos conforme necessário para refletir seu repositório e necessidades específicas.


Instalação do Faker.js
O Faker.js já deve estar incluído no arquivo package.json do projeto. Após executar npm install, ele deve ser instalado automaticamente. Para instalar manualmente, use o seguinte comando:

sh
Copiar código
npm install faker --save-dev
Utilização do Faker.js
Exemplo de como usar o Faker.js em um teste Cypress:

javascript
Copiar código
const faker = require('faker');

describe('Exemplo de Teste com Faker.js', () => {
    it('Deve preencher um formulário com dados falsos', () => {
        const nomeFalso = faker.name.findName();
        const emailFalso = faker.internet.email();

        cy.visit('https://automationexercise.com/contact_us');
        cy.get('input[name="name"]').type(nomeFalso);
        cy.get('input[name="email"]').type(emailFalso);
        // Continue preenchendo o formulário
    });
});
Executando os Testes
Para executar os testes automatizados, siga os passos abaixo:

Abra o Cypress:

sh
Copiar código
npx cypress open
Execute os testes a partir da interface gráfica do Cypress.

Ou, para executar todos os testes em modo headless:

sh
Copiar código
npx cypress run
