/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela pix
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const pixDAO = require('../model/DAO/pix.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')
// GET ALL
const listarPix = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultPix = await pixDAO.getSelectAllPix()

        if (resultPix) {
            if (resultPix.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Pix = resultPix

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " GET - Nenhum pix encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " GET - Erro ao buscar pix"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " GET - Erro ao buscar pix"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY ID
const buscarPixID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPix = await pixDAO.getSelectPixById(Number(id))

            if (resultPix) {
                if (resultPix.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Pix = resultPix

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar pix id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar pix id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar pix id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// INSERT
const inserirPix = async function (Pix, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosPix(Pix)

            if (!validar) {
                let resultPix = await pixDAO.setInsertPix(Pix)

                if (resultPix) {
                    let lastID = await pixDAO.getSelectLastID()
                    if (lastID) {
                        Pix.pix_id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = Pix

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel recuperar o ID do novo pix"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel inserir o pix no banco de dados"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += " INSERT - Tipo de conteúdo não suportado. Use 'application/json'"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " INSERT - Erro Critico na controller, acionar suporte técnico"
        console.log("DEBUG VALIDAÇÃO:", error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// UPDATE
const atualizarPix = async function (Pix, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosPix(Pix)

            if (!validar) {
                let validarID = await buscarPixID(id)

                if (validarID.status_code == 200) {

                    let idPix = Number(id)

                    let dados = Pix
                    delete dados.id

                    let resultPix = await pixDAO.setUpdatePix(dados, idPix)

                    if (resultPix) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Pix = Pix

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " UPDATE - Não foi possivel atualizar o pix no banco de dados"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += " UPDATE - Tipo de conteúdo não suportado. Use 'application/json'"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " UPDATE - Erro Critico na controller, acionar suporte técnico"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// DELETE
const excluirPix = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarPixID(id)

            if (validarID.status_code == 200) {

                let resultPix = await pixDAO.setDeletePix(Number(id))

                if (resultPix) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Pix = resultPix
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " DELETE - Não foi possível excluir o pix do banco de dados"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " DELETE - pix não encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += " DELETE -[ID incorreto]" 
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " DELETE - controller excluir pix id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// Validação dos dados INPUT - INSERT E UPDATE
const validarDadosPix = async function (Pix) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (Pix.chave_pix == '' || Pix.chave_pix == undefined || 
        Pix.chave_pix == null || typeof Pix.chave_pix !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Chave PIX Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pix.data_expiracao == '' || Pix.data_expiracao == undefined || 
        Pix.data_expiracao == null || typeof Pix.data_expiracao !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de Expiração Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pix.qr_code == '' || Pix.qr_code == undefined || 
        Pix.qr_code == null || typeof Pix.qr_code !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[QR Code Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pix.status == '' || Pix.status == undefined || 
        Pix.status == null || typeof Pix.status !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Status Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pix.fk_ordem_pagamento_id == '' || Pix.fk_ordem_pagamento_id == undefined || 
        Pix.fk_ordem_pagamento_id == null || typeof Pix.fk_ordem_pagamento_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID da Ordem de Pagamento Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } 
    else {
        return false
    }
}
module.exports = {
  listarPix,
  buscarPixID,
  inserirPix,
  atualizarPix,
  excluirPix
}