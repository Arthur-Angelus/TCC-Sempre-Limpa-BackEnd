/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do cartao
 * Data: 11/05/2026
 * Autor: Weslei Santos
 * Versão: 1.0
 *******************************************************************************************/

const { JsonWebTokenError } = require('jsonwebtoken');
const cartaoDAO = require('../model/DAO/cartao.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js');
const { getSelectUserByCpf } = require('../model/DAO/usuario.js');

/* Controller listar todos cartões */
const listarTodosCartoes = async () => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {

        let result = await cartaoDAO.getAllCards();

        if (result === false) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
        }

        MESSAGES.DEFAULT_HEADER.status = true;
        MESSAGES.DEFAULT_HEADER.status_code = 200;
        MESSAGES.DEFAULT_HEADER.items = {
            Cartoes: result
        };

        return MESSAGES.DEFAULT_HEADER;

    } catch (error) {
        console.log("🔥 ERRO NO CONTROLLER - LISTAR TODOS:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};


/* Controller insert cartão */
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

/* Controller listar cartões por user */
const listarCartoesPorUsuario = async (usuario_id) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let result = await cartaoDAO.getSelectCardsByUser(usuario_id)

        if (result && result.length > 0) {
            MESSAGES.DEFAULT_HEADER.status = true
            MESSAGES.DEFAULT_HEADER.status_code = 200
            MESSAGES.DEFAULT_HEADER.items = { Cartoes: result} 

            return MESSAGES.DEFAULT_HEADER
        } else {

        return MESSAGES.ERROR_NOT_FOUND

        }
        
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
    }
}

const deletarCartao = async (cartao_id, usuario_id) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let result = await cartaoDAO.setDeletCard(cartao_id, usuario_id);

        if (result && result.length > 0) {
            MESSAGES.DEFAULT_HEADER.status = true
            MESSAGES.DEFAULT_HEADER.status_code = 200
            MESSAGES.DEFAULT_HEADER.message = "Cartão removido com sucesso!"

            return MESSAGES.DEFAULT_HEADER
        }

        return MESSAGES.ERROR_NOT_FOUND
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirCartao,
    listarCartoesPorUsuario,
    listarTodosCartoes,
    deletarCartao
}