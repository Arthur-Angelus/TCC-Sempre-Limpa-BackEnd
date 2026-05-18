/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do dados_bancarios
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../../db')

// SELECT ALL
const getSelectAllBankData = async function () {
    try {
        const result = await knex.select('*').from('dados_bancarios')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectBankDataById = async function (dados_bancarios_id) {
    try {
        const result = await knex('dados_bancarios')
            .select('*')
            .where({ dados_bancarios_id: dados_bancarios_id })

            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertBankData = async function (dados_bancarios) {
    try {
        const result = await knex('dados_bancarios').insert({
            digito: dados_bancarios.digito,
            agencia: dados_bancarios.agencia,
            banco: dados_bancarios.banco,
            tipo_conta: dados_bancarios.tipo_conta,
            conta: dados_bancarios.conta
        })
        return result
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdateBankData = async function (dados_bancarios, dados_bancarios_id) {
    try {
        const result = await knex('dados_bancarios')
            .where({ dados_bancarios_id: dados_bancarios_id })
            .update({
                digito: dados_bancarios.digito,
                agencia: dados_bancarios.agencia,
                banco: dados_bancarios.banco,
                tipo_conta: dados_bancarios.tipo_conta,
                conta: dados_bancarios.conta
            })
            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteBankData = async function (dados_bancarios_id) {
    try {
        const result = await knex('dados_bancarios')
            .where({ dados_bancarios_id: dados_bancarios_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (dados_bancarios_id) {
    try {
        const result = await knex('dados_bancarios')
            .select('dados_bancarios_id')
            .orderBy('dados_bancarios_id', 'desc')
            .first()

        return result ? result.dados_bancarios_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllBankData,
    getSelectBankDataById,
    setInsertBankData,
    setUpdateBankData,
    setDeleteBankData,
    getSelectLastID
}