/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela relacionamento cartao_usuario
 * Data: 15/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerCartao_usuario = require('../controller/controller_cartao_usuario.js')

//endpoints para a rota de genero
router.get('/cartao_usuarios', cors(), async function (request, response) {
    let cartao_usuario = await controllerCartao_usuario.listarCartao_usuarios()

    response.status(cartao_usuario.status_code)
    response.json(cartao_usuario)
})

router.get('/cartao_usuario/:fk_usuario_id', cors(), async function (request, response) {
    let fk_usuario_id = request.params.fk_usuario_id

    let cartao_usuario = await controllerCartao_usuario.buscarCartao_usuarioFK(fk_usuario_id)

    response.status(cartao_usuario.status_code)
    response.json(cartao_usuario)
})

router.post('/cartao_usuario', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let cartao_usuario = await controllerCartao_usuario.inserirCartao_usuarios(dadosBody, contentType)

    response.status(cartao_usuario.status_code)
    response.json(cartao_usuario)
})

// router.put('/cartao_usuario/:fk_usuario_id/:fk_cartao_id', cors(), bodyParserJSON, async function(request, response){
//     let fk_usuario_id = request.params.fk_usuario_id
//     let fk_cartao_id_antiga = request.params.fk_cartao_id

//     let dadosBody = request.body

//     let contentType = request.headers['content-type']

//     let cartao_usuario = await controllercartao_usuario.atualizarcartao_usuario(dadosBody, fk_usuario_id, fk_cartao_id_antiga, contentType)

//     response.status(cartao_usuario.status_code)
//     response.json(cartao_usuario)
// })

router.delete('/cartao_usuario/:fk_usuario_id/:fk_cartao_id', cors(), async function (request, response) {
    let fk_usuario_id = request.params.fk_usuario_id
    let fk_cartao_id = request.params.fk_cartao_id


    let cartao_usuario = await controllerCartao_usuario.excluirCartao_usuario(fk_usuario_id, fk_cartao_id)
    response.status(cartao_usuario.status_code)
    response.json(cartao_usuario)
})

module.exports = router