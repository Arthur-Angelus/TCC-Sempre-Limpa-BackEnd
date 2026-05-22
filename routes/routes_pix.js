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
router.get('/pix', cors(), async function (request, response) {
    let pix = await controllerPix.listarPix()

    response.status(pix.status_code)
    response.json(pix)
})
// GET PIX BY ID
router.get('/pix/:id', cors(), async function (request, response) {
    let pix_id = request.params.id

    let pix = await controllerPix.buscarPixID(pix_id)

    response.status(pix.status_code)
    response.json(pix)
})
// POST PIX
router.post('/pix', cors(), bodyParserJSON, async function(request, response){
    let Pix_data = request.body

    let contentType = request.headers['content-type']

    let Pix = await controllerPix.inserirPix(Pix_data, contentType)

    response.status(Pix.status_code)
    response.json(Pix)
})
// PUT PIX
router.put('/pix/:id', cors(), bodyParserJSON, async function(request, response){
    let pix_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Pix = await controllerPix.atualizarPix(dadosBody, pix_id, contentType)

    response.status(Pix.status_code)
    response.json(Pix)
})
// DELETE PIX
router.delete('/pix/:id', cors(), async function(request, response){
    let pix_id = request.params.id

    let Pix = await controllerPix.excluirPix(pix_id)

    response.status(Pix.status_code)
    response.json(Pix)
})

module.exports = router