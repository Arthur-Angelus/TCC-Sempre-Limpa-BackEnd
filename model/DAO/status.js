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
        const rows = await knex.select('*').from('status_pedido')
        return rows.map(status_pedido => {
            return status_pedido
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// SELECT STATUS BY ID
const getSelectStatusById = async function (status_pedido_id) {
    try {
        const rows = await knex('status_pedido')
            .select('*')
            .where({ status_pedido_id: status_pedido_id })

        return rows.map(s => {
            return s
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// INSERT STATUS
const setInsertStatus = async function (status_pedido) {
    try {
        const result = await knex('status_pedido').insert({
            progresso: status_pedido.progresso
        })
        return result.map(status_pedido => {
            return status_pedido
        })
    } catch (error) {
        console.error("ERRO NO DAO INSERT:", error)
        throw error
    }
}
// UPDATE STATUS
const setUpdateStatus = async function (status_pedido, status_pedido_id) {
    try {
        const result = await knex('status_pedido')
            .where({ status_pedido_id: status_pedido_id })
            .update({
                progresso: status_pedido.progresso
            })
        return result
    } catch (error) {
        console.error("ERRO NO DAO UPDATE:",error)
        return false
    }
}
// DELETE
const setDeleteStatus = async function (status_pedido_id) {
    try {
        const result = await knex('status_pedido')
            .where({ status_pedido_id: status_pedido_id })
            .del()

        return result
    } catch (error) {
        console.error("ERRO NO DAO DELETE:",error)
        return false
    }
}
// GET LAST ID
const getSelectLastID = async function (status_pedido_id) {
    try {
        const result = await knex('status_pedido')
            .select('status_pedido_id')
            .orderBy('status_pedido_id', 'desc')
            .first()

        return result ? result.status_pedido_id : null
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