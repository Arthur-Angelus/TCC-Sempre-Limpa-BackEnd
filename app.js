/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API de delivery de roupas a lavanderia
 * Data: 30/04/2026
 * Autor: Arthur Angelus
 * Versão: 1.1
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()

const bodyParserJSON = bodyParser.json()

app.use(cors())

app.use(bodyParserJSON)

const PORT = process.env.PORT || 5000

require('dotenv').config()

app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

app.use((request,  response,  next) => {
    response.header('Access-Control-Allow-Origin',  '*')
    response.header('Access-Control-Allow-Methods',  'GET,  POST,  PUT,  DELETE,  OPTIONS')

    next()
})

//import das rotas
const avaliacaoRoutes = require('./routes/routes_avaliacao.js')
const cartao_usuarioRoutes = require('./routes/routes_cartao_usuario.js')
const cartaoRoutes = require('./routes/routes_cartao.js')
const cesto_roupaRoutes = require('./routes/routes_cesto_roupa.js')
const cestoRoutes = require('./routes/routes_cesto.js')
const enderecoRoutes = require('./routes/routes_endereco.js')
const enderecoLavanderiaRoutes = require('./routes/routes_enderecoLavanderia.js')
const lavanderiaRoutes = require('./routes/routes_lavanderia.js')
const ordem_pagamentoRoutes = require('./routes/routes_ordem_pagamento.js')
const ordempagamentoRoutes = require('./routes/routes_ordemPagamento.js')
const pagamentoCartaoRoutes = require('./routes/routes_pagamentoCartao.js')
const pedidoRoutes = require('./routes/routes_pedido.js')
const pixRoutes = require('./routes/routes_pix.js')
const roupaRoutes = require('./routes/routes_roupa.js')
const statusRoutes = require('./routes/routes_status.js')
const usuarioRoutes = require('./routes/routes_usuario.js')

app.use('/v1/semprelimpa', usuarioRoutes)
app.use('/v1/semprelimpa', enderecoRoutes)
app.use('/v1/semprelimpa', enderecoLavanderiaRoutes)
app.use('/v1/semprelimpa', statusRoutes)
app.use('/v1/semprelimpa', avaliacaoRoutes)
app.use('/v1/semprelimpa', cesto_roupaRoutes)
app.use('/v1/semprelimpa', lavanderiaRoutes)
app.use('/v1/semprelimpa', roupaRoutes)
app.use('/v1/semprelimpa', cartao_usuarioRoutes)
app.use('/v1/semprelimpa', ordem_pagamentoRoutes)
app.use('/v1/semprelimpa', cartaoRoutes)
app.use('/v1/semprelimpa', cestoRoutes)
app.use('/v1/semprelimpa', ordempagamentoRoutes)
app.use('/v1/semprelimpa', pagamentoCartaoRoutes)
app.use('/v1/semprelimpa', pedidoRoutes)
app.use('/v1/semprelimpa', pixRoutes)

//rotas motorista
const dados_bancariosRoutes = require('./routes/motorista/routes_dados_bancarios.js')
const dados_veiculoRoutes = require('./routes/motorista/routes_dados_veiculo.js')
const veiculoRoutes = require('./routes/motorista/routes_veiculo.js')
const motoristaRoutes = require('./routes/motorista/routes_motorista.js')
const avaliacao_motoristaRoutes = require('./routes/motorista/routes_avaliacao_motorista.js')
const enderecoMotoristaRoutes = require('./routes/motorista/routes_enderecoMotorista.js')
const extratoRoutes = require('./routes/motorista/routes_extrato.js')


app.use('/v1/semprelimpa', dados_bancariosRoutes)
app.use('/v1/semprelimpa', dados_veiculoRoutes)
app.use('/v1/semprelimpa', veiculoRoutes)
app.use('/v1/semprelimpa', motoristaRoutes)
app.use('/v1/semprelimpa', avaliacao_motoristaRoutes)
app.use('/v1/semprelimpa', enderecoMotoristaRoutes)
app.use('/v1/semprelimpa', extratoRoutes)


app.listen(PORT,  function () {
    console.log('API aguardando requisições....')
})