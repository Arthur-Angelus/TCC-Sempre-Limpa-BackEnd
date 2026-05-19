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
router.get('/v1/semprelimpa/pagamento-cartao', cors(), async function (request, response) {
    let PagamentoCartao = await controllerPagamentoCartao.listarPagamentoCartao()

    response.status(PagamentoCartao.status_code)
    response.json(PagamentoCartao)
})

module.exports = router