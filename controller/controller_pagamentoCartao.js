/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela pagamento cartão
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const pagamentoCartaoDAO = require('../model/DAO/pagamentoCartao.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')
// GET ALL
const listarPagamentoCartao = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultPagamentoCartao = await pagamentoCartaoDAO.getSelectAllPagamentoCartao()

        if (resultPagamentoCartao) {
            if (resultPagamentoCartao.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.PagamentoCartao = resultPagamentoCartao

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " GET - Nenhum pagamento cartão encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " GET - Erro ao buscar pagamento cartão"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " GET - Erro ao buscar pagamento cartão"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY ID
const buscarPagamentoCartaoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPagamentoCartao = await pagamentoCartaoDAO.getSelectPagamentoCartaoById(Number(id))

            if (resultPagamentoCartao) {
                if (resultPagamentoCartao.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.PagamentoCartao = resultPagamentoCartao

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar pagamento cartão id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar pagamento cartão id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar pagamento cartão id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// INSERT
const inserirPagamentoCartao = async function (PagamentoCartao, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosPagamentoCartao(PagamentoCartao)

            if (!validar) {
                let resultPagamentoCartao = await pagamentoCartaoDAO.setInsertPagamentoCartao(PagamentoCartao)

                if (resultPagamentoCartao) {
                    let lastID = await pagamentoCartaoDAO.getSelectLastID()
                    if (lastID) {
                        PagamentoCartao.pagamento_cartao_id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = PagamentoCartao

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel recuperar o ID do novo pagamento cartão"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel inserir o pagamento cartão no banco de dados"
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
const atualizarPagamentoCartao = async function (PagamentoCartao, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosPagamentoCartao(PagamentoCartao)

            if (!validar) {
                let validarID = await buscarPagamentoCartaoID(id)

                if (validarID.status_code == 200) {

                    let idPagamentoCartao = Number(id)

                    let dados = PagamentoCartao
                    delete dados.id

                    let resultPagamentoCartao = await pagamentoCartaoDAO.setUpdatePagamentoCartao(dados, idPagamentoCartao)

                    if (resultPagamentoCartao) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.PagamentoCartao = PagamentoCartao

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " UPDATE - Não foi possivel atualizar o pagamento cartão no banco de dados"
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
const excluirPagamentoCartao = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarPagamentoCartaoID(id)

            if (validarID.status_code == 200) {

                let resultPagamentoCartao = await pagamentoCartaoDAO.setDeletePagamentoCartao(Number(id))

                if (resultPagamentoCartao) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.PagamentoCartao = resultPagamentoCartao
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " DELETE - Não foi possível excluir o pagamento cartão"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " DELETE - pagamento cartão não encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += " DELETE -[ID incorreto]" 
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " DELETE - controller excluir pagamento cartão id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// Validação dos dados INPUT - INSERT E UPDATE
const validarDadosPagamentoCartao = async function (PagamentoCartao) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (PagamentoCartao.token_utilizado == '' || PagamentoCartao.token_utilizado == undefined || 
        PagamentoCartao.token_utilizado == null || typeof PagamentoCartao.token_utilizado !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Token Utilizado Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (PagamentoCartao.ultimos_digitos == '' || PagamentoCartao.ultimos_digitos == undefined || 
        PagamentoCartao.ultimos_digitos == null || typeof PagamentoCartao.ultimos_digitos !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Ultimos Digitos Invalidos]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (PagamentoCartao.tipo == '' || PagamentoCartao.tipo == undefined || 
        PagamentoCartao.tipo == null || typeof PagamentoCartao.tipo !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Tipo de Lavagem Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (PagamentoCartao.fk_cartao_id == '' || PagamentoCartao.fk_cartao_id == undefined || 
        PagamentoCartao.fk_cartao_id == null || typeof PagamentoCartao.fk_cartao_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do Cartao Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (PagamentoCartao.fk_ordem_pagamento_id == '' || PagamentoCartao.fk_ordem_pagamento_id == undefined || 
        PagamentoCartao.fk_ordem_pagamento_id == null || typeof PagamentoCartao.fk_ordem_pagamento_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID da Ordem de Pagamento Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } 
    else {
        return false
    }
}
module.exports = {
  listarPagamentoCartao,
  buscarPagamentoCartaoID,
  inserirPagamentoCartao,
  atualizarPagamentoCartao,
  excluirPagamentoCartao
}