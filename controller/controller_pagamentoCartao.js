/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela pagamento cartão
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const pagamentoCartaoDAO = require('../model/DAO/pagamentoCartao.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')
// GET ALL
const listarPagamentoCartao = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultPagamentoCartao = await pagamentoCartaoDAO.getSelectAllPagamentoCartao()

        if (resultPagamentoCartao) {
            if (resultPagamentoCartao.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.PagamentoCartao = resultPagamentoCartao

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " GET - Nenhum pagamento cartão encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " GET - Erro ao buscar pagamento cartão"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " GET - Erro ao buscar pagamento cartão"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
  listarPagamentoCartao
}