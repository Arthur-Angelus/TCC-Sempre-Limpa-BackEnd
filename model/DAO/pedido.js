/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da tabela pedido
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira, Arthur Angelus
 * Versão: 2.0
 * implementando buscar pedido pelo id do usuario
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
// SELECT PEDIDO BY USER ID
const getSelectPedidoByUserId = async function (usuario_id) {
    try {
        const rows = await knex('pedido')
            .select('*')
            .where({ fk_usuario_id: usuario_id })

        return rows.map(pedido => {
            return pedido
        })
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT PEDIDO BY USER ID
const getSelectPedidoByDriverId = async function (motorista_id) {
    try {
        const rows = await knex('pedido')
            .select('*')
            .where({ fk_motorista_id: motorista_id })

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
            valor_total:
                Number(pedido.taxa_entrega) +
                Number(pedido.taxa_entregador) +
                Number(pedido.taxa_app),
            taxa_entrega: pedido.taxa_entrega,
            taxa_entregador: pedido.taxa_entregador,
            taxa_app: pedido.taxa_app,
            tempo_estimado: pedido.tempo_estimado,
            fk_status_id: pedido.fk_status_id,
            fk_lavanderia_id: pedido.fk_lavanderia_id,
            fk_usuario_id: pedido.fk_usuario_id,
            fk_motorista_id: pedido.fk_motorista_id
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
                fk_usuario_id: pedido.fk_usuario_id,
                fk_motorista_id: pedido.fk_motorista_id
            })
        return result
    } catch (error) {
        console.error("ERRO NO DAO UPDATE:", error)
        return false
    }
}
// DELETE
const setDeletePedido = async function (pedido_id) {
    try {
        const result = await knex('pedido')
            .where({ pedido_id: pedido_id })
            .del()

        return result
    } catch (error) {
        console.error("ERRO NO DAO DELETE:", error)
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

// =======================================================
// DAO: Chamada da Procedure de Pedido Completo
// =======================================================
const executeProcedurePedidoCompleto = async function (dados) {
    try {
        // Usamos trx (transaction) apenas para garantir que a leitura da 
        // variável @novo_pedido_id ocorra na mesma rota de conexão física do banco
        return await knex.transaction(async (trx) => {
            
            // 1. Executa a procedure injetando os valores e definindo a variável de saída
            await trx.raw(
                'CALL sp_criar_pedido_completo(?, ?, ?, ?, ?, ?, ?, @novo_pedido_id)',
                [
                    dados.usuario_id,
                    dados.lavanderia_id,
                    dados.valor_ciclos,
                    dados.taxa_entrega,
                    dados.tipo_pagamento, // 'PIX' ou 'CARTAO'
                    dados.cartao_id || null, // Se for PIX, passa null
                    dados.tipo_cartao || null // 'CREDITO', 'DEBITO' ou null
                ]
            );

            // 2. Captura o valor da variável gerada
            const result = await trx.raw('SELECT @novo_pedido_id AS pedido_id');
            
            // O Knex retorna um array duplo no .raw()
            const idGerado = result[0][0].pedido_id;
            
            return idGerado;
        });
    } catch (error) {
        console.error("ERRO NO DAO (PROCEDURE):", error);
        throw error;
    }
}
module.exports = {
    getSelectAllPedido,
    getSelectPedidoById,
    getSelectPedidoByUserId,
    getSelectPedidoByDriverId,
    setInsertPedido,
    setUpdatePedido,
    setDeletePedido,
    getSelectLastID,
    executeProcedurePedidoCompleto
}

