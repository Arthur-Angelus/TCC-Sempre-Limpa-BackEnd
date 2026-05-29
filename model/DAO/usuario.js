/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do usuario
 * Data: 12/05/2026
 * Autor: Arthur Angelus
 * Versão: 3.0
 * implementado função para get usuario pelo email e update de senha do usuario
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
        const rows = await knex('vw_usuario_endereco_detalhado')
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
const getSelectUserByEmail = async function (email) {

    try {

        const result = await knex('usuario')
            .select('*')
            .where({ e_mail: email })
            .first()

        return result

    } catch (error) {
        console.log(error)
        return false
    }
}

// SELECT BY CPF + SENHA
const getSelectUserByCpf = async function (cpf) {

    try {

        const result = await knex('usuario')
            .select('*')
            .where({ cpf: cpf })
            .first()

        return result

    } catch (error) {
        console.log(error)
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
            senha: usuario.senha,
            data_nascimento: usuario.data_nascimento
        })
        return result.map(u => {
            delete u.senha
            return u
        })
    } catch (error) {
        console.error(" ERRO NO DAO INSERT:", error)
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
                senha: usuario.senha,
                data_nascimento: usuario.data_nascimento
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

const getSelectUserOnlyEmail = async function(email){

    try {

        const result = await knex('usuario')
            .select('*')
            .where({
                e_mail: email
            })

        return result

    } catch(error){

        console.log(error)
        return false
    }
}

const updateSenhaUsuario = async function(usuario_id, senha){

    try {

        const result = await knex('usuario')
            .where({ usuario_id: usuario_id })
            .update({
                senha: senha
            })

        return result

    } catch(error){

        console.log(error)
        return false
    }
}

// SELECT HOME USUÁRIO
const selectHomeUsuario = async (usuario_id) => {
    const dados = await knex('vw_home_usuario_pedidos')
        .where('usuario_id', usuario_id)
        .orderBy('data_pedido', 'desc')

    return dados
}

module.exports = {
    getSelectAllUsers,
    getSelectUserById,
    getSelectUserByEmail,
    getSelectUserByCpf,
    setInsertUsers,
    setUpdateUsers,
    setDeleteUsers,
    getSelectLastID,
    getSelectUserOnlyEmail,
    updateSenhaUsuario,
    selectHomeUsuario
}