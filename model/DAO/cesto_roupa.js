/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da relação entre tabelas denominada cesto_roupa
 * Data: 14/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

// SELECT ALL
const getSelectAllReceive = async function () {
    try {
        const result = await knex.select('*').from('cesto_roupa')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectReceiveById = async function (fk_cesto_id) {
    try {
        const result = await knex('cesto_roupa')
            .select('*')
            .where({ fk_cesto_id: fk_cesto_id })

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertReceive = async function (cesto_roupa) {
    try {
        const result = await knex('cesto_roupa').insert({
            fk_cesto_id: cesto_roupa.fk_cesto_id,
            fk_roupa_id: cesto_roupa.fk_roupa_id,
            quantidade: cesto_roupa.quantidade
        })
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// UPDATE
// const setUpdateReceive = async function (fk_cesto_id, fk_roupa_id, cesto_roupa) {
//     try {

//         if (!cesto_roupa) {
//             throw new Error("cesto_roupa está undefined")
//         }

//         const result = await knex('cesto_roupa')
//             .where({
//                 fk_cesto_id: fk_cesto_id,
//                 fk_roupa_id: fk_roupa_id
//             })
//             .update({
//                 quantidade: cesto_roupa.quantidade
//             })

//         return result

//     } catch (error) {
//         console.error("🔥 DAO UPDATE ERROR:", error.message)
//         return false
//     }
// }

// DELETE
const setDeleteReceive = async function (fk_cesto_id, fk_roupa_id) {
    try {
        const result = await knex('cesto_roupa')
            .where({ fk_cesto_id: fk_cesto_id, fk_roupa_id: fk_roupa_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    getSelectAllReceive,
    getSelectReceiveById,
    setInsertReceive,
    setUpdateReceive,
    setDeleteReceive
}