/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do endereço do Endereco
 * Data: 13/05/2026
 * Autor: Arthur Angelus
 * Versão: 2.0
 *******************************************************************************************/
const enderecoDAO = require('../model/DAO/endereco.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const listarEnderecos = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultEnderecos = await enderecoDAO.getSelectAllAdress()

        if (resultEnderecos) {
            if (resultEnderecos.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Enderecos = resultEnderecos

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Enderecos"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Enderecos"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Enderecos"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarEnderecoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultEnderecos = await enderecoDAO.getSelectAdressById(Number(id))

            if (resultEnderecos) {
                if (resultEnderecos.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Endereco = resultEnderecos

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Endereco id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Endereco id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Endereco id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirEnderecos = async function (Endereco, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir Endereco"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosEndereco(Endereco)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultEnderecos = await enderecoDAO.setInsertAdress(Endereco)

        if (!resultEnderecos) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Endereco"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await enderecoDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Endereco"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
        Endereco.Endereco_id = lastID

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = Endereco

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir Endereco"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarEndereco = async function (Endereco, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosEndereco(Endereco)

            if (!validar) {

                let validarID = await buscarEnderecoID(id)

                if (validarID.status_code == 200) {

                    let idEndereco = Number(id)

                    let dados = Endereco
                    delete dados.id

                    let resultEnderecos = await enderecoDAO.setUpdateAdress(dados, idEndereco)

                    if (resultEnderecos) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Endereco = Endereco

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar Endereco"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar Endereco"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar Endereco"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirEndereco = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarEnderecoID(id)

            if (validarID.status_code == 200) {

                let resultEnderecos = await enderecoDAO.setDeleteAdress(Number(id))

                if (resultEnderecos) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Endereco = resultEnderecos
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir Endereco"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir Endereco"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir Endereco"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosEndereco = async function (Endereco) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (Endereco.cep == '' || Endereco.cep == undefined || Endereco.cep == null || Endereco.cep.length > 11) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[cep incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.uf == '' || Endereco.uf == undefined || Endereco.uf == null || Endereco.uf.length > 2) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [cpf incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.cidade == '' || Endereco.cidade == undefined || Endereco.cidade == null || Endereco.cidade.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [cidade incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.bairro == '' || Endereco.bairro == undefined || Endereco.bairro == null || Endereco.bairro.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CPF incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.logradouro == '' || Endereco.logradouro == undefined || Endereco.logradouro == null || Endereco.logradouro.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.numero == '' || Endereco.numero == undefined || Endereco.numero == null || Endereco.numero.length > 4) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.complemento && Endereco.complemento.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [RNE incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarEnderecos,
    buscarEnderecoID,
    inserirEnderecos,
    atualizarEndereco,
    excluirEndereco
}