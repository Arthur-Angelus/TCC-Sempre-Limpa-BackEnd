/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do usuario
 * Data: 04/05/2026
 * Autor: Arthur Angelus
 * Versão: 2.0 (corrigido)
 *******************************************************************************************/

const knex = require('../../db')

// SELECT ALL
const getSelectAllUsers = async function () {
    try {
        const rows = await knex.select('*').from('usuario')
        return rows
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectUserById = async function (id) {
    try {
        const rows = await knex('usuario')
            .select('*')
            .where({ id: id })

        return rows
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY EMAIL + SENHA
const getSelectUserByEmail = async function (email, senha) {
    try {
        const rows = await knex('usuario')
            .select('*')
            .where({
                e_mail: email,
                senha: senha
            })

        return rows
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY CPF + SENHA
const getSelectUserByCpf = async function (cpf, senha) {
    try {
        const rows = await knex('usuario')
            .select('*')
            .where({
                cpf: cpf,
                senha: senha
            })

        return rows
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertUsers = async function (usuario) {
    try {
        const result = await knex('usuario').insert(usuario)
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// UPDATE
const setUpdateUsers = async function (usuario) {
    try {
        const result = await knex('usuario')
            .where({ id: usuario.id })
            .update(usuario)

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteUsers = async function (id) {
    try {
        const result = await knex('usuario')
            .where({ id: id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function () {
    try {
        const result = await knex('usuario')
            .select('id')
            .orderBy('id', 'desc')
            .first()

        return result ? result.id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllUsers,
    getSelectUserById,
    getSelectUserByEmail,
    getSelectUserByCpf,
    setInsertUsers,
    setUpdateUsers,
    setDeleteUsers,
    getSelectLastID
}