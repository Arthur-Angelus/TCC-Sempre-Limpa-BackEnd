/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do endereço do dados_bancarios
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 2.0
 *******************************************************************************************/
const dados_bancariosDAO = require('../../model/DAO/motorista/dados_bancarios.js')
const DEFAULT_MESSAGES = require('../module/config_messages.js')

const listarDadosBancarios = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultDadosBancarios = await dados_bancariosDAO.getSelectAllBankData()

        if (resultDadosBancarios) {
            if (resultDadosBancarios.length > 0) {
                MESSAGES.DEFAULT_HEADER.banco = MESSAGES.SUCCESS_REQUEST.banco
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.DadosBancarios = resultDadosBancarios

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar DadosBancarios"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar DadosBancarios"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar DadosBancarios"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarDadosBancariosID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultDadosBancarios = await dados_bancariosDAO.getSelectBankDataById(Number(id))

            if (resultDadosBancarios) {
                if (resultDadosBancarios.length > 0) {
                    MESSAGES.DEFAULT_HEADER.banco = MESSAGES.SUCCESS_REQUEST.banco
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.DadosBancarios = resultDadosBancarios

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar DadosBancarios id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar DadosBancarios id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar DadosBancarios id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirDadosBancarios = async function (DadosBancarios, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir DadosBancarios"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosDadosBancarios(DadosBancarios)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultDadosBancarios = await dados_bancariosDAO.setInsertBankData(DadosBancarios)

        if (!resultDadosBancarios) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir DadosBancarios"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await dados_bancariosDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir DadosBancarios"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
        DadosBancarios.dados_bancarios_id = lastID

        MESSAGES.DEFAULT_HEADER.banco = MESSAGES.SUCCESS_CREATED_ITEM.banco
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = {
            dadosBancarios: {
                id: lastID,
                ...DadosBancarios
            }
        }

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir DadosBancarios"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarDadosBancarios = async function (DadosBancarios, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosDadosBancarios(DadosBancarios)

            if (!validar) {

                let validarID = await buscarDadosBancariosID(id)

                if (validarID.status_code == 200) {

                    let idDadosBancarios = Number(id)

                    let dados = DadosBancarios
                    delete dados.id

                    let resultDadosBancarios = await dados_bancariosDAO.setUpdateBankData(dados, idDadosBancarios)

                    if (resultDadosBancarios) {
                        MESSAGES.DEFAULT_HEADER.banco = MESSAGES.SUCCESS_UPDATED_ITEM.banco
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.DadosBancarios = DadosBancarios

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar DadosBancarios"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar DadosBancarios"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar DadosBancarios"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirDadosBancarios = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarDadosBancariosID(id)

            if (validarID.status_code == 200) {

                let resultDadosBancarios = await dados_bancariosDAO.setDeleteBankData(Number(id))

                if (resultDadosBancarios) {

                    MESSAGES.DEFAULT_HEADER.banco = MESSAGES.SUCCESS_DELETED_ITEM.banco
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.DadosBancarios = resultDadosBancarios
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir DadosBancarios"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir DadosBancarios"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir DadosBancarios"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosDadosBancarios = async function (DadosBancarios) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (DadosBancarios.digito == '' || DadosBancarios.digito == undefined || DadosBancarios.digito == null || isNaN(DadosBancarios.digito) ||DadosBancarios.digito.length > 1) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[digito incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (DadosBancarios.agencia == '' || DadosBancarios.agencia == undefined || DadosBancarios.agencia == null || isNaN(DadosBancarios.agencia) || DadosBancarios.agencia.length > 4) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [agencia incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (DadosBancarios.banco == '' || DadosBancarios.banco == undefined || DadosBancarios.banco == null || DadosBancarios.banco != 'nubank' && DadosBancarios.banco != 'picpay' && DadosBancarios.banco != 'mercadopago') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [banco incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (DadosBancarios.tipo_conta == '' || DadosBancarios.tipo_conta == undefined || DadosBancarios.tipo_conta == null || DadosBancarios.tipo_conta != 'corrente' && DadosBancarios.tipo_conta != 'salario' && DadosBancarios.tipo_conta != 'poupanca') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [tipo_conta incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (DadosBancarios.conta == null || DadosBancarios.conta == '' || DadosBancarios.conta == undefined || isNaN(DadosBancarios.conta) || DadosBancarios.conta.length <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[conta inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS;

    } else {
        return false
    }
}

module.exports = {
    listarDadosBancarios,
    buscarDadosBancariosID,
    inserirDadosBancarios,
    atualizarDadosBancarios,
    excluirDadosBancarios
}