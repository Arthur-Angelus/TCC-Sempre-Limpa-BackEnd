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
        let resultEnderecosLavanderia = await enderecoLavanderiaDAO.getSelectAllAddresLaundry()
        if(resultEnderecosLavanderia){
            if(resultEnderecosLavanderia.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.enderecoLavanderia = resultEnderecosLavanderia
                
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
            
            if(resultEnderecosLavanderia !== false){
                
                if(resultEnderecosLavanderia !== undefined) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.enderecoLavanderia = resultEnderecosLavanderia

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
                
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
            
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const inserirEnderecoLavanderia = async function(dadosEndereco, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosEnderecoLavanderia(dadosEndereco)
            if(!validar){
                let resultEnderecosLavanderia = await enderecoLavanderiaDAO.setInsertAddresLaundry(dadosEndereco)
                if (resultEnderecosLavanderia){
                    dadosEndereco.id = resultEnderecosLavanderia
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.enderecoLavanderia = dadosEndereco

                    return MESSAGES.DEFAULT_HEADER
                } else { 
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else{
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarEnderecoLavanderia = async function(enderecoLavanderia, id_endereco_lavanderia, contentType){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosEnderecoLavanderia(enderecoLavanderia)
            if(!validar){
                let validarID = await listarEnderecoLavanderiaPorId(id_endereco_lavanderia)
                if (validarID.status_code == 200) {
                    let idEnderecoLavanderia = Number(id_endereco_lavanderia)
                    let dados = enderecoLavanderia

                    let resultEnderecosLavanderia = await enderecoLavanderiaDAO.setUpdateAddresLaundry(idEnderecoLavanderia, dados)
                    if (resultEnderecosLavanderia){
                        dados.id = idEnderecoLavanderia

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.enderecoLavanderia = dados

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validarID
                }
            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const deletarEnderecoLavanderia = async function(id_endereco_lavanderia){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
     
        let validarID = await listarEnderecoLavanderiaPorId(id_endereco_lavanderia)
        
        if (validarID.status_code == 200) {
            let idEnderecoLavanderia = Number(id_endereco_lavanderia)

 
            let resultDelete = await enderecoLavanderiaDAO.setDeleteAdressLaundry(idEnderecoLavanderia)
            
            if (resultDelete){
              
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                MESSAGES.DEFAULT_HEADER.items.enderecoLavanderia = { id: idEnderecoLavanderia }

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            
            return validarID 
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const validarDadosEnderecoLavanderia = async function (EnderecoLavanderia) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (EnderecoLavanderia.cep == '' || EnderecoLavanderia.cep == undefined || EnderecoLavanderia.cep == null || EnderecoLavanderia.cep.length != 8 || !isNaN(EnderecoLavanderia)) {
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

    } else if (EnderecoLavanderia.complemento.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Complemento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarTodosEnderecosLavanderias,
    listarEnderecoLavanderiaPorId,
    inserirEnderecoLavanderia,
    atualizarEnderecoLavanderia,
    deletarEnderecoLavanderia,
    validarDadosEnderecoLavanderia
}