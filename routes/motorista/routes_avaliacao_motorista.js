/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do avaliacao_motorista
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/



const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerAvaliacaoMotorista = require('../../controller/motorista/controller_avaliacao_motorista.js')

//endpoints para a rota de genero
router.get('/avaliacao_motorista', cors(), async function (request, response) {
    let avaliacao_motorista = await controllerAvaliacaoMotorista.listarAvaliacaoMotorista()

    response.status(avaliacao_motorista.status_code)
    response.json(avaliacao_motorista)
})

router.get('/avaliacao_motorista/:id', cors(), async function (request, response) {
    let avaliacao_motorista_id = request.params.id

    let avaliacao_motorista = await controllerAvaliacaoMotorista.buscarAvaliacaoMotoristaID(avaliacao_motorista_id)

    response.status(avaliacao_motorista.status_code)
    response.json(avaliacao_motorista)
})

router.post('/avaliacao_motorista', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let avaliacao_motorista = await controllerAvaliacaoMotorista.inserirAvaliacaoMotorista(dadosBody, contentType)

    response.status(avaliacao_motorista.status_code)
    response.json(avaliacao_motorista)
})

router.put('/avaliacao_motorista/:id', cors(), bodyParserJSON, async function(request, response){
    let avaliacao_motorista_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let avaliacao_motorista = await controllerAvaliacaoMotorista.atualizarAvaliacaoMotorista(dadosBody, avaliacao_motorista_id, contentType)

    response.status(avaliacao_motorista.status_code)
    response.json(avaliacao_motorista)
})

router.delete('/avaliacao_motorista/:id', cors(), async function(request, response){
    let avaliacao_motorista_id = request.params.id

    let avaliacao_motorista = await controllerAvaliacaoMotorista.excluirAvaliacaoMotorista(avaliacao_motorista_id)

    response.status(avaliacao_motorista.status_code)
    response.json(avaliacao_motorista)
})

module.exports = router