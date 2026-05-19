/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela ordem pagamento
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerOrdemPagamento = require('../controller/controller_ordemPagamento.js')

//ENDPOINT - ORDEM PAGAMENTO

// GET ALL ORDEM PAGAMENTO
router.get('/v1/semprelimpa/ordempagamento', cors(), async function (request, response) {
    let ordemPagamento = await controllerOrdemPagamento.listarOrdemPagamento()

    response.status(ordemPagamento.status_code)
    response.json(ordemPagamento)
})
// GET ORDEM PAGAMENTO BY ID
router.get('/v1/semprelimpa/ordempagamento/:id', cors(), async function (request, response) {
    let ordem_pagamento_id = request.params.id

    let ordemPagamento = await controllerOrdemPagamento.buscarOrdemPagamentoID(ordem_pagamento_id)

    response.status(ordemPagamento.status_code)
    response.json(ordemPagamento)
})
// POST ORDEM PAGAMENTO
router.post('/v1/semprelimpa/ordempagamento', cors(), bodyParserJSON, async function(request, response){
    let ordemPagamento_data = request.body

    let contentType = request.headers['content-type']

    let ordemPagamento = await controllerOrdemPagamento.inserirOrdemPagamento(ordemPagamento_data, contentType)

    response.status(ordemPagamento.status_code)
    response.json(ordemPagamento)
})
// PUT ORDEM PAGAMENTO
router.put('/v1/semprelimpa/ordempagamento/:id', cors(), bodyParserJSON, async function(request, response){
    let ordem_pagamento_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let ordemPagamento = await controllerOrdemPagamento.atualizarOrdemPagamento(dadosBody, ordem_pagamento_id, contentType)

    response.status(ordemPagamento.status_code)
    response.json(ordemPagamento)
})
// DELETE ORDEM PAGAMENTO
router.delete('/v1/semprelimpa/ordempagamento/:id', cors(), async function(request, response){
    let ordem_pagamento_id = request.params.id

    let ordemPagamento = await controllerOrdemPagamento.excluirOrdemPagamento(ordem_pagamento_id)

    response.status(ordemPagamento.status_code)
    response.json(ordemPagamento)
})

module.exports = router