/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do ordem_pagamento
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

// SELECT ALL
const getSelectAllPayment = async function () {
    try {
        const result = await knex.select('*').from('ordem_pagamento')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectPaymentById = async function (ordem_pagamento_id) {
    try {
        const result = await knex('ordem_pagamento')
            .select('*')
            .where({ ordem_pagamento_id: ordem_pagamento_id })

            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertPayment = async function (ordem_pagamento) {
    try {
        const result = await knex('ordem_pagamento').insert({
            tipo_pagamento: ordem_pagamento.tipo_pagamento,
            valor: ordem_pagamento.valor,
            status: ordem_pagamento.status,
            fk_pedido_id: ordem_pagamento.fk_pedido_id
        })
        return result
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdatePayment = async function (ordem_pagamento, ordem_pagamento_id) {
    try {
        const result = await knex('ordem_pagamento')
            .where({ ordem_pagamento_id: ordem_pagamento_id })
            .update({
                tipo_pagamento: ordem_pagamento.tipo_pagamento,
                valor: ordem_pagamento.valor,
                status: ordem_pagamento.status,
                fk_pedido_id: ordem_pagamento.fk_pedido_id
            })
            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeletePayment = async function (ordem_pagamento_id) {
    try {
        const result = await knex('ordem_pagamento')
            .where({ ordem_pagamento_id: ordem_pagamento_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (ordem_pagamento_id) {
    try {
        const result = await knex('ordem_pagamento')
            .select('ordem_pagamento_id')
            .orderBy('ordem_pagamento_id', 'desc')
            .first()

        return result ? result.ordem_pagamento_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllPayment,
    getSelectPaymentById,
    setInsertPayment,
    setUpdatePayment,
    setDeletePayment,
    getSelectLastID
}