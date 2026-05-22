/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do avaliacao_motorista
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../../db')

// SELECT ALL
const getSelectAllRating = async function () {
    try {
        const result = await knex.raw('SELECT 1+1 AS test')
console.log(result)
return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectRatingById = async function (avaliacao_motorista_id) {
    try {
        const result = await knex('avaliacao_motorista')
            .select('*')
            .where({ avaliacao_motorista_id: avaliacao_motorista_id })

            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertRating = async function (avaliacao_motorista) {
    try {
        const result = await knex('avaliacao_motorista').insert({
            comentario: avaliacao_motorista.comentario,
            nota: avaliacao_motorista.nota,
            fk_motorista_id: avaliacao_motorista.fk_motorista_id,
            fk_usuario_id: avaliacao_motorista.fk_usuario_id
        })
        return result
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdateRating = async function (avaliacao_motorista, avaliacao_motorista_id) {
    try {
        const result = await knex('avaliacao_motorista')
            .where({ avaliacao_motorista_id: avaliacao_motorista_id })
            .update({
                comentario: avaliacao_motorista.comentario,
                nota: avaliacao_motorista.nota,
                fk_motorista_id: avaliacao_motorista.fk_motorista_id,
                fk_usuario_id: avaliacao_motorista.fk_usuario_id
            })
            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteRating = async function (avaliacao_motorista_id) {
    try {
        const result = await knex('avaliacao_motorista')
            .where({ avaliacao_motorista_id: avaliacao_motorista_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (avaliacao_motorista_id) {
    try {
        const result = await knex('avaliacao_motorista')
            .select('avaliacao_motorista_id')
            .orderBy('avaliacao_motorista_id', 'desc')
            .first()

        return result ? result.avaliacao_motorista_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllRating,
    getSelectRatingById,
    setInsertRating,
    setUpdateRating,
    setDeleteRating,
    getSelectLastID
}