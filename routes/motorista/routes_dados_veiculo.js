/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do dados_veiculo
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerDadosBancarios = require('../../controller/motorista/controller_dados_veiculo.js')

//endpoints para a rota de genero
router.get('/v1/semprelimpa/dados_veiculo', cors(), async function (request, response) {
    let dados_veiculo = await controllerDadosBancarios.listarDadosVeiculo()

    response.status(dados_veiculo.status_code)
    response.json(dados_veiculo)
})

router.get('/v1/semprelimpa/dados_veiculo/:id', cors(), async function (request, response) {
    let dados_veiculo_id = request.params.id

    let dados_veiculo = await controllerDadosBancarios.buscarDadosVeiculoID(dados_veiculo_id)

    response.status(dados_veiculo.status_code)
    response.json(dados_veiculo)
})

router.post('/v1/semprelimpa/dados_veiculo', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let dados_veiculo = await controllerDadosBancarios.inserirDadosVeiculo(dadosBody, contentType)

    response.status(dados_veiculo.status_code)
    response.json(dados_veiculo)
})

router.put('/v1/semprelimpa/dados_veiculo/:id', cors(), bodyParserJSON, async function(request, response){
    let dados_veiculo_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let dados_veiculo = await controllerDadosBancarios.atualizarDadosVeiculo(dadosBody, dados_veiculo_id, contentType)

    response.status(dados_veiculo.status_code)
    response.json(dados_veiculo)
})

router.delete('/v1/semprelimpa/dados_veiculo/:id', cors(), async function(request, response){
    let dados_veiculo_id = request.params.id

    let dados_veiculo = await controllerDadosBancarios.excluirDadosVeiculo(dados_veiculo_id)

    response.status(dados_veiculo.status_code)
    response.json(dados_veiculo)
})

module.exports = router