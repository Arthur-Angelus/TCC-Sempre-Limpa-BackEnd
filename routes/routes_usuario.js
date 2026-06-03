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

const controllerEndereco = require('../controller/controller_endereco.js')
const controllerUsuario = require('../controller/controller_usuario.js')

//endpoints para a rota de genero
// GET ALL USUARIOS
router.get('/usuarios', cors(), async function (request, response) {
    let Usuario = await controllerUsuario.listarUsuarios()

    response.status(Usuario.status_code)
    response.json(Usuario)
})
// GET USUARIOS BY ID USUARIO
router.get('/usuario/:id', cors(), async function (request, response) {
    let usuario_id = request.params.id

    let Usuario = await controllerUsuario.buscarUsuarioID(usuario_id)

    response.status(Usuario.status_code)
    response.json(Usuario)
})
// INSERT USUARIOS
router.post('/usuario', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let dadosEndereco = dadosBody.endereco
    let dadosUsuario = {...dadosBody}
    delete dadosUsuario.endereco

    let resultEndereco = await controllerEndereco.inserirEnderecos(dadosEndereco, contentType)

    if (resultEndereco.status_code !== 201) {
        response.status(resultEndereco.status_code);
        return response.json(resultEndereco);
    }

    let idEnderecoCriado = resultEndereco.items.Endereco_id;

    dadosUsuario.fk_endereco = idEnderecoCriado;

    let Usuario = await controllerUsuario.inserirUsuarios(dadosUsuario, contentType)

    response.status(Usuario.status_code)
    response.json(Usuario)
})
// UPDATE USUARIOS
router.put('/usuario/:id', cors(), bodyParserJSON, async function(request, response){
    let usuario_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let Usuario = await controllerUsuario.atualizarUsuario(dadosBody, usuario_id, contentType)

    response.status(Usuario.status_code)
    response.json(Usuario)
})
// DELETE USUARIOS
router.delete('/usuario/:id', cors(), async function(request, response){
    let usuario_id = request.params.id

    let Usuario = await controllerUsuario.excluirUsuario(usuario_id)

    response.status(Usuario.status_code)
    response.json(Usuario)
})
// LOGIN USUARIOS BY EMAIL
router.post('/loginemail', cors(), bodyParserJSON, async function (request, response) {
    let email = request.body.email
    let senha = request.body.senha

    let Usuario = await controllerUsuario.loginUsuarioEmail(email, senha)

    response.status(Usuario.status_code)
    response.json(Usuario)
})
// LOGIN USUARIOS BY CPF
router.post('/logincpf', cors(), bodyParserJSON, async function (request, response) {
    let cpf = request.body.cpf
    let senha = request.body.senha

    let Usuario = await controllerUsuario.loginUsuarioCpf(cpf, senha)

    response.status(Usuario.status_code)
    response.json(Usuario)
})
// ESQUECI MINHA SENHA
router.post('/esquecisenha', cors(), bodyParserJSON, async function(request, response){
        let email = request.body.email

        let result = await controllerUsuario.esqueciMinhaSenha(email)

        response.status(result.status_code)
        response.json(result)
    }
)
// RESETAR SENHA
router.post('/resetarsenha', cors(), bodyParserJSON, async function(request, response){
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
// GET HOME USUÁRIO
router.get('/home/:id', cors(), async function(request, response){
    let usuarioId = request.params.id

    let result = await controllerUsuario.buscarDadosHome(usuarioId)

    response.status(result.status_code)
    response.json(result)
})
module.exports = router