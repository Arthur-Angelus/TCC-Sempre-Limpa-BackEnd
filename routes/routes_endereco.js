/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do endereco
 * Data: 13/05/2026
 * Autor: Arthur Angelus
 * Versão: 2.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerEndereco = require('../controller/controller_endereco.js')

//endpoints para a rota de genero
router.get('/enderecos', cors(), async function (request, response) {
    let Endereco = await controllerEndereco.listarEnderecos()

    response.status(Endereco.status_code)
    response.json(Endereco)
})

router.get('/endereco/:id', cors(), async function (request, response) {
    let endereco_id = request.params.id

    let Endereco = await controllerEndereco.buscarEnderecoID(endereco_id)

    response.status(Endereco.status_code)
    response.json(Endereco)
})

router.post('/endereco', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Endereco = await controllerEndereco.inserirEnderecos(dadosBody, contentType)

    response.status(Endereco.status_code)
    response.json(Endereco)
})

router.put('/endereco/:id', cors(), bodyParserJSON, async function(request, response){
    let endereco_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Endereco = await controllerEndereco.atualizarEndereco(dadosBody, endereco_id, contentType)

    response.status(Endereco.status_code)
    response.json(Endereco)
})

router.delete('/endereco/:id', cors(), async function(request, response){
    let endereco_id = request.params.id

    let Endereco = await controllerEndereco.excluirEndereco(endereco_id)

    response.status(Endereco.status_code)
    response.json(Endereco)
})

module.exports = router