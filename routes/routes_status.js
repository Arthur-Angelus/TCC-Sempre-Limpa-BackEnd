/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela status_pedido
 * Data: 11/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerStatus = require('../controller/controller_status.js')

//ENDPOINT - STATUS

// GET ALL STATUS
router.get('/v1/semprelimpa/status', cors(), async function (request, response) {
    let Status = await controllerStatus.listarStatus()

    response.status(Status.status_code)
    response.json(Status)
})
// GET STATUS BY ID
router.get('/v1/semprelimpa/status/:id', cors(), async function (request, response) {
    let status_id = request.params.id

    let Status = await controllerStatus.buscarStatusID(status_id)

    response.status(Status.status_code)
    response.json(Status)
})
module.exports = router