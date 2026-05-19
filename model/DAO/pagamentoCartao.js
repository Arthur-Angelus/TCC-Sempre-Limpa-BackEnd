/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da tabela pagamento cartão
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

// PAGAMENTO CARTAO ALL
const getSelectAllPagamentoCartao = async function () {
    try {
        const rows = await knex.select('*').from('pagamento_cartao')
        return rows.map(pagamento_cartao => {
            return pagamento_cartao
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// SELECT PAGAMENTO CARTAO BY ID
const getSelectPagamentoCartaoById = async function (pagamento_cartao_id) {
    try {
        const rows = await knex('pagamento_cartao')
            .select('*')
            .where({ pagamento_cartao_id: pagamento_cartao_id })

        return rows.map(pagamento_cartao => {
            return pagamento_cartao
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// INSERT PAGAMENTO CARTAO
const setInsertPagamentoCartao = async function (pagamento_cartao) {
    try {
        const result = await knex('pagamento_cartao').insert({
            token_utilizado: pagamento_cartao.token_utilizado,
            ultimos_digitos: pagamento_cartao.ultimos_digitos,
            tipo: pagamento_cartao.tipo,
            fk_cartao_id: pagamento_cartao.fk_cartao_id,
            fk_ordem_pagamento_id: pagamento_cartao.fk_ordem_pagamento_id
        })
        return result.map(pagamento_cartao => {
            return pagamento_cartao
        })
    } catch (error) {
        console.error("ERRO NO DAO INSERT:", error)
        throw error
    }
}
// GET LAST ID
const getSelectLastID = async function (pagamento_cartao_id) {
    try {
        const result = await knex('pagamento_cartao')
            .select('pagamento_cartao_id')
            .orderBy('pagamento_cartao_id', 'desc')
            .first()

        return result ? result.pagamento_cartao_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllPagamentoCartao,
    getSelectPagamentoCartaoById,
    setInsertPagamentoCartao,
    getSelectLastID
}
    
