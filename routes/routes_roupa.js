/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do endereco da lavanderia
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Contributor: Kauan Lopes Pereira 
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const req = require('express/lib/request')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerRoupa = require('../controller/controller_roupa.js')
// GET ALL
router.get('/v1/semprelimpa/roupa', cors(), async function(request, response){
    let roupa = await controllerRoupa.listarTodasRoupas()
    
        response.status(roupa.status_code)
        response.json(roupa)
})

// GET BY NAME
router.get('/v1/semprelimpa/roupa/buscar', cors(), async function(request, response){
    let nomePeca= request.query.nome
    let dadosRoupas = await controllerRoupa.listarRoupaPorNome(nomePeca)
    response.status(dadosRoupas.status_code).json(dadosRoupas)
})
// GET BY ID
router.get('/v1/semprelimpa/roupa/:id', cors(), async function(request, response){
    let id = request.params.id

    let roupa = await controllerRoupa.listarRoupaPorId(id)

    response.status(roupa.status_code)
    response.json(roupa)
})
// POST
router.post('/v1/semprelimpa/roupa', cors(), bodyParserJSON, async function(request, response){
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let roupa = await controllerRoupa.inserirRoupa(dadosBody, contentType)

    response.status(roupa.status_code)
    response.json(roupa)
})

module.exports = router
