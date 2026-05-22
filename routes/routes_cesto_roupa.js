/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela relacionamento cesto_roupa
 * Data: 14/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerRecebe = require('../controller/controller_cesto_roupa.js')

//endpoints para a rota de genero
router.get('/cesto_roupas', cors(), async function (request, response) {
    let recebe = await controllerRecebe.listarCesto_roupas()

    response.status(recebe.status_code)
    response.json(recebe)
})

router.get('/cesto_roupa/:fk_cesto_id', cors(), async function (request, response) {
    let fk_cesto_id = request.params.fk_cesto_id

    let recebe = await controllerRecebe.buscarCesto_roupaFK(fk_cesto_id)

    response.status(recebe.status_code)
    response.json(recebe)
})

router.post('/cesto_roupa', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let recebe = await controllerRecebe.inserirCesto_roupas(dadosBody, contentType)

    response.status(recebe.status_code)
    response.json(recebe)
})

// router.put('/cesto_roupa/:fk_cesto_id/:fk_roupa_id', cors(), bodyParserJSON, async function(request, response){
//     let fk_cesto_id = request.params.fk_cesto_id
//     let fk_roupa_id_antiga = request.params.fk_roupa_id

//     let dadosBody = request.body

//     let contentType = request.headers['content-type']

//     let recebe = await controllerRecebe.atualizarCesto_roupa(dadosBody, fk_cesto_id, fk_roupa_id_antiga, contentType)

//     response.status(recebe.status_code)
//     response.json(recebe)
// })

router.delete('/cesto_roupa/:fk_cesto_id/:fk_roupa_id', cors(), async function(request, response){
    let fk_cesto_id = request.params.fk_cesto_id
    let fk_roupa_id = request.params.fk_roupa_id

    let recebe = await controllerRecebe.excluirCesto_roupa(fk_cesto_id, fk_roupa_id)

    response.status(recebe.status_code)
    response.json(recebe)
})

module.exports = router