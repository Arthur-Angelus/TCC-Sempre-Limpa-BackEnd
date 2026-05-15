/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela relacionamento cesto_roupa
 * Data: 14/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/
const recebeDAO = require('../model/DAO/cesto_roupa.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const listarCesto_roupas = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultRecebimentos = await recebeDAO.getSelectAllReceive()

        if (resultRecebimentos) {
            if (resultRecebimentos.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.cesto_roupa = resultRecebimentos

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar cesto_roupa"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar cesto_roupa"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar cesto_roupa"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarCesto_roupaFK = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultRecebe = await recebeDAO.getSelectReceiveById(Number(id))

            if (resultRecebe) {
                if (resultRecebe.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.cesto_roupa = resultRecebe

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar cesto_roupa id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar cesto_roupa id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar cesto_roupa id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirCesto_roupas = async function (cesto_roupa, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir cesto_roupa"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosCesto_roupa(cesto_roupa)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultRecebes = await recebeDAO.setInsertReceive(cesto_roupa)

        if (!resultRecebes) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir cesto_roupa"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = cesto_roupa

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir cesto_roupa"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// const atualizarCesto_roupa = async function (cesto_roupa, fk_cesto_id, fk_roupa_id, contentType) {
//     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

//     try {
//         // 1. content-type
//         if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
//             MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar cesto_roupa"
//             return MESSAGES.ERROR_CONTENT_TYPE
//         }

//         // 2. valida body
//         if (!cesto_roupa || typeof cesto_roupa !== 'object') {
//             MESSAGES.ERROR_REQUIRED_FIELDS.message = "[body inválido]"
//             return MESSAGES.ERROR_REQUIRED_FIELDS
//         }

//         let validar = await validarDadosCesto_roupa(cesto_roupa)
//         if (validar) return validar

//         // 3. valida existência
//         let validarID = await buscarCesto_roupaFK(fk_cesto_id)
//         if (validarID.status_code != 200) return validarID

//         // 4. UPDATE correto (PK composta)
//         let resultRecebes = await recebeDAO.setUpdateReceive(
//             fk_cesto_id,
//             fk_roupa_id,
//             cesto_roupa
//         )

//         if (!resultRecebes) {
//             MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar cesto_roupa"
//             return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
//         }

//         // 5. resposta
//         MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
//         MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
//         MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
//         MESSAGES.DEFAULT_HEADER.items.cesto_roupa = {
//             fk_cesto_id,
//             fk_roupa_id,
//             ...cesto_roupa
//         }

//         return MESSAGES.DEFAULT_HEADER

//     } catch (error) {
//         console.log(error)

//         MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar cesto_roupa"
//         return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
//     }
// }

const excluirCesto_roupa = async function (fk_cesto_id, fk_roupa_id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        // valida IDs
        if (
            isNaN(fk_cesto_id) || fk_cesto_id == '' || fk_cesto_id == null || fk_cesto_id <= 0 ||
            isNaN(fk_roupa_id) || fk_roupa_id == '' || fk_roupa_id == null || fk_roupa_id <= 0
        ) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [IDs incorretos]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        // executa delete
        let resultRecebes = await recebeDAO.setDeleteReceive(
            Number(fk_cesto_id),
            Number(fk_roupa_id)
        )

        if (resultRecebes) {

            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message

            return MESSAGES.DEFAULT_HEADER // 200

        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir cesto_roupa"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir cesto_roupa"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const validarDadosCesto_roupa = async function (cesto_roupa) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (
        cesto_roupa.fk_cesto_id == null ||
        isNaN(cesto_roupa.fk_cesto_id) ||
        cesto_roupa.fk_cesto_id <= 0
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_cesto_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }

    if (
        cesto_roupa.fk_roupa_id == null ||
        isNaN(cesto_roupa.fk_roupa_id) ||
        cesto_roupa.fk_roupa_id <= 0
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_roupas_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }

    if (cesto_roupa.quantidade == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[quantidade inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS;


    } else {
        return false
    }
}

module.exports = {
    listarCesto_roupas,
    buscarCesto_roupaFK,
    inserirCesto_roupas,
    atualizarCesto_roupa,
    excluirCesto_roupa
}