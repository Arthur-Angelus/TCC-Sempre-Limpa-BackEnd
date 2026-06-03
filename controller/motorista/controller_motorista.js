const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const emailService = require('../../services/email.js')
const motoristaDAO = require('../../model/DAO/motorista/motorista.js')

const MESSAGES = require('../module/config_messages.js')

const controllerDadosBancarios = require('./controller_dados_bancarios.js')
const controllerEnderecoMotorista = require('./controller_endereco_motorista.js')
const controllerDadosVeiculo = require('./controller_dados_veiculo.js')

const listarMotoristas = async () => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGES))

    try {

        const result = await motoristaDAO.getSelectAllDriver()

        if (!result)
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        if (result.length === 0)
            return MESSAGES.ERROR_NOT_FOUND

        MESSAGE.DEFAULT_HEADER.status = true
        MESSAGE.DEFAULT_HEADER.status_code = 200
        MESSAGE.DEFAULT_HEADER.message = 'Consulta realizada com sucesso'
        MESSAGE.DEFAULT_HEADER.items = { motoristas: result }

        return MESSAGE.DEFAULT_HEADER

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarMotoristaID = async (id) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGES))

    try {

        if (!id || isNaN(id))
            return MESSAGES.ERROR_REQUIRED_FIELDS

        const result = await motoristaDAO.getSelectDriverById(Number(id))

        if (!result)
            return MESSAGES.ERROR_NOT_FOUND

        MESSAGE.DEFAULT_HEADER.status = true
        MESSAGE.DEFAULT_HEADER.status_code = 200
        MESSAGE.DEFAULT_HEADER.message = 'Consulta realizada com sucesso'
        MESSAGE.DEFAULT_HEADER.items = { motorista: result }

        return MESSAGE.DEFAULT_HEADER

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDadosMotorista = (m) => {

    if (!m.nome) return MESSAGES.ERROR_REQUIRED_FIELDS
    if (!m.email) return MESSAGES.ERROR_REQUIRED_FIELDS
    if (!m.cpf) return MESSAGES.ERROR_REQUIRED_FIELDS
    if (!m.telefone) return MESSAGES.ERROR_REQUIRED_FIELDS
    if (!m.data_nascimento) return MESSAGES.ERROR_REQUIRED_FIELDS
    if (!m.senha) return MESSAGES.ERROR_REQUIRED_FIELDS

    return false
}

const inserirMotoristaCompleto = async (body, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGES))

    try {

        if (String(contentType).toUpperCase() !== 'APPLICATION/JSON')
            return MESSAGES.ERROR_CONTENT_TYPE

        const v = validarDadosMotorista(body)
        if (v) return v

        const v2 = controllerDadosBancarios.validarDadosBancarios(body.dadosBancarios)
        if (v2) return v2

        const v3 = controllerEnderecoMotorista.validarDadosEnderecoMotorista(body.endereco)
        if (v3) return v3

        const v4 = controllerDadosVeiculo.validarDadosVeiculo(body.veiculo?.dados || body.veiculo)
        if (v4) return v4

        body.senha = await bcrypt.hash(body.senha, 10)

        const result = await motoristaDAO.setInsertMotoristaCompleto(
            body,
            body.dadosBancarios,
            body.endereco,
            body.veiculo
        )

        if (!result)
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        MESSAGE.DEFAULT_HEADER.status = true
        MESSAGE.DEFAULT_HEADER.status_code = 201
        MESSAGE.DEFAULT_HEADER.message = 'Motorista criado com sucesso'
        MESSAGE.DEFAULT_HEADER.items = result

        return MESSAGE.DEFAULT_HEADER

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const loginMotoristaEmail = async (email, senha) => {

    try {

        if (!email || !senha)
            return MESSAGES.ERROR_REQUIRED_FIELDS

        const motorista = await motoristaDAO.getSelectDriverByEmail(email)

        if (!motorista)
            return MESSAGES.ERROR_NOT_FOUND

        const valid = await bcrypt.compare(senha, motorista.senha)

        if (!valid)
            return { status: false, status_code: 401, message: 'Senha inválida' }

        const token = jwt.sign(
            { motorista_id: motorista.motorista_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return {
            status: true,
            status_code: 200,
            message: 'Login realizado com sucesso',
            token,
            motorista
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const esqueciMinhaSenha = async (email) => {

    try {

        const motorista = await motoristaDAO.getSelectDriverByEmail(email)

        if (!motorista)
            return MESSAGES.ERROR_NOT_FOUND

        const token = jwt.sign(
            { motorista_id: motorista.motorista_id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        )

        await emailService.enviarEmail(
            motorista.email,
            'Recuperação de senha',
            `<h2>${token}</h2>`
        )

        return {
            status: true,
            status_code: 200,
            message: 'Email enviado com sucesso'
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const resetarSenha = async (token, novaSenha) => {

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const hash = await bcrypt.hash(novaSenha, 10)

        const result = await motoristaDAO.updateSenhaMotorista(decoded.motorista_id, hash)

        if (!result)
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        return {
            status: true,
            status_code: 200,
            message: 'Senha atualizada com sucesso'
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarMotoristas,
    buscarMotoristaID,
    inserirMotoristaCompleto,
    loginMotoristaEmail,
    esqueciMinhaSenha,
    resetarSenha
}