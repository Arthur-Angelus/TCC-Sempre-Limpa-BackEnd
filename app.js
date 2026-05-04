/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API de delivery de roupas a lavanderia
 * Data: 30/04/2026
 * Autor: Arthur Angelus
 * Versão: 1.1
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const PORT = process.PORT || 5000

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

app.listen(PORT, function () {
    console.log('API aguardando requisições....')
})