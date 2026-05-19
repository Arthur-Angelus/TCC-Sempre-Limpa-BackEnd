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

module.exports = router