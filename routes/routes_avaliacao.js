/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da avaliação
 * Data: 13/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerAvaliacao = require('../controller/controller_avaliacao.js')

//endpoints para a rota de genero
router.get('/v1/semprelimpa/avaliacoes', cors(), async function (request, response) {
    let Avaliacao = await controllerAvaliacao.listarAvaliacoes()

    response.status(Avaliacao.status_code)
    response.json(Avaliacao)
})

router.get('/v1/semprelimpa/avaliacao/:id', cors(), async function (request, response) {
    let avaliacao_id = request.params.id

    let Avaliacao = await controllerAvaliacao.buscarAvaliacaoID(avaliacao_id)

    response.status(Avaliacao.status_code)
    response.json(Avaliacao)
})

router.post('/v1/semprelimpa/avaliacao', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Avaliacao = await controllerAvaliacao.inserirAvaliacoes(dadosBody, contentType)

    response.status(Avaliacao.status_code)
    response.json(Avaliacao)
})

router.put('/v1/semprelimpa/avaliacao/:id', cors(), bodyParserJSON, async function(request, response){
    let avaliacao_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Avaliacao = await controllerAvaliacao.atualizarAvaliacao(dadosBody, avaliacao_id, contentType)

    response.status(Avaliacao.status_code)
    response.json(Avaliacao)
})

router.delete('/v1/semprelimpa/avaliacao/:id', cors(), async function(request, response){
    let avaliacao_id = request.params.id

    let Avaliacao = await controllerAvaliacao.excluirAvaliacao(avaliacao_id)

    response.status(Avaliacao.status_code)
    response.json(Avaliacao)
})

module.exports = router