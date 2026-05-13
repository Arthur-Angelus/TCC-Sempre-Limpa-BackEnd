/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela status_pedido
 * Data de Criação: 11/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const statusDAO = require('../model/DAO/status.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')
// GET ALL
const listarStatus = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultStatus = await statusDAO.getSelectAllStatus()

        if (resultStatus) {
            if (resultStatus.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Status = resultStatus

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar status"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar status"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar status"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY ID
const buscarStatusID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultStatus = await statusDAO.getSelectStatusById(Number(id))

            if (resultStatus) {
                if (resultStatus.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Status = resultStatus

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar status id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar status id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar status id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// INSERT
const inserirStatus = async function (Status, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosStatus(Status)

            if (!validar) {
                let resultStatus = await statusDAO.setInsertStatus(Status)

                console.log("DEBUG INSERT RESULT ID:", resultStatus)
                console.log("DEBUG FALHA NA VALIDAÇÃO:", validar)

                if (resultStatus) {
                    let lastID = await statusDAO.getSelectLastID()
                    if (lastID) {
                        Status.status_id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = Status

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel recuperar o ID do novo status"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel inserir o status no banco de dados"
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
const atualizarStatus = async function (Status, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosStatus(Status)

            if (!validar) {
                console.log("DEBUG FALHA NA VALIDAÇÃO:", validar)
                let validarID = await buscarStatusID(id)

                if (validarID.status_code == 200) {

                    let idStatus = Number(id)

                    let dados = Status
                    delete dados.id

                    let resultStatus = await statusDAO.setUpdateStatus(dados, idStatus)
                    console.log("DEBUG UPDATE RESULT ID:", resultStatus)

                    if (resultStatus) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Status = Status

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " UPDATE - Não foi possivel atualizar o status no banco de dados"
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
const excluirStatus = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarStatusID(id)

            if (validarID.status_code == 200) {

                let resultStatus = await statusDAO.setDeleteStatus(Number(id))

                if (resultStatus) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Status = resultStatus
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " DELETE - Não foi possível excluir o status"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " DELETE - status não encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += " DELETE -[ID incorreto]" 
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " DELETE - controller excluir status"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// Validação dos dados INPUT - INSERT E UPDATE
const validarDadosStatus = async function (Status) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (Status.descricao == '' || Status.descricao == undefined || 
        Status.descricao == null || Status.descricao.length > 50 ||
        typeof Status.descricao !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Descrição Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarStatus,
    buscarStatusID,
    inserirStatus,
    atualizarStatus,
    excluirStatus
}