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
    let Pedido = await controllerPedido.listarPedido()

    response.status(Pedido.status_code)
    response.json(Pedido)
})


module.exports = router