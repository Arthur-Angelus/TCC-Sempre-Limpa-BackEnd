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

require('dotenv').config()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    next()
})

//import das rotas
const usuarioRoutes = require('./routes/routes_usuario.js')
const enderecoRoutes = require('./routes/routes_endereco.js')
const enderecoLavanderiaRoutes = require('./routes/routes_enderecoLavanderia.js')
const statusroutes = require('./routes/routes_status.js')
const avaliacaoroutes = require('./routes/routes_avaliacao.js')
const cesto_rouparoutes = require('./routes/routes_cesto_roupa.js')
const lavanderiaroutes = require('./routes/routes_lavanderia.js')
const rouparoutes = require('./routes/routes_roupa.js')
const cartao_usuarioroutes = require('./routes/routes_cartao_usuario.js')
const ordem_pagamentoroutes = require('./routes/routes_ordem_pagamento.js')

app.use(usuarioRoutes)
app.use(enderecoRoutes)
app.use(enderecoLavanderiaRoutes)
app.use(statusroutes)
app.use(avaliacaoroutes)
app.use(cesto_rouparoutes)
app.use(lavanderiaroutes)
app.use(rouparoutes)
app.use(cartao_usuarioroutes)
app.use(ordem_pagamentoroutes)

//rotas motorista
const dados_bancariosroutes = require('./routes/motorista/routes_dados_bancarios.js')
const dados_veiculoroutes = require('./routes/motorista/routes_dados_veiculo.js')

app.use(dados_bancariosroutes)
app.use(dados_veiculoroutes)

app.listen(PORT, function () {
    console.log('API aguardando requisições....')
})