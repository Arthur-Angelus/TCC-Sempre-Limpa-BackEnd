/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela pix
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerPix = require('../controller/controller_pix.js')

//ENDPOINT - PIX

// GET ALL PIX
router.get('/v1/semprelimpa/pix', cors(), async function (request, response) {
    let pix = await controllerPix.listarPix()

    response.status(pix.status_code)
    response.json(pix)
})
// GET PIX BY ID
router.get('/v1/semprelimpa/pix/:id', cors(), async function (request, response) {
    let pix_id = request.params.id

    let pix = await controllerPix.buscarPixID(pix_id)

    response.status(pix.status_code)
    response.json(pix)
})

module.exports = router