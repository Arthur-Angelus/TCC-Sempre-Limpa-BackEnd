/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do ordem pagamento
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerOrdemPagamento = require('../controller/controller_ordem_pagamento.js')

//endpoints para a rota de genero
router.get('/ordem_pagamentos', cors(), async function (request, response) {
    let ordem_pagamento = await controllerOrdemPagamento.listarOrdemPagamentos()

    response.status(ordem_pagamento.status_code)
    response.json(ordem_pagamento)
})

router.get('/ordem_pagamento/:id', cors(), async function (request, response) {
    let ordem_pagamento_id = request.params.id

    let ordem_pagamento = await controllerOrdemPagamento.buscarOrdemPagamentoID(ordem_pagamento_id)

    response.status(ordem_pagamento.status_code)
    response.json(ordem_pagamento)
})

router.post('/ordem_pagamento', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let ordem_pagamento = await controllerOrdemPagamento.inserirOrdemPagamentos(dadosBody, contentType)

    response.status(ordem_pagamento.status_code)
    response.json(ordem_pagamento)
})

router.put('/ordem_pagamento/:id', cors(), bodyParserJSON, async function(request, response){
    let ordem_pagamento_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let ordem_pagamento = await controllerOrdemPagamento.atualizarOrdemPagamento(dadosBody, ordem_pagamento_id, contentType)

    response.status(ordem_pagamento.status_code)
    response.json(ordem_pagamento)
})

router.delete('/ordem_pagamento/:id', cors(), async function(request, response){
    let ordem_pagamento_id = request.params.id

    let ordem_pagamento = await controllerOrdemPagamento.excluirOrdemPagamento(ordem_pagamento_id)

    response.status(ordem_pagamento.status_code)
    response.json(ordem_pagamento)
})

module.exports = router