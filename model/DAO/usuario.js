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
        return rows.map(u => {
            delete u.senha
            return u
        })
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectUserById = async function (usuario_id) {
    try {
        const rows = await knex('usuario')
            .select('*')
            .where({ usuario_id: usuario_id })

        return rows.map(u => {
            delete u.senha
            return u
        })
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

        return rows.map(u => {
            delete u.senha
            return u
        })
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

        return rows.map(u => {
            delete u.senha
            return u
        })
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertUsers = async function (usuario) {
    try {
        const result = await knex('usuario').insert({
            nome: usuario.nome,
            e_mail: usuario.e_mail,
            telefone: usuario.telefone,
            cpf: usuario.cpf,
            rne: usuario.rne,
            fk_endereco: usuario.fk_endereco,
            senha: usuario.senha
        })
        return result.map(u => {
            delete u.senha
            return u
        })
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdateUsers = async function (usuario, usuario_id) {
    try {
        const result = await knex('usuario')
            .where({ usuario_id: usuario_id })
            .update({
                nome: usuario.nome,
                e_mail: usuario.e_mail,
                telefone: usuario.telefone,
                cpf: usuario.cpf,
                rne: usuario.rne,
                fk_endereco: usuario.fk_endereco,
                senha: usuario.senha
            })

        return result.map(u => {
            delete u.senha
            return u
        })
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteUsers = async function (usuario_id) {
    try {
        const result = await knex('usuario')
            .where({ usuario_id: usuario_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (usuario_id) {
    try {
        const result = await knex('usuario')
            .select('usuario_id')
            .orderBy('usuario_id', 'desc')
            .first()

        return result ? result.usuario_id : null
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