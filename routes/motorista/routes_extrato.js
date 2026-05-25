/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do extrato
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerExtrato = require('../../controller/motorista/controller_extrato.js')

//endpoints para a rota de genero
router.get('/extrato', cors(), async function (request, response) {
    let extrato = await controllerExtrato.listarExtrato()

    response.status(extrato.status_code)
    response.json(extrato)
})

router.get('/extrato/:id', cors(), async function (request, response) {
    let extrato_id = request.params.id

    let extrato = await controllerExtrato.buscarExtratoID(extrato_id)

    response.status(extrato.status_code)
    response.json(extrato)
})

router.post('/extrato', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let extrato = await controllerExtrato.inserirExtrato(dadosBody, contentType)

    response.status(extrato.status_code)
    response.json(extrato)
})

router.put('/extrato/:id', cors(), bodyParserJSON, async function(request, response){
    let extrato_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let extrato = await controllerExtrato.atualizarExtrato(dadosBody, extrato_id, contentType)

    response.status(extrato.status_code)
    response.json(extrato)
})

router.delete('/extrato/:id', cors(), async function(request, response){
    let extrato_id = request.params.id

    let extrato = await controllerExtrato.excluirExtrato(extrato_id)

    response.status(extrato.status_code)
    response.json(extrato)
})

module.exports = router