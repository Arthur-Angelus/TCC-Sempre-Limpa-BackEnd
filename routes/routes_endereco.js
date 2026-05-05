/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do endereco
 * Data: 05/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerEndereco = require('../controller/controller_endereco.js')

//endpoints para a rota de genero
router.get('/v1/SempreLimpa/Enderecos', cors(), async function (request, response) {
    let Endereco = await controllerEndereco.listarEnderecos()

    response.status(Endereco.status_code)
    response.json(Endereco)
})

router.get('/v1/SempreLimpa/Endereco/:id', cors(), async function (request, response) {
    let idEndereco = request.params.id

    let Endereco = await controllerEndereco.buscarEnderecoID(idEndereco)

    response.status(Endereco.status_code)
    response.json(Endereco)
})

router.post('/v1/SempreLimpa/Endereco', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Endereco = await controllerEndereco.inserirEnderecos(dadosBody, contentType)

    response.status(Endereco.status_code)
    response.json(Endereco)
})

router.put('/v1/SempreLimpa/Endereco/:id', cors(), bodyParserJSON, async function(request, response){
    let idEndereco = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Endereco = await controllerEndereco.atualizarEndereco(dadosBody, idEndereco, contentType)

    response.status(Endereco.status_code)
    response.json(Endereco)
})

router.delete('/v1/SempreLimpa/Endereco/:id', cors(), async function(request, response){
    let idEndereco = request.params.id

    let Endereco = await controllerEndereco.excluirEndereco(idEndereco)

    response.status(Endereco.status_code)
    response.json(Endereco)
})

module.exports = router