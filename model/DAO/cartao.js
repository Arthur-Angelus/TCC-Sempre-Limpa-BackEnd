/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do cartao
 * Data: 11/05/2026
 * Autor: Weslei Santos
 * Versão: 2.0 (corrigido)
 *******************************************************************************************/


const knex = require('../../db')

/* Buscar todos cartões */
const getAllCards = async

/* Inserir um novo Cartão */
const setinsertCard = async function (cartao) {
    try {
        const result = await knex('cartao')
            .insert({
                usuario_id: cartao.usuario_id,
                bandeira: cartao.bandeira,
                validade: cartao.validade,
                token_cartao: cartao.token_cartao,
                ultimos_digitos: cartao.ultimos_digitos
        })

        return result
    } catch (error) {
        return false
    }
}

/* Filtrar cartões por usuário */
const getListarCartoesPorUsuario = async function (usuario_id) {
    try {
        const result = await knex('cartao')
            .select('*')
            .where('usuario_id', usuario_id)

        return result
    } catch (error) {
        return false
    }
}

/* Deletar um cartão */
const setDeletCard = async (cartao_id, usuario_id) => {
    try {
        const result = await knex('cartao')
            .where({
                cartao_id: cartao_id,
                usuario_id: usuario_id
            })
            .del()

            return result
    } catch (error) {
        return false
    }
}

module.exports = {
    setinsertCard,
    getListarCartoesPorUsuario,
    setDeletCard
}