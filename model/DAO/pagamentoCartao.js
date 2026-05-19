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


module.exports = {
    getSelectAllPagamentoCartao,
    getSelectPagamentoCartaoById
}
    
