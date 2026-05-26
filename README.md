# API da aplicação SempreLimpa
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Navegação
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Executando o Projeto](#executando-o-projeto)
- [Autores](#autores)

## Sobre o Projeto
Este projeto é uma API backend desenvolvida com a finalidade de ser utilizada na aplicação do site/app SempreLimpa que serve como app de delivery de roupas sujas conectando cliente com motorista e com lavanderias de auto-atendimento

## Tecnologias Utilizadas
- **Node.js**
- **Express**
- **Postman**
- **Nodemailer**
- **JWT Web Token/JsonWebToken**
- **Bcryptjs**
- **Cors**
- **Dotenv**
- **Knex**

## Estrutura do Projeto
O código do projeto está localizado dentro das pastas `modulo`, `model/DAO`, `controller`, `routes`, `Middleware` e `Services`.
- A pasta model/DAO armazena todos os cruds utilizando knex para fazer a conexão com o banco para cada tabela utilizada na aplicação, a pasta controller possui todas as controllers e validações de cada função da model, a pasta routes define todas as rotas que serão usadas para cada endpoint utilizando express e cors, a pasta middleware possui a função para validação dos JWT Web Tokens e a pasta services possui a função que enviara um email para um usuario em funções como esqueci minha senha.

## Executando o Projeto

### Pré-requisitos
- **Node.js**
- **NPM** (gerenciador de pacotes do Node.js)
- **Postman** (ou outra ferramenta para testes de API)
- **Nodemailer** (responsavel pelo envio de emails reais como no gmail)
- **JWT Web Token/JsonWebToken** (criandor de tokens temporarios que expiram em determinado tempo)
- **Bcryptjs** (criptografador de senha)
- **Express** (ferramenta para definição de endpoints, segurança e lida com trafego de internet)
- **Cors** (ferramenta de segurança que define quais sites ou dominios tem permissão para acessar os recursos do servidor)
- **Dotenv** (definira senhas super secretas que serão utilizadas no jwt web token e nodemailer)
- **Knex** (ferramenta para conexão com banco de dados que permite fazer CRUD's como selects e inserts)

### Passos
1. Clone esse repositório:
```bash
git clone https://github.com/Arthur-Angelus/TCC-Sempre-Limpa-BackEnd.git
```
2. No terminal, rode na raiz do projeto:
```bash
npm install
```
3. Após instalar as dependências do projeto, rode no terminal:
```bash
node server.js
```
4. Abra o Postman e teste os endpoints.

## Autores
[Arthur Angelus Andrade de Almeida](<https://www.linkedin.com/in/arthur-angelus-6b1906366/>)
[Wesley Santos](https://www.linkedin.com/in/wesleisantosprofile/)
[Guilherme Viana](https://www.linkedin.com/in/guilherme-viana-souza/)
[Kauan Lopes](https://www.linkedin.com/in/kauan-lopes-pereira-91b5a022a/)