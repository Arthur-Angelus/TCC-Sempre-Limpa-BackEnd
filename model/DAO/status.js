/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da tabela status_pedido
 * Data: 11/05/2026
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

module.exports = {
    getSelectAllStatus,
    getSelectStatusById
}