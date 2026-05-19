/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da tabela ordem pagamento
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const { set } = require('supertest/lib/cookies')
const knex = require('../../db')

// ORDEM PAGAMENTO ALL
const getSelectAllOrdemPagamento = async function () {
    try {
        const rows = await knex.select('*').from('ordem_pagamento')
        return rows.map(ordemPagamento => {
            return ordemPagamento
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// SELECT ORDEM PAGAMENTO BY ID
const getSelectOrdemPagamentoById = async function (ordem_pagamento_id) {
    try {
        const rows = await knex('ordem_pagamento')
            .select('*')
            .where({ ordem_pagamento_id: ordem_pagamento_id })

        return rows.map(ordemPagamento => {
            return ordemPagamento
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// INSERT ORDEM PAGAMENTO
const setInsertOrdemPagamento = async function (ordemPagamento) {
    try {
        const result = await knex('ordem_pagamento').insert({
            tipo_pagamento: ordemPagamento.tipo_pagamento,
            valor: ordemPagamento.valor,
            data_criacao: ordemPagamento.data_criacao,
            status: ordemPagamento.status,
            fk_pedido_id: ordemPagamento.fk_pedido_id,
           
        })
        return result.map(ordemPagamento => {
            return ordemPagamento
        })
    } catch (error) {
        console.error("ERRO NO DAO INSERT:", error)
        throw error
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
// UPDATE ORDEM PAGAMENTO
const setUpdateOrdemPagamento = async function (ordemPagamento, ordem_pagamento_id) {
    try {
        const result = await knex('ordem_pagamento')
            .where({ ordem_pagamento_id: ordem_pagamento_id })
            .update({
                tipo_pagamento: ordemPagamento.tipo_pagamento,
                valor: ordemPagamento.valor,
                data_criacao: ordemPagamento.data_criacao,
                status: ordemPagamento.status,
                fk_pedido_id: ordemPagamento.fk_pedido_id
            })
        return result
    } catch (error) {
        console.error("ERRO NO DAO UPDATE:",error)
        return false
    }
}
module.exports = {
    getSelectAllOrdemPagamento,
    getSelectOrdemPagamentoById,
    setInsertOrdemPagamento,
    setUpdateOrdemPagamento,
    getSelectLastID
}
    
