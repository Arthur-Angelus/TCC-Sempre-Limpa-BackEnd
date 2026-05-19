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
// INSERT CESTO
const setInsertCesto = async function (cesto) {
    try {
        const result = await knex('cesto').insert({
            peso_estimado: cesto.peso_estimado,
            secagem: cesto.secagem,
            tipo_lavagem: cesto.tipo_lavagem,
            fk_pedido_id: cesto.fk_pedido_id
        })
        return result.map(cesto => {
            return cesto
        })
    } catch (error) {
        console.error("ERRO NO DAO INSERT:", error)
        throw error
    }
}
// UPDATE CESTO
const setUpdateCesto = async function (cesto, cesto_id) {
    try {
        const result = await knex('cesto')
            .where({ cesto_id: cesto_id })
            .update({
                peso_estimado: cesto.peso_estimado,
                secagem: cesto.secagem,
                tipo_lavagem: cesto.tipo_lavagem,
                fk_pedido_id: cesto.fk_pedido_id
            })
        return result
    } catch (error) {
        console.error("ERRO NO DAO UPDATE:",error)
        return false
    }
}
// GET LAST ID
const getSelectLastID = async function (cesto_id) {
    try {
        const result = await knex('cesto')
            .select('cesto_id')
            .orderBy('cesto_id', 'desc')
            .first()

        return result ? result.cesto_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllCesto,
    getSelectCestoById,
    setInsertCesto,
    setUpdateCesto,
    getSelectLastID 
}
    
