/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do cartao_virtual
 * Data: 25/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../../db')

// SELECT ALL
const getSelectAllVirtualCard = async function () {
    try {
        const result = await knex.select('*').from('cartao_virtual')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectVirtualCardById = async function (cartao_virtual_id) {
    try {
        const result = await knex('cartao_virtual')
            .select('*')
            .where({ cartao_virtual_id: cartao_virtual_id })

            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertVirtualCard = async function (cartao_virtual) {
    try {
        const result = await knex('cartao_virtual').insert({
            numero: cartao_virtual.numero,
            validade: cartao_virtual.validade,
            saldo: cartao_virtual.saldo,
            fk_motorista_id: cartao_virtual.fk_motorista_id
        })
        return result
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdateVirtualCard = async function (cartao_virtual, cartao_virtual_id) {
    try {
        const result = await knex('cartao_virtual')
            .where({ cartao_virtual_id: cartao_virtual_id })
            .update({
                numero: cartao_virtual.numero,
                validade: cartao_virtual.validade,
                saldo: cartao_virtual.saldo,
                fk_motorista_id: cartao_virtual.fk_motorista_id
            })
            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteVirtualCard = async function (cartao_virtual_id) {
    try {
        const result = await knex('cartao_virtual')
            .where({ cartao_virtual_id: cartao_virtual_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (cartao_virtual_id) {
    try {
        const result = await knex('cartao_virtual')
            .select('cartao_virtual_id')
            .orderBy('cartao_virtual_id', 'desc')
            .first()

        return result ? result.cartao_virtual_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllVirtualCard,
    getSelectVirtualCardById,
    setInsertVirtualCard,
    setUpdateVirtualCard,
    setDeleteVirtualCard,
    getSelectLastID
}