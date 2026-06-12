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
const inserirCartao = async (dadosCartaoFront) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        // 1. Extrair os últimos 4 dígitos (Segurança PCI Compliance)
        // O front manda "1234 5678 9101 1121", nós tiramos os espaços e pegamos os 4 finais
        const numeroLimpo = String(dadosCartaoFront.numero).replace(/\s/g, '');
        const ultimos_digitos = numeroLimpo.slice(-4);

        // 2. Descobrir a bandeira de forma dinâmica
        let bandeira = 'Desconhecida';
        if (numeroLimpo.startsWith('4')) bandeira = 'Visa';
        else if (numeroLimpo.startsWith('5')) bandeira = 'Mastercard';
        else if (numeroLimpo.startsWith('3')) bandeira = 'Amex';

        // 3. Simular o Token Seguro (O que um Gateway real faria)
        const token_cartao = 'tok_test_' + Math.random().toString(36).substring(2, 15);

        // 4. Montar o objeto exato que a sua Model (DAO) está esperando
        const cartaoParaSalvar = {
            usuario_id: dadosCartaoFront.usuario_id || 1, // Fixado como 1 para o fluxo principal
            bandeira: bandeira,
            validade: dadosCartaoFront.validade,
            token_cartao: token_cartao,
            ultimos_digitos: ultimos_digitos
        };

        // 5. Aciona o banco de dados passando os dados seguros
        // Certifique-se de que o nome da função na DAO é o correto (inserirCartao ou setinsertCard)
        let result = await cartaoDAO.inserirCartao(cartaoParaSalvar); 

        if (result) {
            MESSAGES.DEFAULT_HEADER.status = true;
            MESSAGES.DEFAULT_HEADER.status_code = 201;
            MESSAGES.DEFAULT_HEADER.message = "Cartão cadastrado com sucesso";
            
            // Retornamos apenas os dados não-sensíveis para o React desenhar o novo Card na tela
            MESSAGES.DEFAULT_HEADER.items = {
                id: result[0] || result.insertId, // Pega o ID gerado pelo banco
                bandeira: cartaoParaSalvar.bandeira,
                final: cartaoParaSalvar.ultimos_digitos,
                tipo: 'Crédito'
            };
            
            return MESSAGES.DEFAULT_HEADER;
        }

        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;

    } catch (error) {
        console.error("🔥 Erro ao tokenizar/inserir cartão:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
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

        if (result > 0) {
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