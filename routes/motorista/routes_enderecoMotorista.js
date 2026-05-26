/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do endereço do motorista
 * Data: 18/05/2026
 * Autor: Weslei Santos
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const req = require('express/lib/request')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerEnderecoMotorista = require('../../controller/motorista/controller_endereco_motorista')


/* GET Todos Endereços */
router.get('/enderecomotorista', cors(), async function (request, response) {
    let enderecoMotorista = await controllerEnderecoMotorista.listarTodosEnderecosMotorista()

    response.status(enderecoMotorista.status_code)
    response.json(enderecoMotorista)
})

router.get('/enderecomotorista/:id', cors(), async function (request, response) {
    let id = request.params.id

    let enderecoMotorista = await controllerEnderecoMotorista.listarEnderecoMotoristaPorId(id)

    response.status(enderecoMotorista.status_code)
    response.json(enderecoMotorista)
})

router.post('/enderecomotorista/', cors(), async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let enderecoMotorista
        = await controllerEnderecoMotorista.inserirEnderecoMotorista
            (dadosBody, contentType)
    response.status(enderecoMotorista
        .status_code)
    response.json(enderecoMotorista
    )
})

router.put('/enderecomotorista/:id', cors(), async function (request, response) {
    let idEnderecoMotorista
        = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let enderecoMotorista
        = await controllerEnderecoMotorista.atualizarEnderecoMotorista
            (dadosBody, idEnderecoMotorista
                , contentType)
    response.status(enderecoMotorista
        .status_code)
    response.json(enderecoMotorista
    )
})

router.delete('/enderecomotorista/:id', cors(), async function (request, response) {
    let idEnderecoMotorista
        = request.params.id

    let enderecoMotorista
        = await controllerEnderecoMotorista.deletarEnderecoMotorista
            (idEnderecoMotorista
            )
    response.status(enderecoMotorista
        .status_code)
    response.json(enderecoMotorista
    )
})

module.exports = router