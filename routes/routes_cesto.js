/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela cesto
 * Data de Criação: 14/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerCesto = require('../controller/controller_cesto.js')

//ENDPOINT - CESTO

// GET ALL CESTO
router.get('/v1/semprelimpa/cesto', cors(), async function (request, response) {
    let Cesto = await controllerCesto.listarCesto()

    response.status(Cesto.status_code)
    response.json(Cesto)
})
// GET CESTO BY ID
router.get('/v1/semprelimpa/cesto/:id', cors(), async function (request, response) {
    let cesto_id = request.params.id

    let Cesto = await controllerCesto.buscarCestoID(cesto_id)

    response.status(Cesto.status_code)
    response.json(Cesto)
})
// POST CESTO
router.post('/v1/semprelimpa/cesto', cors(), bodyParserJSON, async function(request, response){
    let Cesto_data = request.body

    let contentType = request.headers['content-type']

    let Cesto = await controllerCesto.inserirCesto(Cesto_data, contentType)

    response.status(Cesto.status_code)
    response.json(Cesto)
})
// PUT CESTO
router.put('/v1/SempreLimpa/cesto/:id', cors(), bodyParserJSON, async function(request, response){
    let cesto_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Cesto = await controllerCesto.atualizarCesto(dadosBody, cesto_id, contentType)

    response.status(Cesto.status_code)
    response.json(Cesto)
})

module.exports = router