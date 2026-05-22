/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do endereço do avaliacao_motorista
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/
const avaliacao_motoristaDAO = require('../../model/DAO/motorista/avaliacao_motorista.js')
const DEFAULT_MESSAGES = require('../module/config_messages.js')

const listarAvaliacaoMotorista = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultAvaliacaoMotorista = await avaliacao_motoristaDAO.getSelectAllRating()

        if (resultAvaliacaoMotorista) {
            if (resultAvaliacaoMotorista.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.AvaliacaoMotorista = resultAvaliacaoMotorista

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Avaliacao AvaliacaoMotorista"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Avaliacao AvaliacaoMotorista"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Avaliacao AvaliacaoMotorista"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarAvaliacaoMotoristaID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultAvaliacaoMotorista = await avaliacao_motoristaDAO.getSelectRatingById(Number(id))

            if (resultAvaliacaoMotorista) {
                if (resultAvaliacaoMotorista.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.AvaliacaoMotorista = resultAvaliacaoMotorista

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Avaliacao AvaliacaoMotorista id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Avaliacao AvaliacaoMotorista id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Avaliacao AvaliacaoMotorista id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirAvaliacaoMotorista = async function (AvaliacaoMotorista, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir AvaliacaoMotorista"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosAvaliacaoMotorista(AvaliacaoMotorista)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultAvaliacaoMotorista = await avaliacao_motoristaDAO.setInsertRating(AvaliacaoMotorista)

        if (!resultAvaliacaoMotorista) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Avaliacao AvaliacaoMotorista"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await avaliacao_motoristaDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Avaliacao AvaliacaoMotorista"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
        AvaliacaoMotorista.AvaliacaoMotorista_id = lastID

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = AvaliacaoMotorista

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir Avaliacao AvaliacaoMotorista"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarAvaliacaoMotorista = async function (AvaliacaoMotorista, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosAvaliacaoMotorista(AvaliacaoMotorista)

            if (!validar) {

                let validarID = await buscarAvaliacaoMotoristaID(id)

                if (validarID.status_code == 200) {

                    let idAvaliacaoMotorista = Number(id)

                    let dados = AvaliacaoMotorista
                    delete dados.id

                    let resultAvaliacaoMotorista = await avaliacao_motoristaDAO.setUpdateRating(dados, idAvaliacaoMotorista)

                    if (resultAvaliacaoMotorista) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.AvaliacaoMotorista = AvaliacaoMotorista

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar Avaliacao AvaliacaoMotorista"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar Avaliacao AvaliacaoMotorista"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar Avaliacao AvaliacaoMotorista"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirAvaliacaoMotorista = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarAvaliacaoMotoristaID(id)

            if (validarID.status_code == 200) {

                let resultAvaliacaoMotorista = await avaliacao_motoristaDAO.setDeleteRating(Number(id))

                if (resultAvaliacaoMotorista) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.AvaliacaoMotorista = resultAvaliacaoMotorista
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir Avaliacao AvaliacaoMotorista"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir Avaliacao AvaliacaoMotorista"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir Avaliacao AvaliacaoMotorista"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosAvaliacaoMotorista = async function (AvaliacaoMotorista) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (AvaliacaoMotorista.comentario == '' || AvaliacaoMotorista.comentario == undefined || AvaliacaoMotorista.comentario == null || AvaliacaoMotorista.comentario.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [comentario incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(AvaliacaoMotorista.nota) || AvaliacaoMotorista.nota == undefined || AvaliacaoMotorista.nota == null || AvaliacaoMotorista.nota > 5 || AvaliacaoMotorista.nota < 1) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [nota incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (AvaliacaoMotorista.fk_motorista_id == null || isNaN(AvaliacaoMotorista.fk_motorista_id) || AvaliacaoMotorista.fk_motorista_id <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_motorista_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (AvaliacaoMotorista.fk_usuario_id == null || isNaN(AvaliacaoMotorista.fk_usuario_id) || AvaliacaoMotorista.fk_usuario_id <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_usuario_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarAvaliacaoMotorista,
    buscarAvaliacaoMotoristaID,
    inserirAvaliacaoMotorista,
    atualizarAvaliacaoMotorista,
    excluirAvaliacaoMotorista
}