/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do endereço do CartaoVirtual
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/
const cartaoVirtualDAO = require('../../model/DAO/motorista/cartao_virtual.js')
const DEFAULT_MESSAGES = require('../module/config_messages.js')

const listarCartaoVirtual = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultCartaoVirtual = await cartaoVirtualDAO.getSelectAllVirtualCard()

        if (resultCartaoVirtual) {
            if (resultCartaoVirtual.length > 0) {
                MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_REQUEST.marca
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.CartaoVirtual = resultCartaoVirtual

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar CartaoVirtual"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar CartaoVirtual"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar CartaoVirtual"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarCartaoVirtualID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultCartaoVirtual = await cartaoVirtualDAO.getSelectVirtualCardById(Number(id))

            if (resultCartaoVirtual) {
                if (resultCartaoVirtual.length > 0) {
                    MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_REQUEST.marca
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.CartaoVirtual = resultCartaoVirtual

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar CartaoVirtual id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar CartaoVirtual id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar CartaoVirtual id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirCartaoVirtual = async function (CartaoVirtual, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir CartaoVirtual"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosCartaoVirtual(CartaoVirtual)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultCartaoVirtual = await cartaoVirtualDAO.setInsertVirtualCard(CartaoVirtual)

        if (!resultCartaoVirtual) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir CartaoVirtual"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await cartaoVirtualDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir CartaoVirtual"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
        CartaoVirtual.CartaoVirtual_id = lastID

        MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_CREATED_ITEM.marca
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = CartaoVirtual

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir CartaoVirtual"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarCartaoVirtual = async function (CartaoVirtual, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosCartaoVirtual(CartaoVirtual)

            if (!validar) {

                let validarID = await buscarCartaoVirtualID(id)

                if (validarID.status_code == 200) {

                    let idCartaoVirtual = Number(id)

                    let dados = CartaoVirtual
                    delete dados.id

                    let resultCartaoVirtual = await cartaoVirtualDAO.setUpdateVirtualCard(dados, idCartaoVirtual)

                    if (resultCartaoVirtual) {
                        MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_UPDATED_ITEM.marca
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.CartaoVirtual = CartaoVirtual

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar CartaoVirtual"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar CartaoVirtual"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar CartaoVirtual"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirCartaoVirtual = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarCartaoVirtualID(id)

            if (validarID.status_code == 200) {

                let resultCartaoVirtual = await cartaoVirtualDAO.setDeleteVirtualCard(Number(id))

                if (resultCartaoVirtual) {

                    MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_DELETED_ITEM.marca
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.CartaoVirtual = resultCartaoVirtual
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir CartaoVirtual"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir CartaoVirtual"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir CartaoVirtual"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosCartaoVirtual = async function (CartaoVirtual) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (isNaN(CartaoVirtual.numero) || CartaoVirtual.numero == undefined || CartaoVirtual.numero == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[numero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (CartaoVirtual.validade == '' || CartaoVirtual.validade == undefined || CartaoVirtual.validade == null ||CartaoVirtual.validade.length > 10.2) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[validade incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(CartaoVirtual.saldo) || CartaoVirtual.saldo == undefined || CartaoVirtual.saldo == null || CartaoVirtual.numero.length > 10.2) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[saldo incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (CartaoVirtual.fk_motorista_id == null || isNaN(CartaoVirtual.fk_motorista_id) || CartaoVirtual.fk_motorista_id <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_motorista_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarCartaoVirtual,
    buscarCartaoVirtualID,
    inserirCartaoVirtual,
    atualizarCartaoVirtual,
    excluirCartaoVirtual
}