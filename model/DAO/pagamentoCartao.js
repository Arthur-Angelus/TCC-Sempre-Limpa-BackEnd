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


module.exports = {
    getSelectAllPagamentoCartao
}
    
