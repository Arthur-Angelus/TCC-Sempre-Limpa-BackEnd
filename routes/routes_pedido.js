/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela pedido
 * Data de Criação: 18/05/2026
 * Autores: Kauan Lopes Pereira, Arthur Angelus
 * Versão: 2.0
 * implementando buscar pedido pelo id do usuario
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
// GET PEDIDO BY USER ID
router.get('/v1/semprelimpa/pedidousuario/:id', cors(), async function (request, response) {
    let usuario_id = request.params.id

    let pedidoUsuario = await controllerPedido.buscarPedidoUsuarioID(usuario_id)

    response.status(pedidoUsuario.status_code)
    response.json(pedidoUsuario)
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
// DELETE PEDIDO
router.delete('/v1/sempreLimpa/pedido/:id', cors(), async function(request, response){
    let pedido_id = request.params.id

    let pedido = await controllerPedido.excluirPedido(pedido_id)

    response.status(pedido.status_code)
    response.json(pedido)
})

module.exports = router