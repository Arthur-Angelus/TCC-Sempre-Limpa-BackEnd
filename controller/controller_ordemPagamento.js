/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela ordem pagamento
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const ordemPagamentoDAO = require('../model/DAO/ordemPagamento.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')
// GET ALL
const listarOrdemPagamento = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultOrdemPagamento = await ordemPagamentoDAO.getSelectAllOrdemPagamento()

        if (resultOrdemPagamento) {
            if (resultOrdemPagamento.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.OrdemPagamento = resultOrdemPagamento

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " GET - Nenhum ordem de pagamento encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " GET - Erro ao buscar ordem de pagamento"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " GET - Erro ao buscar ordem de pagamento"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY ID
const buscarOrdemPagamentoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultOrdemPagamento = await ordemPagamentoDAO.getSelectOrdemPagamentoById(Number(id))

            if (resultOrdemPagamento) {
                if (resultOrdemPagamento.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.OrdemPagamento = resultOrdemPagamento

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar ordem de pagamento id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar ordem de pagamento id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar ordem de pagamento id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// INSERT
const inserirOrdemPagamento = async function (OrdemPagamento, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosOrdemPagamento(OrdemPagamento)

            if (!validar) {
                let resultOrdemPagamento = await ordemPagamentoDAO.setInsertOrdemPagamento(OrdemPagamento)

                if (resultOrdemPagamento) {
                    let lastID = await ordemPagamentoDAO.getSelectLastID()
                    if (lastID) {
                        OrdemPagamento.ordem_pagamento_id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = OrdemPagamento

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel recuperar o ID do novo ordem de pagamento"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel inserir o ordem de pagamento no banco de dados"
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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// UPDATE
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

                    let resultOrdemPagamento = await ordemPagamentoDAO.setUpdateOrdemPagamento(dados, idOrdemPagamento)

                    if (resultOrdemPagamento) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.OrdemPagamento = OrdemPagamento

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " UPDATE - Não foi possivel atualizar o ordem de pagamento no banco de dados"
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
        console.error(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// DELETE
const excluirOrdemPagamento = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarOrdemPagamentoID(id)

            if (validarID.status_code == 200) {

                let resultOrdemPagamento = await ordemPagamentoDAO.setDeleteOrdemPagamento(Number(id))

                if (resultOrdemPagamento) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.OrdemPagamento = resultOrdemPagamento
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " DELETE - Não foi possível excluir o ordem de pagamento do banco de dados"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " DELETE - ordem de pagamento não encontrada para exclusão"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += " DELETE -[ID incorreto]" 
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " DELETE - controller excluir ordem de pagamento id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// Validação dos dados INPUT - INSERT E UPDATE
const validarDadosOrdemPagamento = async function (OrdemPagamento) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (OrdemPagamento.tipo_pagamento == '' || OrdemPagamento.tipo_pagamento == undefined || 
        OrdemPagamento.tipo_pagamento == null || typeof OrdemPagamento.tipo_pagamento !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Tipo de Pagamento Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (OrdemPagamento.valor == '' || OrdemPagamento.valor == undefined || 
        OrdemPagamento.valor == null || typeof OrdemPagamento.valor !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Valor Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (OrdemPagamento.data_criacao == '' || OrdemPagamento.data_criacao == undefined || 
        OrdemPagamento.data_criacao == null || typeof OrdemPagamento.data_criacao !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de Criação Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (OrdemPagamento.status == '' || OrdemPagamento.status == undefined || 
        OrdemPagamento.status == null || typeof OrdemPagamento.status !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Status Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (OrdemPagamento.fk_pedido_id == '' || OrdemPagamento.fk_pedido_id == undefined || 
        OrdemPagamento.fk_pedido_id == null || typeof OrdemPagamento.fk_pedido_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do Pedido Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } 
    else {
        return false
    }
}
module.exports = {
  listarOrdemPagamento,
  buscarOrdemPagamentoID,
  inserirOrdemPagamento,
  atualizarOrdemPagamento,
  excluirOrdemPagamento
}