/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela status_pedido
 * Data de Criação: 11/05/2026
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
router.get('/status', cors(), async function (request, response) {
    let Status = await controllerStatus.listarStatus()

    response.status(Status.status_code)
    response.json(Status)
})
// GET STATUS BY ID
router.get('/status/:id', cors(), async function (request, response) {
    let status_id = request.params.id

    let Status = await controllerStatus.buscarStatusID(status_id)

    response.status(Status.status_code)
    response.json(Status)
})
// POST STATUS
router.post('/status', cors(), bodyParserJSON, async function(request, response){
    let Status_data = request.body

    let contentType = request.headers['content-type']

    let Status = await controllerStatus.inserirStatus(Status_data, contentType)

    response.status(Status.status_code)
    response.json(Status)
})
// PUT STATUS
router.put('/Status/:id', cors(), bodyParserJSON, async function(request, response){
    let status_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Status = await controllerStatus.atualizarStatus(dadosBody, status_id, contentType)

    response.status(Status.status_code)
    response.json(Status)
})
// DELETE STATUS
router.delete('/Status/:id', cors(), async function(request, response){
    let status_id = request.params.id

    let Status = await controllerStatus.excluirStatus(status_id)

    response.status(Status.status_code)
    response.json(Status)
})
module.exports = router