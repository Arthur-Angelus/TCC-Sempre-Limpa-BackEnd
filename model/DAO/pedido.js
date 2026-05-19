/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da tabela pedido
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const { get } = require('express/lib/request')
const knex = require('../../db')

// PEDIDO ALL
const getSelectAllPedido = async function () {
    try {
        const rows = await knex.select('*').from('pedido')
        return rows.map(pedido => {
            return pedido
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// SELECT PEDIDO BY ID
const getSelectPedidoById = async function (pedido_id) {
    try {
        const rows = await knex('pedido')
            .select('*')
            .where({ pedido_id: pedido_id })

        return rows.map(pedido => {
            return pedido
        })
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    getSelectAllPedido,
    getSelectPedidoById
}
    
