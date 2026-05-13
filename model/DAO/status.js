/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da tabela status_pedido
 * Data de Criação: 11/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

// SELECT ALL
const getSelectAllStatus = async function () {
    try {
        const rows = await knex.select('*').from('status')
        return rows.map(status => {
            return status
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// SELECT STATUS BY ID
const getSelectStatusById = async function (status_id) {
    try {
        const rows = await knex('status')
            .select('*')
            .where({ status_id: status_id })

        return rows.map(s => {
            return s
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// INSERT STATUS
const setInsertStatus = async function (status) {
    try {
        const result = await knex('status').insert({
            descricao: status.descricao
        })
        return result.map(status => {
            return status
        })
    } catch (error) {
        console.error("ERRO NO DAO INSERT:", error)
        throw error
    }
}
// UPDATE STATUS
const setUpdateStatus = async function (status, status_id) {
    try {
        const result = await knex('status')
            .where({ status_id: status_id })
            .update({
                descricao: status.descricao
            })
        return result
    } catch (error) {
        console.error("ERRO NO DAO UPDATE:",error)
        return false
    }
}
// DELETE
const setDeleteStatus = async function (status_id) {
    try {
        const result = await knex('status')
            .where({ status_id: status_id })
            .del()

        return result
    } catch (error) {
        console.error("ERRO NO DAO DELETE:",error)
        return false
    }
}
// GET LAST ID
const getSelectLastID = async function (status_id) {
    try {
        const result = await knex('status')
            .select('status_id')
            .orderBy('status_id', 'desc')
            .first()

        return result ? result.status_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllStatus,
    getSelectStatusById,
    setInsertStatus,
    setUpdateStatus,
    setDeleteStatus,
    getSelectLastID
}