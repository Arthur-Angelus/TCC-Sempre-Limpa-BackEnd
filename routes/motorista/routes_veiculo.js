/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do veiculo
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerVeiculo = require('../../controller/motorista/controller_veiculo.js')

//endpoints para a rota de genero
router.get('/v1/semprelimpa/veiculo', cors(), async function (request, response) {
    let veiculo = await controllerVeiculo.listarVeiculo()

    response.status(veiculo.status_code)
    response.json(veiculo)
})

router.get('/v1/semprelimpa/veiculo/:id', cors(), async function (request, response) {
    let veiculo_id = request.params.id

    let veiculo = await controllerVeiculo.buscarVeiculoID(veiculo_id)

    response.status(veiculo.status_code)
    response.json(veiculo)
})

router.post('/v1/semprelimpa/veiculo', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let veiculo = await controllerVeiculo.inserirVeiculo(dadosBody, contentType)

    response.status(veiculo.status_code)
    response.json(veiculo)
})

router.put('/v1/semprelimpa/veiculo/:id', cors(), bodyParserJSON, async function(request, response){
    let veiculo_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let veiculo = await controllerVeiculo.atualizarVeiculo(dadosBody, veiculo_id, contentType)

    response.status(veiculo.status_code)
    response.json(veiculo)
})

router.delete('/v1/semprelimpa/veiculo/:id', cors(), async function(request, response){
    let veiculo_id = request.params.id

    let veiculo = await controllerVeiculo.excluirVeiculo(veiculo_id)

    response.status(veiculo.status_code)
    response.json(veiculo)
})

module.exports = router