/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do Endereco lavanderia
 * Data: 11/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const enderecoLavanderiaDAO = require('../model/DAO/endereco_lavanderia.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const listarTodosEnderecosLavanderias = async function (){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultEnderecos = await enderecoLavanderiaDAO.getSelectAllAddresLaundry()
        if(resultEnderecos){
            if(resultEnderecos.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.enderecoLavanderia =resultEnderecos
                
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarEnderecoLavanderiaPorId = async function(id){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
         if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultEnderecosLavanderia = await enderecoLavanderiaDAO.getSelectAddresLaundryById(Number(id))
            if(resultEnderecosLavanderia){
                if(resultEnderecosLavanderia.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.enderecoLavanderia =resultEnderecos

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const validarDadosEnderecoLavanderia = async function (EnderecoLavanderia) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (EnderecoLavanderia.cep == '' || EnderecoLavanderia.cep == undefined || EnderecoLavanderia.cep == null || EnderecoLavanderia.cep.length > 8) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[CEP incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (EnderecoLavanderia.uf == '' || EnderecoLavanderia.uf == undefined || EnderecoLavanderia.uf == null || EnderecoLavanderia.uf.length > 2) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [UF incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (EnderecoLavanderia.cidade == '' || EnderecoLavanderia.cidade == undefined || EnderecoLavanderia.cidade == null || EnderecoLavanderia.cidade.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Cidade incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (EnderecoLavanderia.bairro == '' || EnderecoLavanderia.bairro == undefined || EnderecoLavanderia.bairro == null || EnderecoLavanderia.bairro.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Bairro incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (EnderecoLavanderia.logradouro == '' || EnderecoLavanderia.logradouro == undefined || EnderecoLavanderia.logradouro == null || EnderecoLavanderia.logradouro.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Logradouro incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (EnderecoLavanderia.numero == '' || EnderecoLavanderia.numero == undefined || EnderecoLavanderia.numero == null || EnderecoLavanderia.numero.length > 4) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Numero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (EnderecoLavanderia.complemento == '' || EnderecoLavanderia.complemento == undefined || EnderecoLavanderia.complemento == null || EnderecoLavanderia.complemento.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Complemento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarTodosEnderecosLavanderias,
    listarEnderecoLavanderiaPorId
}