/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do usuario
 * Data: 04/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerUsuario = require('../controller/controller_usuario.js')

//endpoints para a rota de genero
router.get('/v1/SempreLimpa/Usuarios', cors(), async function (request, response) {
    let Usuario = await controllerUsuario.listarUsuarios()

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.get('/v1/SempreLimpa/Usuario/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let Usuario = await controllerUsuario.buscarUsuarioID(idUsuario)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.get('/v1/SempreLimpa/Usuario/:email, :senha', cors(), async function (request, response) {
    let emailUsuario = request.params.email
    let senhaUsuario = request.params.senha

    let Usuario = await controllerUsuario.buscarUsuarioID(emailUsuario, senhaUsuario)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.get('/v1/SempreLimpa/Usuario/:cpf, :senha', cors(), async function (request, response) {
    let cpfUsuario = request.params.cpf
    let senhaUsuario = request.params.senha

    let Usuario = await controllerUsuario.buscarUsuarioID(cpfUsuario, senhaUsuario)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.post('/v1/SempreLimpa/Usuario', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Usuario = await controllerUsuario.inserirUsuarios(dadosBody, contentType)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.put('/v1/SempreLimpa/Usuario/:id', cors(), bodyParserJSON, async function(request, response){
    let idUsuario = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Usuario = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.delete('/v1/SempreLimpa/Usuario/:id', cors(), async function(request, response){
    let idUsuario = request.params.id

    let Usuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

module.exports = router