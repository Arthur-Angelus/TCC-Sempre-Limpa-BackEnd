/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da localizacao
 * Data: 11/06/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const localizacaoDAO = require('../../model/DAO/localizacao/localizacao.js')
const MESSAGES = require('../module/config_messages')

// VALIDADOR (garante apenas 1 FK ativa)
const validarLocalizacao = (body) => {
    const { fk_motorista_id, fk_usuario_id, fk_lavanderia_id, latitude, longitude } = body

    if (!latitude || !longitude)
        return MESSAGES.ERROR_REQUIRED_FIELDS

    const qtdFK =
        (fk_motorista_id ? 1 : 0) +
        (fk_usuario_id ? 1 : 0) +
        (fk_lavanderia_id ? 1 : 0)

    if (qtdFK !== 1)
        return {
            status: false,
            status_code: 400,
            message: 'Deve existir exatamente 1 FK (motorista, usuario ou lavanderia)'
        }

    return false
}

// INSERT
const criarLocalizacao = async (body) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGES))

    try {
        const erro = validarLocalizacao(body)
        if (erro) return erro

        const result = await localizacaoDAO.insertLocalizacao(body)

        if (!result)
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        MESSAGE.DEFAULT_HEADER.status = true
        MESSAGE.DEFAULT_HEADER.status_code = 201
        MESSAGE.DEFAULT_HEADER.message = 'Localização criada com sucesso'
        MESSAGE.DEFAULT_HEADER.items = { localizacao_id: result[0] }

        return MESSAGE.DEFAULT_HEADER

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// GET ALL
const listarLocalizacoes = async () => {
    try {
        const result = await localizacaoDAO.getAllLocalizacoes()

        if (!result)
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        return {
            status: true,
            status_code: 200,
            items: { localizacoes: result }
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// GET BY ID
const buscarLocalizacao = async (localizacao_id) => {
    try {
        const result = await localizacaoDAO.getLocalizacaoById(localizacao_id)

        if (!result)
            return MESSAGES.ERROR_NOT_FOUND

        return {
            status: true,
            status_code: 200,
            items: { localizacao: result }
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// UPDATE
const atualizarLocalizacao = async (localizacao_id, body) => {
    try {
        const result = await localizacaoDAO.updateLocalizacao(localizacao_id, body)

        if (!result)
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        return {
            status: true,
            status_code: 200,
            message: 'Localização atualizada com sucesso'
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// DELETE
const deletarLocalizacao = async (localizacao_id) => {
    try {
        const result = await localizacaoDAO.deleteLocalizacao(localizacao_id)

        if (!result)
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        return {
            status: true,
            status_code: 200,
            message: 'Localização removida com sucesso'
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    criarLocalizacao,
    listarLocalizacoes,
    buscarLocalizacao,
    atualizarLocalizacao,
    deletarLocalizacao
}