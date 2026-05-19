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
// INSERT PEDIDO
const setInsertPedido = async function (pedido) {
    try {
        const result = await knex('pedido').insert({
            data: pedido.data,
            valor_total: pedido.valor_total,
            taxa_entrega: pedido.taxa_entrega,
            taxa_entregador: pedido.taxa_entregador,
            tempo_estimado: pedido.tempo_estimado,
            fk_status_id: pedido.fk_status_id,
            fk_lavanderia_id: pedido.fk_lavanderia_id,
            fk_usuario_id: pedido.fk_usuario_id
        })
        return result.map(pedido => {
            return pedido
        })
    } catch (error) {
        console.error("ERRO NO DAO INSERT:", error)
        throw error
    }
}
// UPDATE PEDIDO
const setUpdatePedido = async function (pedido, pedido_id) {
    try {
        const result = await knex('pedido')
            .where({ pedido_id: pedido_id })
            .update({
                data: pedido.data,
                valor_total: pedido.valor_total,
                taxa_entrega: pedido.taxa_entrega,
                taxa_entregador: pedido.taxa_entregador,
                tempo_estimado: pedido.tempo_estimado,
                fk_status_id: pedido.fk_status_id,
                fk_lavanderia_id: pedido.fk_lavanderia_id,
                fk_usuario_id: pedido.fk_usuario_id
            })
        return result
    } catch (error) {
        console.error("ERRO NO DAO UPDATE:",error)
        return false
    }
}
// GET LAST ID
const getSelectLastID = async function (pedido_id) {
    try {
        const result = await knex('pedido')
            .select('pedido_id')
            .orderBy('pedido_id', 'desc')
            .first()

        return result ? result.pedido_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}
module.exports = {
    getSelectAllPedido,
    getSelectPedidoById,
    setInsertPedido,
    setUpdatePedido,
    getSelectLastID
}
    
