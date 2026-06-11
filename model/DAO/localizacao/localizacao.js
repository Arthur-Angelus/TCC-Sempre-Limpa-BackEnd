/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da localizacao
 * Data: 11/06/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../../db')

// INSERT
const insertLocalizacao = async (localizacao) => {
    try {
        const result = await knex('localizacao').insert(localizacao)
        return result
    } catch (error) {
        console.error(error)
        return null
    }
}

// SELECT ALL
const getAllLocalizacoes = async () => {
    try {
        return await knex('localizacao').select('*')
    } catch (error) {
        console.error(error)
        return null
    }
}

// SELECT BY ID
const getLocalizacaoById = async (localizacao_id) => {
    try {
        return await knex('localizacao')
            .where({ localizacao_id: localizacao_id })
            .first()
    } catch (error) {
        console.error(error)
        return null
    }
}

// UPDATE
const updateLocalizacao = async (localizacao_id, localizacao) => {
    try {
        const result = await knex('localizacao')
            .where({ localizacao_id: localizacao_id })
            .update({
                latitude: localizacao.latitude,
                longitude: localizacao.longitude,
                updated_at: knex.fn.now()
            })

        return result
    } catch (error) {
        console.error(error)
        return null
    }
}

// DELETE
const deleteLocalizacao = async (localizacao_id) => {
    try {
        const result = await knex('localizacao')
            .where({ localizacao_id: localizacao_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    insertLocalizacao,
    getAllLocalizacoes,
    getLocalizacaoById,
    updateLocalizacao,
    deleteLocalizacao
}