/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela cesto
 * Data de Criação: 14/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const cestoDAO = require('../model/DAO/cesto.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')
// GET ALL
const listarCesto = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultCesto = await cestoDAO.getSelectAllCesto()

        if (resultCesto) {
            if (resultCesto.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Cesto = resultCesto

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " GET - Nenhum cesto encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " GET - Erro ao buscar cesto"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " GET - Erro ao buscar cesto"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


module.exports = {
  listarCesto
}