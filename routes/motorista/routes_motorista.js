/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do motorista
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

const controllerEnderecoMotorista = require('../../controller/motorista/controller_endereco_motorista')
const controllerMotorista = require('../../controller/motorista/controller_motorista.js')

//endpoints para a rota de genero
// GET ALL motorista
router.get('/motorista', cors(), async function (request, response) {
    let motorista = await controllerMotorista.listarMotoristas()

    response.status(motorista.status_code)
    response.json(motorista)
})

router.get('/motorista/:id', cors(), async function (request, response) {
    let motorista_id = request.params.id

    let motorista = await controllerMotorista.buscarMotoristaID(motorista_id)

    response.status(motorista.status_code)
    response.json(extrato)
})

// GET motorista BY ID motorista
router.post('/motorista', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let dadosEndereco = dadosBody.endereco
    let dadosMotorista = {...dadosBody}
    delete dadosMotorista.endereco

    let resultEndereco = await controllerEnderecoMotorista.inserirEnderecoMotorista(dadosEndereco, contentType)

    if (resultEndereco.status_code !== 201) {
        response.status(resultEndereco.status_code);
        return response.json(resultEndereco);
    }

    let idEnderecoCriado = resultEndereco.items.Endereco_id;

    dadosMotorista.fk_endereco = idEnderecoCriado;

    let Motorista = await controllerMotorista.inserirMotoristas(dadosMotorista, contentType)

    response.status(Motorista.status_code)
    response.json(Motorista)
})
// UPDATE motorista
router.put('/motorista/:id', cors(), bodyParserJSON, async function(request, response){
    let motorista_id = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let motorista = await controllerMotorista.atualizarMotorista(dadosBody, motorista_id, contentType)

    response.status(motorista.status_code)
    response.json(motorista)
})
// DELETE motorista
router.delete('/motorista/:id', cors(), async function(request, response){
    let motorista_id = request.params.id

    let motorista = await controllerMotorista.excluirMotorista(motorista_id)

    response.status(motorista.status_code)
    response.json(motorista)
})
// LOGIN motorista BY EMAIL
router.post('/loginemailmotorista', cors(), bodyParserJSON, async function (request, response) {
    let email = request.body.email
    let senha = request.body.senha

    let motorista = await controllerMotorista.loginMotoristaEmail(email, senha)

    response.status(motorista.status_code)
    response.json(motorista)
})
// LOGIN motorista BY CPF
router.post('/logincpfmotorista', cors(), bodyParserJSON, async function (request, response) {
    let cpf = request.body.cpf
    let senha = request.body.senha

    let motorista = await controllerMotorista.loginMotoristaCpf(cpf, senha)

    response.status(motorista.status_code)
    response.json(motorista)
})
// ESQUECI MINHA SENHA
router.post('/esquecisenhamotorista', cors(), bodyParserJSON, async function(request, response){
        let email = request.body.email

        let result = await controllerMotorista.esqueciMinhaSenha(email)

        response.status(result.status_code)
        response.json(result)
    }
)
// RESETAR SENHA
router.post('/resetarsenhamotorista', cors(), bodyParserJSON, async function(request, response){
        let token = request.body.token
        let novaSenha = request.body.novaSenha

        let result = await controllerMotorista.resetarSenha(
            token,
            novaSenha
        )

        response.status(result.status_code)
        response.json(result)
    }
)

module.exports = router