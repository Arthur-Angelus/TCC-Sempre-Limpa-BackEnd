/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API de delivery de roupas a lavanderia
 * Data: 30/04/2026
 * Autor: Arthur Angelus
 * Versão: 1.1
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const bodyParserJSON = bodyParser.json()

app.use(cors())

app.use(bodyParserJSON)

const PORT = process.env.PORT || 5000

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    next()
})

//import das rotas
const usuarioRoutes = require('./routes/routes_usuario.js')
const enderecoRoutes = require('./routes/routes_endereco.js')

app.use(usuarioRoutes)
app.use(enderecoRoutes)

app.listen(PORT, function () {
    console.log('API aguardando requisições....')
})