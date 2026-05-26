/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do Endereço do motorista
 * Data: 18/05/2026
 * Autor: Weslei Santos
 * Versão: 1.0
 *******************************************************************************************/

const enderecoMotoristaDAO = require('../../model/DAO/motorista/endereco_motorista')
const DEFAULT_MESSAGES = require('../module/config_messages.js')

/* LISTAR TODOS */
const listarTodosEnderecosMotorista = async function () {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let resultEnderecosMotorista =
            await enderecoMotoristaDAO.getSelectAllEnderecoMotorista()

        if (resultEnderecosMotorista) {

            if (resultEnderecosMotorista.length > 0) {

                MESSAGES.DEFAULT_HEADER.status =
                    MESSAGES.SUCCESS_REQUEST.status

                MESSAGES.DEFAULT_HEADER.status_code =
                    MESSAGES.SUCCESS_REQUEST.status_code

                MESSAGES.DEFAULT_HEADER.items.enderecoMotorista =
                    resultEnderecosMotorista

                return MESSAGES.DEFAULT_HEADER

            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {

        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/* LISTAR POR ID */
const listarEnderecoMotoristaPorId = async function (id) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultEnderecosMotorista =
                await enderecoMotoristaDAO.getSelectAllEnderecoMotorista(Number(id))

            if (resultEnderecosMotorista !== false) {

                if (resultEnderecosMotorista !== undefined) {

                    MESSAGES.DEFAULT_HEADER.status =
                        MESSAGES.SUCCESS_REQUEST.status

                    MESSAGES.DEFAULT_HEADER.status_code =
                        MESSAGES.SUCCESS_REQUEST.status_code

                    MESSAGES.DEFAULT_HEADER.items.enderecoMotorista =
                        resultEnderecosMotorista

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'

            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {

        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/* INSERIR */
const inserirEnderecoMotorista = async function (
    dadosEndereco,
    contentType
) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar =
                await validarDadosEnderecoMotorista(dadosEndereco)

            if (!validar) {

                let resultEnderecosMotorista =
                    await enderecoMotoristaDAO.setInsertEnderecoMotorista(dadosEndereco)

                if (resultEnderecosMotorista) {

                    dadosEndereco.id = resultEnderecosMotorista

                    MESSAGES.DEFAULT_HEADER.status =
                        MESSAGES.SUCCESS_CREATED_ITEM.status

                    MESSAGES.DEFAULT_HEADER.status_code =
                        MESSAGES.SUCCESS_CREATED_ITEM.status_code

                    MESSAGES.DEFAULT_HEADER.items.enderecoMotorista =
                        dadosEndereco

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }

            } else {
                return validar
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }

    } catch (error) {

        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/* ATUALIZAR */
const atualizarEnderecoMotorista = async function (
    enderecoMotorista,
    id_endereco_motorista,
    contentType
) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar =
                await validarDadosEnderecoMotorista(enderecoMotorista)

            if (!validar) {

                let validarID =
                    await listarEnderecoMotoristaPorId(id_endereco_motorista)

                if (validarID.status_code == 200) {

                    let idEnderecoMotorista =
                        Number(id_endereco_motorista)

                    let dados = enderecoMotorista

                    let resultEnderecosMotorista =
                        await enderecoMotoristaDAO.setUpdateEnderecoMotorista(
                            idEnderecoMotorista,
                            dados
                        )

                    if (resultEnderecosMotorista) {

                        dados.id = idEnderecoMotorista

                        MESSAGES.DEFAULT_HEADER.status =
                            MESSAGES.SUCCESS_UPDATED_ITEM.status

                        MESSAGES.DEFAULT_HEADER.status_code =
                            MESSAGES.SUCCESS_UPDATED_ITEM.status_code

                        MESSAGES.DEFAULT_HEADER.message =
                            MESSAGES.SUCCESS_UPDATED_ITEM.message

                        MESSAGES.DEFAULT_HEADER.items.enderecoMotorista =
                            dados

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

        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/* DELETAR */
const deletarEnderecoMotorista = async function (
    id_endereco_motorista
) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        let validarID =
            await listarEnderecoMotoristaPorId(id_endereco_motorista)

        if (validarID.status_code == 200) {

            let idEnderecoMotorista =
                Number(id_endereco_motorista)

            let resultDelete =
                await enderecoMotoristaDAO.setDeleteEnderecoMotorista(
                    idEnderecoMotorista
                )

            if (resultDelete) {

                MESSAGES.DEFAULT_HEADER.status =
                    MESSAGES.SUCCESS_DELETED_ITEM.status

                MESSAGES.DEFAULT_HEADER.status_code =
                    MESSAGES.SUCCESS_DELETED_ITEM.status_code

                MESSAGES.DEFAULT_HEADER.message =
                    MESSAGES.SUCCESS_DELETED_ITEM.message

                MESSAGES.DEFAULT_HEADER.items.enderecoMotorista = {
                    id: idEnderecoMotorista
                }

                return MESSAGES.DEFAULT_HEADER

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return validarID
        }

    } catch (error) {

        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

/* VALIDAR DADOS */
const validarDadosEnderecoMotorista = async function (
    enderecoMotorista
) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (
        enderecoMotorista.cep == '' ||
        enderecoMotorista.cep == undefined ||
        enderecoMotorista.cep == null ||
        enderecoMotorista.cep.length != 8 ||
        !/^\d+$/.test(enderecoMotorista.cep)
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CEP incorreto]'

        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        enderecoMotorista.uf == '' ||
        enderecoMotorista.uf == undefined ||
        enderecoMotorista.uf == null ||
        enderecoMotorista.uf.length > 2
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [UF incorreto]'

        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        enderecoMotorista.cidade == '' ||
        enderecoMotorista.cidade == undefined ||
        enderecoMotorista.cidade == null ||
        enderecoMotorista.cidade.length > 100
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Cidade incorreta]'

        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        enderecoMotorista.bairro == '' ||
        enderecoMotorista.bairro == undefined ||
        enderecoMotorista.bairro == null ||
        enderecoMotorista.bairro.length > 100
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Bairro incorreto]'

        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        enderecoMotorista.logradouro == '' ||
        enderecoMotorista.logradouro == undefined ||
        enderecoMotorista.logradouro == null ||
        enderecoMotorista.logradouro.length > 100
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Logradouro incorreto]'

        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        enderecoMotorista.numero == '' ||
        enderecoMotorista.numero == undefined ||
        enderecoMotorista.numero == null ||
        enderecoMotorista.numero.length > 4
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Número incorreto]'

        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (
        enderecoMotorista.complemento &&
        enderecoMotorista.complemento.length > 100
    ) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Complemento incorreto]'

        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {

        return false
    }
}

module.exports = {
    listarTodosEnderecosMotorista,
    listarEnderecoMotoristaPorId,
    inserirEnderecoMotorista,
    atualizarEnderecoMotorista,
    deletarEnderecoMotorista,
    validarDadosEnderecoMotorista
}