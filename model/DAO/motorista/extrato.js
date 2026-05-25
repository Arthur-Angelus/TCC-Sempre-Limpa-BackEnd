/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do extrato
 * Data: 25/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../../db')

// SELECT ALL
const getSelectAllExtract = async function () {
    try {
        const result = await knex.select('*').from('extrato')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectExtractById = async function (extrato_id) {
    try {
        const result = await knex('extrato')
            .select('*')
            .where({ extrato_id: extrato_id })

            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertExtract = async function (extrato) {
    try {
        const result = await knex('extrato').insert({
            taxa_motorista: extrato.taxa_motorista,
            taxa_km: extrato.taxa_km,
            fk_motorista_id: extrato.fk_motorista_id,
            fk_pedido_id: extrato.fk_pedido_id
        })
        return result
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdateExtract = async function (extrato, extrato_id) {
    try {
        const result = await knex('extrato')
            .where({ extrato_id: extrato_id })
            .update({
                taxa_motorista: extrato.taxa_motorista,
                taxa_km: extrato.taxa_km,
                fk_motorista_id: extrato.fk_motorista_id,
                fk_pedido_id: extrato.fk_pedido_id
            })
            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteExtract = async function (extrato_id) {
    try {
        const result = await knex('extrato')
            .where({ extrato_id: extrato_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (extrato_id) {
    try {
        const result = await knex('extrato')
            .select('extrato_id')
            .orderBy('extrato_id', 'desc')
            .first()

        return result ? result.extrato_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllExtract,
    getSelectExtractById,
    setInsertExtract,
    setUpdateExtract,
    setDeleteExtract,
    getSelectLastID
}