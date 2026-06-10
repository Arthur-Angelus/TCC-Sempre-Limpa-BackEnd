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
router.get('/pedido', cors(), async function (request, response) {
    let pedido = await controllerPedido.listarPedido()

    response.status(pedido.status_code)
    response.json(pedido)
})
// GET PEDIDO BY ID
router.get('/pedido/:id', cors(), async function (request, response) {
    let pedido_id = request.params.id

    let pedido = await controllerPedido.buscarPedidoID(pedido_id)

    response.status(pedido.status_code)
    response.json(pedido)
})
// GET PEDIDO BY USER ID
router.get('/pedidousuario/:id', cors(), async function (request, response) {
    let usuario_id = request.params.id

    let pedidoUsuario = await controllerPedido.buscarPedidoUsuarioID(usuario_id)

    response.status(pedidoUsuario.status_code)
    response.json(pedidoUsuario)
})

// GET PEDIDO BY USER ID
router.get('/pedidomotorista/:id', cors(), async function (request, response) {
    let motorista_id = request.params.id

    let pedidoMotorista = await controllerPedido.buscarPedidoMotoristaID(motorista_id)

    response.status(pedidoMotorista.status_code)
    response.json(pedidoMotorista)
})

// POST PEDIDO
router.post('/pedido', cors(), bodyParserJSON, async function(request, response){
    let pedido_data = request.body

    let contentType = request.headers['content-type']

    let pedido = await controllerPedido.inserirPedido(pedido_data, contentType)

    response.status(pedido.status_code)
    response.json(pedido)
})
// PUT PEDIDO
router.put('/pedido/:id', cors(), bodyParserJSON, async function(request, response){
    let pedido_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let pedido = await controllerPedido.atualizarPedido(dadosBody, pedido_id, contentType)

    response.status(pedido.status_code)
    response.json(pedido)
})
// DELETE PEDIDO
router.delete('/pedido/:id', cors(), async function(request, response){
    let pedido_id = request.params.id

    let pedido = await controllerPedido.excluirPedido(pedido_id)

    response.status(pedido.status_code)
    response.json(pedido)
})

router.post('/pedido-completo', async (request, response) => {
    
    // Captura o tipo de conteúdo (application/json)
    const contentType = request.headers['content-type'];
    
    // Captura o JSON enviado pelo Front-end ou pelo Insomnia
    const dadosPedidoCompleto = request.body;

    // Chama a função maestrina no Controller
    const resultado = await controllerPedido.criarPedidoCompleto(dadosPedidoCompleto, contentType);

    // Retorna para o cliente com o status code formatado nas suas MESSAGES
    response.status(resultado.status_code).json(resultado);
});

module.exports = router