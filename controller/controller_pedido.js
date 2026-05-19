/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela pedido
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const pedidoDAO = require('../model/DAO/pedido.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')
// GET ALL
const listarPedido = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultPedido = await pedidoDAO.getSelectAllPedido()

        if (resultPedido) {
            if (resultPedido.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Pedido = resultPedido

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " GET - Nenhum pedido encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " GET - Erro ao buscar pedido"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " GET - Erro ao buscar pedido, acionar suporte técnico"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY ID
const buscarPedidoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPedido = await pedidoDAO.getSelectPedidoById(Number(id))

            if (resultPedido) {
                if (resultPedido.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Pedido = resultPedido

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar pedido id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar pedido id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar pedido id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// INSERT
const inserirPedido = async function (Pedido, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosPedido(Pedido)

            if (!validar) {
                let resultPedido = await pedidoDAO.setInsertPedido(Pedido)

                if (resultPedido) {
                    let lastID = await pedidoDAO.getSelectLastID()
                    if (lastID) {
                        Pedido.pedido_id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = Pedido

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel recuperar o ID do novo pedido"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel inserir o pedido no banco de dados"
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
// Validação dos dados INPUT - INSERT E UPDATE
const validarDadosPedido = async function (Pedido) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (Pedido.data == '' || Pedido.data == undefined || 
        Pedido.data == null || typeof Pedido.data !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pedido.taxa_entregador == '' || Pedido.taxa_entregador == undefined || 
        Pedido.taxa_entregador == null || typeof Pedido.taxa_entregador !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Taxa de Entregador Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pedido.tempo_estimado == '' || Pedido.tempo_estimado == undefined || 
        Pedido.tempo_estimado == null || typeof Pedido.tempo_estimado !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Tempo Estimado Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pedido.fk_status_id == '' || Pedido.fk_status_id == undefined || 
        Pedido.fk_status_id == null || typeof Pedido.fk_status_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do Status Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (Pedido.fk_lavanderia_id == '' || Pedido.fk_lavanderia_id == undefined || 
        Pedido.fk_lavanderia_id == null || typeof Pedido.fk_lavanderia_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID da Lavanderia Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } 
    else if (Pedido.fk_usuario_id == '' || Pedido.fk_usuario_id == undefined || 
        Pedido.fk_usuario_id == null || typeof Pedido.fk_usuario_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do Usuario Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }  
    else {
        return false
    }
}
module.exports = {
  listarPedido,
  buscarPedidoID,
  inserirPedido
}