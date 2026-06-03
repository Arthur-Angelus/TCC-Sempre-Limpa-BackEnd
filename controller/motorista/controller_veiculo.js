/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do endereço do dados_veiculo
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/
const veiculoDAO = require('../../model/DAO/motorista/veiculo.js')
const DEFAULT_MESSAGES = require('../module/config_messages.js')

const listarVeiculo = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultVeiculo = await veiculoDAO.getSelectAllVehicle()

        if (resultVeiculo) {
            if (resultVeiculo.length > 0) {
                MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_REQUEST.marca
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Veiculo = resultVeiculo

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Veiculo"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Veiculo"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Veiculo"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarVeiculoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultVeiculo = await veiculoDAO.getSelectVehicleById(Number(id))

            if (resultVeiculo) {
                if (resultVeiculo.length > 0) {
                    MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_REQUEST.marca
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Veiculo = resultVeiculo

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Veiculo id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Veiculo id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Veiculo id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirVeiculo = async function (Veiculo, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir Veiculo"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosVeiculo(Veiculo)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultVeiculo = await veiculoDAO.setInsertVehicle(Veiculo)

        if (!resultVeiculo) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Veiculo"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await veiculoDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Veiculo"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
        Veiculo.Veiculo_id = lastID

        MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_CREATED_ITEM.marca
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = Veiculo

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir Veiculo"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarVeiculo = async function (Veiculo, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosVeiculo(Veiculo)

            if (!validar) {

                let validarID = await buscarVeiculoID(id)

                if (validarID.status_code == 200) {

                    let idVeiculo = Number(id)

                    let dados = Veiculo
                    delete dados.id

                    let resultVeiculo = await veiculoDAO.setUpdateVehicle(dados, idVeiculo)

                    if (resultVeiculo) {
                        MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_UPDATED_ITEM.marca
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Veiculo = Veiculo

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar Veiculo"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar Veiculo"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar Veiculo"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirVeiculo = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarVeiculoID(id)

            if (validarID.status_code == 200) {

                let resultVeiculo = await veiculoDAO.setDeleteVehicle(Number(id))

                if (resultVeiculo) {

                    MESSAGES.DEFAULT_HEADER.marca = MESSAGES.SUCCESS_DELETED_ITEM.marca
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Veiculo = resultVeiculo
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir Veiculo"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir Veiculo"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir Veiculo"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosVeiculo = async function (Veiculo) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    const modalidadesValidas = ['bike', 'carro', 'motocicleta']

    if (
        !Veiculo.modalidade ||
        !modalidadesValidas.includes(Veiculo.modalidade)
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [modalidade inválida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    if (!Veiculo.dados || typeof Veiculo.dados !== 'object') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [dados do veículo inválidos]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }

    return false
}

module.exports = {
    listarVeiculo,
    buscarVeiculoID,
    inserirVeiculo,
    atualizarVeiculo,
    excluirVeiculo,
    validarDadosVeiculo
}