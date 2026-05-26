/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do cartaovirtual
 * Data: 25/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerCartaoVirtual = require('../../controller/motorista/controller_cartao_virtual.js')

//endpoints para a rota de genero
router.get('/cartaovirtual', cors(), async function (request, response) {
    let cartaovirtual = await controllerCartaoVirtual.listarCartaoVirtual()

    response.status(cartaovirtual.status_code)
    response.json(cartaovirtual)
})

router.get('/cartaovirtual/:id', cors(), async function (request, response) {
    let cartaovirtual_id = request.params.id

    let cartaovirtual = await controllerCartaoVirtual.buscarCartaoVirtualID(cartaovirtual_id)

    response.status(cartaovirtual.status_code)
    response.json(cartaovirtual)
})

router.post('/cartaovirtual', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let cartaovirtual = await controllerCartaoVirtual.inserirCartaoVirtual(dadosBody, contentType)

    response.status(cartaovirtual.status_code)
    response.json(cartaovirtual)
})

router.put('/cartaovirtual/:id', cors(), bodyParserJSON, async function(request, response){
    let cartaovirtual_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let cartaovirtual = await controllerCartaoVirtual.atualizarCartaoVirtual(dadosBody, cartaovirtual_id, contentType)

    response.status(cartaovirtual.status_code)
    response.json(cartaovirtual)
})

router.delete('/cartaovirtual/:id', cors(), async function(request, response){
    let cartaovirtual_id = request.params.id

    let cartaovirtual = await controllerCartaoVirtual.excluirCartaoVirtual(cartaovirtual_id)

    response.status(cartaovirtual.status_code)
    response.json(cartaovirtual)
})

module.exports = router