/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da avaliação
 * Data: 13/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

// SELECT ALL
const getSelectAllReview = async function () {
    try {
        const result = await knex.select('*').from('avaliacao')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectReviewById = async function (avaliacao_id) {
    try {
        const result = await knex('avaliacao')
            .select('*')
            .where({ avaliacao_id: avaliacao_id })

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertReview = async function (avaliacao) {
    try {
        const result = await knex('avaliacao').insert({
            nota: avaliacao.nota,
            comentario: avaliacao.comentario,
            fk_usuario_id: avaliacao.fk_usuario_id,
            fk_lavanderia_id: avaliacao.fk_lavanderia_id
        })
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// UPDATE
const setUpdateReview = async function (avaliacao, avaliacao_id) {
    try {
        const result = await knex('avaliacao')
            .where({ avaliacao_id: avaliacao_id })
            .update({
                nota: avaliacao.nota,
                data: avaliacao.data,
                comentario: avaliacao.comentario,
                fk_usuario_id: avaliacao.fk_usuario_id,
                fk_lavanderia_id: avaliacao.fk_lavanderia_id
            })
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteReview = async function (avaliacao_id) {
    try {
        const result = await knex('avaliacao')
            .where({ avaliacao_id: avaliacao_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (avaliacao_id) {
    try {
        const result = await knex('avaliacao')
            .select('avaliacao_id')
            .orderBy('avaliacao_id', 'desc')
            .first()

        return result ? result.avaliacao_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllReview,
    getSelectReviewById,
    setInsertReview,
    setUpdateReview,
    setDeleteReview,
    getSelectLastID
}