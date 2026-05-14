/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da avaliação
 * Data: 13/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/
const avaliacaoDAO = require('../model/DAO/avaliacao.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const listarAvaliacoes = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultAvaliacoes = await avaliacaoDAO.getSelectAllReview()

        if (resultAvaliacoes) {
            if (resultAvaliacoes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Avaliacao = resultAvaliacoes

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Avaliacao"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar avaliacao"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar avaliacao"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarAvaliacaoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultAvaliacao = await avaliacaoDAO.getSelectReviewById(Number(id))

            if (resultAvaliacao) {
                if (resultAvaliacao.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Avaliacao = resultAvaliacao

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Avaliacao id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Avaliacao id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Avaliacao id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirAvaliacoes = async function (Avaliacao, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir Avaliacao"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosAvaliacao(Avaliacao)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultAvaliacaos = await avaliacaoDAO.setInsertReview(Avaliacao)

        if (!resultAvaliacaos) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Avaliacao"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await avaliacaoDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Avaliacao"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
        Avaliacao.Avaliacao_id = lastID

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = Avaliacao

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir Avaliacao"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarAvaliacao = async function (Avaliacao, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosAvaliacao(Avaliacao)

            if (!validar) {

                let validarID = await buscarAvaliacaoID(id)

                if (validarID.status_code == 200) {

                    let idAvaliacao = Number(id)

                    let dados = Avaliacao
                    delete dados.id

                    let resultAvaliacaos = await avaliacaoDAO.setUpdateReview(dados, idAvaliacao)

                    if (resultAvaliacaos) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Avaliacao = Avaliacao

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar Avaliacao"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar Avaliacao"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar Avaliacao"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirAvaliacao = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarAvaliacaoID(id)

            if (validarID.status_code == 200) {

                let resultAvaliacaos = await avaliacaoDAO.setDeleteReview(Number(id))

                if (resultAvaliacaos) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Avaliacao = resultAvaliacaos
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir Avaliacao"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir Avaliacao"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir Avaliacao"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosAvaliacao = async function (Avaliacao) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    const nota = Number(Avaliacao.nota)

    if (Avaliacao.nota == '' || Avaliacao.nota == undefined || Avaliacao.nota == null || isNaN(nota)|| nota < 1 || nota > 5) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[nota incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Avaliacao.comentario && Avaliacao.comentario.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarAvaliacoes,
    buscarAvaliacaoID,
    inserirAvaliacoes,
    atualizarAvaliacao,
    excluirAvaliacao
}