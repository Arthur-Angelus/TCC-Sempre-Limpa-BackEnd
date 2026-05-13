/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela lavanderia
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const lavanderiaDAO = require('../model/DAO/lavanderia.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const selecionarTodasLavanderia = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let lavanderias = await lavanderiaDAO.getSelectAllLaundry()
        if(lavanderias){
            if(lavanderias.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.lavanderia = lavanderias
                
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const selecionarLavanderiaPorId = async function (id_lavanderia){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id_lavanderia) && id_lavanderia != '' && id_lavanderia != null && id_lavanderia > 0){
            let lavanderia = await lavanderiaDAO.getSelectLaundryById(Number(id_lavanderia))
            if (lavanderia !== false){
                if (lavanderia !== undefined){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.lavanderia = lavanderia
                
                return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    selecionarTodasLavanderia,
    selecionarLavanderiaPorId
}