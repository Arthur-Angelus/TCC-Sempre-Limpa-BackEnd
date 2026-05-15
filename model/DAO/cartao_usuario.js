/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da relação entre tabelas denominada cartao_usuario
 * Data: 15/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

// SELECT ALL
const getSelectAllHave = async function () {
    try {
        const result = await knex.select('*').from('cartao_usuario')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectHaveById = async function (fk_usuario_id) {
    try {
        const result = await knex('cartao_usuario')
            .select('*')
            .where({ fk_usuario_id: fk_usuario_id })

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertHave = async function (cartao_usuario) {
    try {
        const result = await knex('cartao_usuario').insert({
            fk_usuario_id: cartao_usuario.fk_usuario_id,
            fk_cartao_id: cartao_usuario.fk_cartao_id
        })
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// UPDATE
// const setUpdateHave = async function (fk_usuario_id, fk_cartao_id, cartao_usuario) {
//     try {

//         if (!cartao_usuario) {
//             throw new Error("cartao_usuario está undefined")
//         }

//         const result = await knex('cartao_usuario')
//             .where({
//                 fk_usuario_id: fk_usuario_id,
//                 fk_cartao_id: fk_cartao_id
//             })
//             .update({
//                 quantidade: cartao_usuario.quantidade
//             })

//         return result

//     } catch (error) {
//         console.error("🔥 DAO UPDATE ERROR:", error.message)
//         return false
//     }
// }

// DELETE
const setDeleteHave = async function (fk_usuario_id, fk_cartao_id) {
    try {
        const result = await knex('cartao_usuario')
            .where({ fk_usuario_id: fk_usuario_id, fk_cartao_id: fk_cartao_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    getSelectAllHave,
    getSelectHaveById,
    setInsertHave,
    // setUpdateHave,
    setDeleteHave
}