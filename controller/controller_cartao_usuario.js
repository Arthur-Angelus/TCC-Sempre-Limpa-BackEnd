/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela relacionamento cartao_usuario
 * Data: 14/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/
const cartao_usuarioDAO = require('../model/DAO/cartao_usuario.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const listarCartao_usuarios = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultRecebimentos = await cartao_usuarioDAO.getSelectAllHave()

        if (resultRecebimentos) {
            if (resultRecebimentos.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.cartao_usuario = resultRecebimentos

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar cartao_usuario"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar cartao_usuario"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar cartao_usuario"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarCartao_usuarioFK = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultRecebe = await cartao_usuarioDAO.getSelectHaveById(Number(id))

            if (resultRecebe) {
                if (resultRecebe.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.cartao_usuario = resultRecebe

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar cartao_usuario id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar cartao_usuario id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar cartao_usuario id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirCartao_usuarios = async function (cartao_usuario, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir cartao_usuario"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosCartao_usuario(cartao_usuario)

        if (validar) {
            return validar
        }

        // chama DAO
        let resultRecebes = await cartao_usuarioDAO.setInsertHave(cartao_usuario)

        if (!resultRecebes) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir cartao_usuario"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = cartao_usuario

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir cartao_usuario"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// const atualizarcartao_usuario = async function (cartao_usuario, fk_usuario_id, fk_cartao_id, contentType) {
//     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

//     try {
//         // 1. content-type
//         if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
//             MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar cartao_usuario"
//             return MESSAGES.ERROR_CONTENT_TYPE
//         }

//         // 2. valida body
//         if (!cartao_usuario || typeof cartao_usuario !== 'object') {
//             MESSAGES.ERROR_REQUIRED_FIELDS.message = "[body inválido]"
//             return MESSAGES.ERROR_REQUIRED_FIELDS
//         }

//         let validar = await validarDadoscartao_usuario(cartao_usuario)
//         if (validar) return validar

//         // 3. valida existência
//         let validarID = await buscarcartao_usuarioFK(fk_usuario_id)
//         if (validarID.status_code != 200) return validarID

//         // 4. UPDATE correto (PK composta)
//         let resultRecebes = await recebeDAO.setUpdateHave(
//             fk_usuario_id,
//             fk_cartao_id,
//             cartao_usuario
//         )

//         if (!resultRecebes) {
//             MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar cartao_usuario"
//             return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
//         }

//         // 5. resposta
//         MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
//         MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
//         MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
//         MESSAGES.DEFAULT_HEADER.items.cartao_usuario = {
//             fk_usuario_id,
//             fk_cartao_id,
//             ...cartao_usuario
//         }

//         return MESSAGES.DEFAULT_HEADER

//     } catch (error) {
//         console.log(error)

//         MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar cartao_usuario"
//         return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
//     }
// }

const excluirCartao_usuario = async function (fk_usuario_id, fk_cartao_id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        // valida IDs
        if (
            isNaN(fk_usuario_id) || fk_usuario_id == '' || fk_usuario_id == null || fk_usuario_id <= 0 ||
            isNaN(fk_cartao_id) || fk_cartao_id == '' || fk_cartao_id == null || fk_cartao_id <= 0
        ) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [IDs incorretos]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        // executa delete
        let resultRecebes = await cartao_usuarioDAO.setDeleteHave(
            Number(fk_usuario_id),
            Number(fk_cartao_id)
        )

        if (resultRecebes) {

            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message

            return MESSAGES.DEFAULT_HEADER // 200

        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir cartao_usuario"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir cartao_usuario"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const validarDadosCartao_usuario = async function (cartao_usuario) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (
        cartao_usuario.fk_usuario_id == null ||
        isNaN(cartao_usuario.fk_usuario_id) ||
        cartao_usuario.fk_usuario_id <= 0
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_usuario_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS;
    }

    if (
        cartao_usuario.fk_cartao_id == null ||
        isNaN(cartao_usuario.fk_cartao_id) ||
        cartao_usuario.fk_cartao_id <= 0
    ) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_roupas_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS;


    } else {
        return false
    }
}

module.exports = {
    listarCartao_usuarios,
    buscarCartao_usuarioFK,
    inserirCartao_usuarios,
    // atualizarcartao_usuario,
    excluirCartao_usuario
}