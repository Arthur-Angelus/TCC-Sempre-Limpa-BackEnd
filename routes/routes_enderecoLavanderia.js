/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do endereco da lavanderia
 * Data: 11/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const req = require('express/lib/request')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerEnderecoLavanderia = require('../controller/controller_endereco_lavanderia.js')

router.get('/v1/semprelimpa/enderecolavanderia', cors(), async function(request, response){
    let enderecoLavanderia = await controllerEnderecoLavanderia.listarTodosEnderecosLavanderias()
    
        response.status(enderecoLavanderia.status_code)
        response.json(enderecoLavanderia)
})

router.get('/v1/semprelimpa/enderecolavanderia/:id', cors(), async function(request, response){
    let id = request.params.id

    let enderecoLavanderia = await controllerEnderecoLavanderia.listarEnderecoLavanderiaPorId(id)

    response.status(enderecoLavanderia.status_code)
    response.json(enderecoLavanderia)
})

router.post('/v1/semprelimpa/enderecolavanderia/', cors(), async function(request, response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let enderecoLavanderia = await controllerEnderecoLavanderia.inserirEnderecoLavanderia(dadosBody, contentType)
    response.status(enderecoLavanderia.status_code)
    response.json(enderecoLavanderia)
})

router.put('/v1/semprelimpa/enderecolavanderia/:id', cors(), async function(request, response){
    let idEnderecoLavanderia = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let enderecoLavanderia = await controllerEnderecoLavanderia.atualizarEnderecoLavanderia(dadosBody, idEnderecoLavanderia ,contentType)
    response.status(enderecoLavanderia.status_code)
    response.json(enderecoLavanderia)
})

router.delete('/v1/semprelimpa/enderecolavanderia/:id', cors(), async function(request, response){
    let idEnderecoLavanderia = request.params.id

    let enderecoLavanderia = await controllerEnderecoLavanderia.deletarEnderecoLavanderia(idEnderecoLavanderia)
    response.status(enderecoLavanderia.status_code)
    response.json(enderecoLavanderia)
})

module.exports = router