/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela cesto
 * Data de Criação: 14/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const cestoDAO = require('../model/DAO/cesto.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')
// GET ALL
const listarCesto = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultCesto = await cestoDAO.getSelectAllCesto()

        if (resultCesto) {
            if (resultCesto.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Cesto = resultCesto

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " GET - Nenhum cesto encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " GET - Erro ao buscar cesto"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " GET - Erro ao buscar cesto"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY ID
const buscarCestoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultCesto = await cestoDAO.getSelectCestoById(Number(id))

            if (resultCesto) {
                if (resultCesto.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Cesto = resultCesto

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar cesto id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar cesto id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar cesto id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// INSERT
const inserirCesto = async function (Cesto, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosCesto(Cesto)

            if (!validar) {
                let resultCesto = await cestoDAO.setInsertCesto(Cesto)

                if (resultCesto) {
                    let lastID = await cestoDAO.getSelectLastID()
                    if (lastID) {
                        Cesto.cesto_id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = Cesto

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel recuperar o ID do novo cesto"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel inserir o cesto no banco de dados"
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
const atualizarCesto = async function (Cesto, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosCesto(Cesto)

            if (!validar) {
                let validarID = await buscarCestoID(id)

                if (validarID.status_code == 200) {

                    let idCesto = Number(id)

                    let dados = Cesto
                    delete dados.id

                    let resultCesto = await cestoDAO.setUpdateCesto(dados, idCesto)

                    if (resultCesto) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Cesto = Cesto

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " UPDATE - Não foi possivel atualizar o cesto no banco de dados"
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
const excluirCesto = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarCestoID(id)

            if (validarID.status_code == 200) {

                let resultCesto = await cestoDAO.setDeleteCesto(Number(id))

                if (resultCesto) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Cesto = resultCesto
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " DELETE - Não foi possível excluir o cesto"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " DELETE - cesto não encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += " DELETE -[ID incorreto]" 
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " DELETE - controller excluir cesto"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// Validação dos dados INPUT - INSERT E UPDATE
const validarDadosCesto = async function (Cesto) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (Cesto.peso_estimado == '' || Cesto.peso_estimado == undefined || 
        Cesto.peso_estimado == null || typeof Cesto.peso_estimado !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Peso Estimado Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Cesto.secagem == '' || Cesto.secagem == undefined || 
        Cesto.secagem == null || typeof Cesto.secagem !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Secagem Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Cesto.tipo_lavagem == '' || Cesto.tipo_lavagem == undefined || 
        Cesto.tipo_lavagem == null || typeof Cesto.tipo_lavagem !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Tipo de Lavagem Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Cesto.fk_pedido_id == '' || Cesto.fk_pedido_id == undefined || 
        Cesto.fk_pedido_id == null || typeof Cesto.fk_pedido_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do Pedido Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } 
    else {
        return false
    }
}
module.exports = {
  listarCesto,
  buscarCestoID,
  inserirCesto,
  atualizarCesto,
  excluirCesto
}