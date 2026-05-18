/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do endereço do ordem_pagamento
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 2.0
 *******************************************************************************************/
const ordem_pagamentoDAO = require('../model/DAO/ordem_pagamento.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const listarOrdemPagamentos = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultOrdemPagamentos = await ordem_pagamentoDAO.getSelectAllPayment()

        if (resultOrdemPagamentos) {
            if (resultOrdemPagamentos.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.OrdemPagamentos = resultOrdemPagamentos

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar OrdemPagamentos"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar OrdemPagamentos"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar OrdemPagamentos"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarOrdemPagamentoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultOrdemPagamentos = await ordem_pagamentoDAO.getSelectPaymentById(Number(id))

            if (resultOrdemPagamentos) {
                if (resultOrdemPagamentos.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.OrdemPagamento = resultOrdemPagamentos

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar OrdemPagamento id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar OrdemPagamento id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar OrdemPagamento id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirOrdemPagamentos = async function (OrdemPagamento, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir OrdemPagamento"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosOrdemPagamento(OrdemPagamento)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultOrdemPagamentos = await ordem_pagamentoDAO.setInsertPayment(OrdemPagamento)

        if (!resultOrdemPagamentos) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir OrdemPagamento"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await ordem_pagamentoDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir OrdemPagamento"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
        OrdemPagamento.OrdemPagamento_id = lastID

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = OrdemPagamento

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir OrdemPagamento"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarOrdemPagamento = async function (OrdemPagamento, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosOrdemPagamento(OrdemPagamento)

            if (!validar) {

                let validarID = await buscarOrdemPagamentoID(id)

                if (validarID.status_code == 200) {

                    let idOrdemPagamento = Number(id)

                    let dados = OrdemPagamento
                    delete dados.id

                    let resultOrdemPagamentos = await ordem_pagamentoDAO.setUpdatePayment(dados, idOrdemPagamento)

                    if (resultOrdemPagamentos) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.OrdemPagamento = OrdemPagamento

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar OrdemPagamento"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar OrdemPagamento"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar OrdemPagamento"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirOrdemPagamento = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarOrdemPagamentoID(id)

            if (validarID.status_code == 200) {

                let resultOrdemPagamentos = await ordem_pagamentoDAO.setDeletePayment(Number(id))

                if (resultOrdemPagamentos) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.OrdemPagamento = resultOrdemPagamentos
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir OrdemPagamento"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir OrdemPagamento"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir OrdemPagamento"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosOrdemPagamento = async function (OrdemPagamento) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (OrdemPagamento.tipo_pagamento == '' || OrdemPagamento.tipo_pagamento == undefined || OrdemPagamento.tipo_pagamento == null || OrdemPagamento.tipo_pagamento != 'PIX' && OrdemPagamento.tipo_pagamento != 'CARTAO') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[tipo_pagamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (OrdemPagamento.valor == '' || OrdemPagamento.valor == undefined || OrdemPagamento.valor == null || isNaN(OrdemPagamento.valor) || OrdemPagamento.valor.length > 10.2) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [valor incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (OrdemPagamento.status == '' || OrdemPagamento.status == undefined || OrdemPagamento.status == null || OrdemPagamento.status != 'PAGO' && OrdemPagamento.status != 'PENDENTE' && OrdemPagamento.status != 'CANCELADO') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [status incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (OrdemPagamento.fk_pedido_id == null || isNaN(OrdemPagamento.fk_pedido_id) || OrdemPagamento.fk_pedido_id <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_pedido_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS;

    } else {
        return false
    }
}

module.exports = {
    listarOrdemPagamentos,
    buscarOrdemPagamentoID,
    inserirOrdemPagamentos,
    atualizarOrdemPagamento,
    excluirOrdemPagamento
}