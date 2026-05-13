/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller de Roupas
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const roupasDAO = require('../model/DAO/roupa.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const listarTodasRoupas = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let todasRoupas = await roupasDAO.getAllClothes()
        if(todasRoupas){
            if(todasRoupas.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.roupas = todasRoupas
                
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

const listarRoupaPorId = async function(id_roupa){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id_roupa) && id_roupa !='' && id_roupa!= null && id_roupa > 0) {
            let resultRoupa = await roupasDAO.getClothesById(Number(id_roupa))

            if(resultRoupa !== false) {
                if(resultRoupa !== undefined) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                    MESSAGES.DEFAULT_HEADER.items.roupa = resultRoupa 

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarRoupaPorNome = async function (nome_peca){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let validarRoupa = validarDadosRoupa({nome_peca: nome_peca})
        if(!validarRoupa){
            let resultRoupas = await roupasDAO.getClothesByName(nome_peca)
            if(resultRoupas !== false) {
                if(resultRoupas.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                    MESSAGES.DEFAULT_HEADER.items.roupas = resultRoupas

                    return MESSAGES.DEFAULT_HEADER
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return validarRoupa
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const validarDadosRoupa = function (dadosRoupa) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (dadosRoupa.nome_peca == '' || dadosRoupa.nome_peca == undefined || dadosRoupa.nome_peca == null || dadosRoupa.nome_peca.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome da peça incorreto ou vazio]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false 
    }
}

module.exports = {
    listarTodasRoupas,
    listarRoupaPorId,
    listarRoupaPorNome
}