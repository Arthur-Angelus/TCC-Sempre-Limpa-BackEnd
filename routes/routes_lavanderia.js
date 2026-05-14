/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints de lavanderia
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const req = require('express/lib/request')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerLavanderia = require('../controller/controller_lavanderia.js')

router.get('/v1/semprelimpa/lavanderia', cors(), async function(request, response){
    let lavanderia = await controllerLavanderia.selecionarTodasLavanderia()
    
        response.status(lavanderia.status_code)
        response.json(lavanderia)
})

router.get('/v1/semprelimpa/lavanderia/filtro', cors(), async function (request, response){
    let dadosLavanderia = await controllerLavanderia.selecionarLavanderiaPorFiltro(request.query)

    response.status(dadosLavanderia.status_code)
    response.json(dadosLavanderia)
})

router.get('/v1/semprelimpa/lavanderia/:id', cors(), async function(request, response){
    let idLavanderia = request.params.id
    let lavanderia = await controllerLavanderia.selecionarLavanderiaPorId(idLavanderia)

    response.status(lavanderia.status_code)
    response.json(lavanderia)
})

router.post('/v1/semprelimpa/lavanderia', cors(), async function (request, response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let lavanderia = await controllerLavanderia.inserirLavanderia(dadosBody, contentType)
    response.status(lavanderia.status_code)
    response.json(lavanderia)
})



module.exports = router