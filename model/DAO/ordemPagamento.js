/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da tabela ordem pagamento
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

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

module.exports = {
    getSelectAllOrdemPagamento
}
    
