/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do endereco da lavanderia
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

const controllerRoupa = require('../controller/controller_roupa.js')

router.get('/v1/semprelimpa/roupa', cors(), async function(request, response){
    let roupa = await controllerRoupa.listarTodasRoupas()
    
        response.status(roupa.status_code)
        response.json(roupa)
})


router.get('/v1/semprelimpa/roupa/buscar', cors(), async function(request, response){
    let nomePeca= request.query.nome
    let dadosRoupas = await controllerRoupa.listarRoupaPorNome(nomePeca)

    response.status(dadosRoupas.status_code).json(dadosRoupas)
})

router.get('/v1/semprelimpa/roupa/:id', cors(), async function(request, response){
    let id = request.params.id

    let roupa = await controllerRoupa.listarRoupaPorId(id)

    response.status(roupa.status_code)
    response.json(roupa)
})

module.exports = router
