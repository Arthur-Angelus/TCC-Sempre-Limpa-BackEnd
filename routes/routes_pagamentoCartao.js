/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela pagamento cartão
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerPagamentoCartao = require('../controller/controller_pagamentoCartao.js')

//ENDPOINT - PAGAMENTO CARTAO

// GET ALL PAGAMENTO CARTAO
router.get('/pagamento-cartao', cors(), async function (request, response) {
    let PagamentoCartao = await controllerPagamentoCartao.listarPagamentoCartao()

    response.status(PagamentoCartao.status_code)
    response.json(PagamentoCartao)
})
// GET PAGAMENTO CARTAO BY ID
router.get('/pagamento-cartao/:id', cors(), async function (request, response) {
    let pagamento_cartao_id = request.params.id

    let PagamentoCartao = await controllerPagamentoCartao.buscarPagamentoCartaoID(pagamento_cartao_id)

    response.status(PagamentoCartao.status_code)
    response.json(PagamentoCartao)
})
// POST PAGAMENTO CARTAO
router.post('/pagamento-cartao', cors(), bodyParserJSON, async function(request, response){
    let PagamentoCartao_data = request.body

    let contentType = request.headers['content-type']

    let PagamentoCartao = await controllerPagamentoCartao.inserirPagamentoCartao(PagamentoCartao_data, contentType)

    response.status(PagamentoCartao.status_code)
    response.json(PagamentoCartao)
})
// PUT PAGAMENTO CARTAO
router.put('/pagamento-cartao/:id', cors(), bodyParserJSON, async function(request, response){
    let pagamento_cartao_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let PagamentoCartao = await controllerPagamentoCartao.atualizarPagamentoCartao(dadosBody, pagamento_cartao_id, contentType)

    response.status(PagamentoCartao.status_code)
    response.json(PagamentoCartao)
})
// DELETE PAGAMENTO CARTAO
router.delete('/pagamento-cartao/:id', cors(), async function(request, response){
    let pagamento_cartao_id = request.params.id

    let PagamentoCartao = await controllerPagamentoCartao.excluirPagamentoCartao(pagamento_cartao_id)

    response.status(PagamentoCartao.status_code)
    response.json(PagamentoCartao)
})

module.exports = router