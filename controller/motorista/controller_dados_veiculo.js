/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do endereço do dados_veiculo
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/
const dados_veiculoDAO = require('../../model/DAO/motorista/dados_veiculo.js')
const DEFAULT_MESSAGES = require('../module/config_messages.js')

const listarDadosVeiculo = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultDadosVeiculo = await dados_veiculoDAO.getSelectAllVehicleData()

        if (resultDadosVeiculo) {
            if (resultDadosVeiculo.length > 0) {
                MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_REQUEST.marca
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.DadosVeiculo = resultDadosVeiculo

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar DadosVeiculo"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar DadosVeiculo"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar DadosVeiculo"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarDadosVeiculoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultDadosVeiculo = await dados_veiculoDAO.getSelectVehicleDataById(Number(id))

            if (resultDadosVeiculo) {
                if (resultDadosVeiculo.length > 0) {
                    MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_REQUEST.marca
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.DadosVeiculo = resultDadosVeiculo

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar DadosVeiculo id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar DadosVeiculo id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar DadosVeiculo id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirDadosVeiculo = async function (DadosVeiculo, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir DadosVeiculo"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosVeiculo(DadosVeiculo)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultDadosVeiculo = await dados_veiculoDAO.setInsertVehicleData(DadosVeiculo)

        if (!resultDadosVeiculo) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir DadosVeiculo"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await dados_veiculoDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir DadosVeiculo"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
        DadosVeiculo.DadosVeiculo_id = lastID

        MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_CREATED_ITEM.marca
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = DadosVeiculo

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir DadosVeiculo"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarDadosVeiculo = async function (DadosVeiculo, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosVeiculo(DadosVeiculo)

            if (!validar) {

                let validarID = await buscarDadosVeiculoID(id)

                if (validarID.status_code == 200) {

                    let idDadosVeiculo = Number(id)

                    let dados = DadosVeiculo
                    delete dados.id

                    let resultDadosVeiculo = await dados_veiculoDAO.setUpdateVehicleData(dados, idDadosVeiculo)

                    if (resultDadosVeiculo) {
                        MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_UPDATED_ITEM.marca
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.DadosVeiculo = DadosVeiculo

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar DadosVeiculo"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar DadosVeiculo"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar DadosVeiculo"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirDadosVeiculo = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarDadosVeiculoID(id)

            if (validarID.status_code == 200) {

                let resultDadosVeiculo = await dados_veiculoDAO.setDeleteVehicleData(Number(id))

                if (resultDadosVeiculo) {

                    MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_DELETED_ITEM.marca
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.DadosVeiculo = resultDadosVeiculo
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir DadosVeiculo"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir DadosVeiculo"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir DadosVeiculo"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosVeiculo = async function (DadosVeiculo) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (DadosVeiculo.placa == '' || DadosVeiculo.placa == undefined || DadosVeiculo.placa == null ||DadosVeiculo.placa.length > 7) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[placa incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (DadosVeiculo.modelo == '' || DadosVeiculo.modelo == undefined || DadosVeiculo.modelo == null || DadosVeiculo.modelo.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [modelo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (DadosVeiculo.marca == '' || DadosVeiculo.marca == undefined || DadosVeiculo.marca == null || DadosVeiculo.marca.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [marca incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (DadosVeiculo.ano_modelo == '' || DadosVeiculo.ano_modelo == undefined || DadosVeiculo.ano_modelo == null || isNaN(DadosVeiculo.ano_modelo)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ano_modelo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (DadosVeiculo.ano_fabricacao == null || DadosVeiculo.ano_fabricacao == '' || DadosVeiculo.ano_fabricacao == undefined || isNaN(DadosVeiculo.ano_fabricacao)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[ano_fabricacao inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS;

    } else if (DadosVeiculo.cor == null || DadosVeiculo.cor == '' || DadosVeiculo.cor == undefined || DadosVeiculo.cor.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[cor inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarDadosVeiculo,
    buscarDadosVeiculoID,
    inserirDadosVeiculo,
    atualizarDadosVeiculo,
    excluirDadosVeiculo,
    validarDadosVeiculo
}