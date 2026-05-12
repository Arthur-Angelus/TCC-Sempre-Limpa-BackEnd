/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do usuario
 * Data: 12/05/2026
 * Autor: Arthur Angelus
 * Versão: 2.0
 * implementando router para esqueci minha senha e resetar senha
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
    let usuario_id = request.params.id

    let Usuario = await controllerUsuario.buscarUsuarioID(usuario_id)

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
    let usuario_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Usuario = await controllerUsuario.atualizarUsuario(dadosBody, usuario_id, contentType)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.delete('/v1/SempreLimpa/Usuario/:id', cors(), async function(request, response){
    let usuario_id = request.params.id

    let Usuario = await controllerUsuario.excluirUsuario(usuario_id)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.post('/v1/SempreLimpa/loginEmail', cors(), bodyParserJSON, async function (request, response) {
    let email = request.body.email
    let senha = request.body.senha

    let Usuario = await controllerUsuario.loginUsuarioEmail(email, senha)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.post('/v1/SempreLimpa/loginCpf', cors(), bodyParserJSON, async function (request, response) {
    let cpf = request.body.cpf
    let senha = request.body.senha

    let Usuario = await controllerUsuario.loginUsuarioCpf(cpf, senha)

    response.status(Usuario.status_code)
    response.json(Usuario)
})

router.post('/v1/SempreLimpa/esqueciSenha', cors(), bodyParserJSON, async function(request, response){
        let email = request.body.email

        let result = await controllerUsuario.esqueciMinhaSenha(email)

        response.status(result.status_code)
        response.json(result)
    }
)

router.post('/v1/SempreLimpa/resetarSenha', cors(), bodyParserJSON, async function(request, response){
        let token = request.body.token
        let novaSenha = request.body.novaSenha

        let result = await controllerUsuario.resetarSenha(
            token,
            novaSenha
        )

        response.status(result.status_code)
        response.json(result)
    }
)

module.exports = router