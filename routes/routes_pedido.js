/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela pedido
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerPedido = require('../controller/controller_pedido.js')

//ENDPOINT - PEDIDO

// GET ALL PEDIDO
router.get('/v1/semprelimpa/pedido', cors(), async function (request, response) {
    let pedido = await controllerPedido.listarPedido()

    response.status(pedido.status_code)
    response.json(pedido)
})
// GET PEDIDO BY ID
router.get('/v1/semprelimpa/pedido/:id', cors(), async function (request, response) {
    let pedido_id = request.params.id

    let pedido = await controllerPedido.buscarPedidoID(pedido_id)

    response.status(pedido.status_code)
    response.json(pedido)
})
// POST PEDIDO
router.post('/v1/semprelimpa/pedido', cors(), bodyParserJSON, async function(request, response){
    let pedido_data = request.body

    let contentType = request.headers['content-type']

    let pedido = await controllerPedido.inserirPedido(pedido_data, contentType)

    response.status(pedido.status_code)
    response.json(pedido)
})
// PUT PEDIDO
router.put('/v1/sempreLimpa/pedido/:id', cors(), bodyParserJSON, async function(request, response){
    let pedido_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let pedido = await controllerPedido.atualizarPedido(dadosBody, pedido_id, contentType)

    response.status(pedido.status_code)
    response.json(pedido)
})


module.exports = router