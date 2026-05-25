/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do endereço do extrato
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/
const extratoDAO = require('../../model/DAO/motorista/extrato.js')
const DEFAULT_MESSAGES = require('../module/config_messages.js')

const listarExtrato = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultExtrato = await extratoDAO.getSelectAllExtract()

        if (resultExtrato) {
            if (resultExtrato.length > 0) {
                MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_REQUEST.marca
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Extrato = resultExtrato

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Extrato"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Extrato"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Extrato"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarExtratoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultExtrato = await extratoDAO.getSelectExtractById(Number(id))

            if (resultExtrato) {
                if (resultExtrato.length > 0) {
                    MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_REQUEST.marca
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Extrato = resultExtrato

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Extrato id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Extrato id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Extrato id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirExtrato = async function (Extrato, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir Extrato"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosExtrato(Extrato)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultExtrato = await extratoDAO.setInsertExtract(Extrato)

        if (!resultExtrato) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Extrato"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await extratoDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Extrato"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
        Extrato.Extrato_id = lastID

        MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_CREATED_ITEM.marca
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = Extrato

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir Extrato"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarExtrato = async function (Extrato, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosExtrato(Extrato)

            if (!validar) {

                let validarID = await buscarExtratoID(id)

                if (validarID.status_code == 200) {

                    let idExtrato = Number(id)

                    let dados = Extrato
                    delete dados.id

                    let resultExtrato = await extratoDAO.setUpdateExtract(dados, idExtrato)

                    if (resultExtrato) {
                        MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_UPDATED_ITEM.marca
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Extrato = Extrato

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar Extrato"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar Extrato"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar Extrato"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirExtrato = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarExtratoID(id)

            if (validarID.status_code == 200) {

                let resultExtrato = await extratoDAO.setDeleteExtract(Number(id))

                if (resultExtrato) {

                    MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_DELETED_ITEM.marca
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Extrato = resultExtrato
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir Extrato"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir Extrato"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir Extrato"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosExtrato = async function (Extrato) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (isNaN(Extrato.taxa_motorista) || Extrato.taxa_motorista == undefined || Extrato.taxa_motorista == null ||Extrato.taxa_motorista.length > 10.2) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[taxa_motorista incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(Extrato.taxa_km) || Extrato.taxa_km == undefined || Extrato.taxa_km == null ||Extrato.taxa_km.length > 10.2) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[taxa_km incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Extrato.fk_motorista_id == null || isNaN(Extrato.fk_motorista_id) || Extrato.fk_motorista_id <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_motorista_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Extrato.fk_pedido_id == null || isNaN(Extrato.fk_pedido_id) || Extrato.fk_pedido_id <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_pedido_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarExtrato,
    buscarExtratoID,
    inserirExtrato,
    atualizarExtrato,
    excluirExtrato
}