/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do endereco
 * Data: 13/05/2026
 * Autor: Arthur Angelus
 * Versão: 2.0
 *******************************************************************************************/

const knex = require('../../db')

// SELECT ALL
const getSelectAllAdress = async function () {
    try {
        const result = await knex.select('*').from('endereco')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectAdressById = async function (endereco_id) {
    try {
        const result = await knex('endereco')
            .select('*')
            .where({ endereco_id: endereco_id })

            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertAdress = async function (endereco) {
    try {
        const result = await knex('endereco').insert({
            cep: endereco.cep,
            uf: endereco.uf,
            cidade: endereco.cidade,
            bairro: endereco.bairro,
            logradouro: endereco.logradouro,
            numero: endereco.numero,
            complemento: endereco.complemento
        })
        return result
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdateAdress = async function (endereco, endereco_id) {
    try {
        const result = await knex('endereco')
            .where({ endereco_id: endereco_id })
            .update({
                cep: endereco.cep,
                uf: endereco.uf,
                cidade: endereco.cidade,
                bairro: endereco.bairro,
                logradouro: endereco.logradouro,
                numero: endereco.numero,
                complemento: endereco.complemento
            })
            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteAdress = async function (endereco_id) {
    try {
        const result = await knex('endereco')
            .where({ endereco_id: endereco_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (endereco_id) {
    try {
        const result = await knex('endereco')
            .select('endereco_id')
            .orderBy('endereco_id', 'desc')
            .first()

        return result ? result.endereco_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllAdress,
    getSelectAdressById,
    setInsertAdress,
    setUpdateAdress,
    setDeleteAdress,
    getSelectLastID
}