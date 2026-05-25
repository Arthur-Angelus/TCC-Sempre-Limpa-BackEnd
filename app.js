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

app.use((request,  response,  next) => {
    response.header('Access-Control-Allow-Origin',  '*')
    response.header('Access-Control-Allow-Methods',  'GET,  POST,  PUT,  DELETE,  OPTIONS')

    next()
})

//import das rotas
const avaliacaoroutes = require('./routes/routes_avaliacao.js')
const cartao_usuarioroutes = require('./routes/routes_cartao_usuario.js')
const cartaoroutes = require('./routes/routes_cartao.js')
const cesto_rouparoutes = require('./routes/routes_cesto_roupa.js')
const cestoroutes = require('./routes/routes_cesto.js')
const enderecoRoutes = require('./routes/routes_endereco.js')
const enderecoLavanderiaRoutes = require('./routes/routes_enderecoLavanderia.js')
const lavanderiaroutes = require('./routes/routes_lavanderia.js')
const ordem_pagamentoroutes = require('./routes/routes_ordem_pagamento.js')
const ordempagamentoroutes = require('./routes/routes_ordemPagamento.js')
const pagamentoCartaoroutes = require('./routes/routes_pagamentoCartao.js')
const pedidoroutes = require('./routes/routes_pedido.js')
const pixroutes = require('./routes/routes_pix.js')
const rouparoutes = require('./routes/routes_roupa.js')
const statusroutes = require('./routes/routes_status.js')
const usuarioRoutes = require('./routes/routes_usuario.js')

app.use('/v1/semprelimpa', usuarioRoutes)
app.use('/v1/semprelimpa', enderecoRoutes)
app.use('/v1/semprelimpa', enderecoLavanderiaRoutes)
app.use('/v1/semprelimpa', statusroutes)
app.use('/v1/semprelimpa', avaliacaoroutes)
app.use('/v1/semprelimpa', cesto_rouparoutes)
app.use('/v1/semprelimpa', lavanderiaroutes)
app.use('/v1/semprelimpa', rouparoutes)
app.use('/v1/semprelimpa', cartao_usuarioroutes)
app.use('/v1/semprelimpa', ordem_pagamentoroutes)
app.use('/v1/semprelimpa', cartaoroutes)
app.use('/v1/semprelimpa', cestoroutes)
app.use('/v1/semprelimpa', ordempagamentoroutes)
app.use('/v1/semprelimpa', pagamentoCartaoroutes)
app.use('/v1/semprelimpa', pedidoroutes)
app.use('/v1/semprelimpa', pixroutes)

//rotas motorista
const dados_bancariosroutes = require('./routes/motorista/routes_dados_bancarios.js')
const dados_veiculoroutes = require('./routes/motorista/routes_dados_veiculo.js')
const veiculoroutes = require('./routes/motorista/routes_veiculo.js')
const motoristaroutes = require('./routes/motorista/routes_motorista.js')
const avaliacao_motoristaroutes = require('./routes/motorista/routes_avaliacao_motorista.js')
const enderecoMotoristaRoutes = require('./routes/motorista/routes_enderecoMotorista.js')


app.use('/v1/semprelimpa', dados_bancariosroutes)
app.use('/v1/semprelimpa', dados_veiculoroutes)
app.use('/v1/semprelimpa', veiculoroutes)
app.use('/v1/semprelimpa', motoristaroutes)
app.use('/v1/semprelimpa', avaliacao_motoristaroutes)
app.use('/v1/semprelimpa', enderecoMotoristaRoutes)


app.listen(PORT,  function () {
    console.log('API aguardando requisições....')
})