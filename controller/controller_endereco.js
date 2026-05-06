/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do Endereco
 * Data: 05/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
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
                return MESSAGES.ERROR_NOT_FOUND + "controller listar enderecos"//404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL + "controller listar enderecos"//500
        }
    } catch (error) {
        //console.log error
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER + "controller listar enderecos"//500
    }
}

const buscarEnderecoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultEnderecos = await enderecoDAO.getSelectUserById(Number(id))

            if (resultEnderecos) {
                if (resultEnderecos.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Endereco = resultEnderecos

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND + "controller buscar endereco id"//404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL + "controller buscar endereco id"//500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER + "controller buscar endereco id"//500
    }
}

const inserirEnderecos = async function (Endereco, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosEndereco(Endereco)

            if (!validar) {
                let resultEnderecos = await enderecoDAO.setInsertAdress(Endereco)

                if (resultEnderecos) {
                    let lastID = await enderecoDAO.getSelectLastID()
                    if (lastID) {
                        Endereco.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = Endereco

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL + "controller inserir endereco"//500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL + "controller inserir endereco"//500
                }
            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE + "controller inserir endereco"//415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER + "controller inserir endereco"//500
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

                    Endereco.id = Number(id)

                    let resultEnderecos = await enderecoDAO.setUpdateAdress(Endereco)

                    if (resultEnderecos) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Endereco = Endereco

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL + "controller atualizar endereco"//500
                    }
                } else {
                    return validarID 
                }
            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE + "controller atualizar endereco"//415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER + "controller atualizar endereco"//500
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
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL + "controller atualizar endereco"//500
                }
            } else {
                return MESSAGES.ERROR_NOT_FOUND + "controller atualizar endereco"//404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER + "controller atualizar endereco"//500
    }
}

const validarDadosEndereco = async function (Endereco) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (Endereco.cep == '' || Endereco.cep == undefined || Endereco.cep == null || Endereco.cep.length > 9) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[CEP incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.uf == '' || Endereco.uf == undefined || Endereco.uf == null || Endereco.uf.length > 2) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [UF incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.cidade == '' || Endereco.cidade == undefined || Endereco.cidade == null || Endereco.cidade.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Cidade incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.bairro == '' || Endereco.bairro == undefined || Endereco.bairro == null || Endereco.bairro.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Bairro incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.logradouro == '' || Endereco.logradouro == undefined || Endereco.logradouro == null || Endereco.logradouro.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Logradouro incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.numero == '' || Endereco.numero == undefined || Endereco.numero == null || Endereco.numero.length > 4) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Numero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Endereco.complemento == '' || Endereco.complemento == undefined || Endereco.complemento == null || Endereco.complemento.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Complemento incorreto]'
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