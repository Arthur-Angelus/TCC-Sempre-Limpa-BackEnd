/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da tabela cesto
 * Data de Criação: 14/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

// CESTO ALL
const getSelectAllCesto = async function () {
    try {
        const rows = await knex.select('*').from('cesto')
        return rows.map(cesto => {
            return cesto
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// SELECT CESTO BY ID
const getSelectCestoById = async function (cesto_id) {
    try {
        const rows = await knex('cesto')
            .select('*')
            .where({ cesto_id: cesto_id })

        return rows.map(cesto => {
            return cesto
        })
    } catch (error) {
        console.error(error)
        return false
    }
}


module.exports = {
    getSelectAllCesto,
    getSelectCestoById
}