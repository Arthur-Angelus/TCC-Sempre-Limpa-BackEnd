/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do dados_bancarios
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerDadosBancarios = require('../../controller/motorista/controller_dados_bancarios.js')

//endpoints para a rota de genero
router.get('/v1/semprelimpa/dados_bancarios', cors(), async function (request, response) {
    let dados_bancarios = await controllerDadosBancarios.listarDadosBancarios()

    response.status(dados_bancarios.status_code)
    response.json(dados_bancarios)
})

router.get('/v1/semprelimpa/dados_bancarios/:id', cors(), async function (request, response) {
    let dados_bancarios_id = request.params.id

    let dados_bancarios = await controllerDadosBancarios.buscarDadosBancariosID(dados_bancarios_id)

    response.status(dados_bancarios.status_code)
    response.json(dados_bancarios)
})

router.post('/v1/semprelimpa/dados_bancarios', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let dados_bancarios = await controllerDadosBancarios.inserirDadosBancarios(dadosBody, contentType)

    response.status(dados_bancarios.status_code)
    response.json(dados_bancarios)
})

router.put('/v1/semprelimpa/dados_bancarios/:id', cors(), bodyParserJSON, async function(request, response){
    let dados_bancarios_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let dados_bancarios = await controllerDadosBancarios.atualizarDadosBancarios(dadosBody, dados_bancarios_id, contentType)

    response.status(dados_bancarios.status_code)
    response.json(dados_bancarios)
})

router.delete('/v1/semprelimpa/dados_bancarios/:id', cors(), async function(request, response){
    let dados_bancarios_id = request.params.id

    let dados_bancarios = await controllerDadosBancarios.excluirDadosBancarios(dados_bancarios_id)

    response.status(dados_bancarios.status_code)
    response.json(dados_bancarios)
})

module.exports = router