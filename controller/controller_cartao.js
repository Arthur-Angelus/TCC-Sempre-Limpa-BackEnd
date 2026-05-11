/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do cartao
 * Data: 11/05/2026
 * Autor: Weslei Santos
 * Versão: 1.0
 *******************************************************************************************/

const cartaoDAO = require('../model/DAO/cartao.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const inserirCartao = async (cartao) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let result = await cartaoDAO.inserirCartao(cartao)

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = true
            MESSAGES.DEFAULT_HEADER.status_code = 201
            MESSAGES.DEFAULT_HEADER.message = "Cartão cadastrado com sucesso"
            MESSAGES.DEFAULT_HEADER.items = cartao
            
            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
    
    }
}

const listarCartoesPorUsuario = async (usuario_id) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let result = await cartaoDAO.listarCartoesPorUsuario(usuario_id)

        if (result) {
            MESSAGES.DEFAULT_HEADER = true
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
    }
}

module.exports = {
    inserirCartao,
    listarCartoesPorUsuario
}