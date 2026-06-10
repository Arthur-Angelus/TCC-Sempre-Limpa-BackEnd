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

router.get('/lavanderia/media', cors(), async function(request, response){
    let result = await controllerLavandeira.selecionarMediaLavanderias();

    response.status(result.status_code);
    response.json(result);
});

router.get('/lavanderia', cors(), async function(request, response){
    let lavanderia = await controllerLavanderia.selecionarTodasLavanderia()
    console.log(lavanderia)
    
        response.status(lavanderia.status_code)
        response.json(lavanderia)
})

router.get('/lavanderia/filtro', cors(), async function (request, response){

    let dadosLavanderia = await controllerLavanderia.selecionarLavanderiaPorFiltro(request.query);
    
    response.status(dadosLavanderia.status_code);
    response.json(dadosLavanderia);
});

router.get('/lavanderia/:id', cors(), async function(request, response){
    let idLavanderia = request.params.id
    let lavanderia = await controllerLavanderia.selecionarLavanderiaPorId(idLavanderia)

    response.status(lavanderia.status_code)
    response.json(lavanderia)
})

router.post('/lavanderia', cors(), async function (request, response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let lavanderia = await controllerLavanderia.inserirLavanderia(dadosBody, contentType)
    response.status(lavanderia.status_code)
    response.json(lavanderia)
})

router.put('/lavanderia/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    
    let idLavanderia = request.params.id
    
    let dadosBody = request.body

    let dadosAtualizados = await controllerLavanderia.atualizarLavanderia(dadosBody, idLavanderia, contentType)

    response.status(dadosAtualizados.status_code)
    response.json(dadosAtualizados)
})

router.delete('/lavanderia/:id', cors(), async function(request, response){
    let idLavanderia = request.params.id

    let lavanderia = await controllerLavanderia.deletarLavanderia(idLavanderia)
    response.status(lavanderia.status_code)
    response.json(lavanderia)
})



module.exports = router