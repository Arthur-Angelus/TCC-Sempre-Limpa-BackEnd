/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do motorista
 * Data: 22/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../../db')

// SELECT ALL
const getSelectAllDriver = async function () {
    try {
        const rows = await knex.select('*').from('motorista')
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
const getSelectDriverById = async function (motorista_id) {
    try {
        const rows = await knex('motorista')
            .select('*')
            .where({ motorista_id: motorista_id })

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
const getSelectDriverByEmail = async function (email) {

    try {

        const result = await knex('motorista')
            .select('*')
            .where({ email: email })
            .first()

        return result

    } catch (error) {
        console.log(error)
        return false
    }
}

// SELECT BY CPF + SENHA
const getSelectDriverByCpf = async function (cpf) {

    try {

        const result = await knex('motorista')
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
const setInsertDriver = async function (motorista) {
    try {
        const result = await knex('motorista').insert({
            nome: motorista.nome,
            data_nascimento: motorista.data_nascimento,
            cpf: motorista.cpf,
            telefone: motorista.telefone,
            email: motorista.email,
            cnh: motorista.cnh,
            foto: motorista.foto,
            senha: motorista.senha,
            fk_dados_bancarios_id: motorista.fk_dados_bancarios_id,
            fk_endereco_motorista_id: motorista.fk_endereco_motorista_id

        })
        return result
        
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdateDriver = async function (motorista, motorista_id) {
    try {
        const result = await knex('motorista')
            .where({ motorista_id: motorista_id })
            .update({
                nome: motorista.nome,
                data_nascimento: motorista.data_nascimento,
                cpf: motorista.cpf,
                telefone: motorista.telefone,
                email: motorista.email,
                cnh: motorista.cnh,
                foto: motorista.foto,
                senha: motorista.senha,
                fk_dados_bancarios_id: motorista.fk_dados_bancarios_id,
                fk_endereco_motorista_id: motorista.fk_endereco_motorista_id
            })

        return result

    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteDriver = async function (motorista_id) {
    try {
        const result = await knex('motorista')
            .where({ motorista_id: motorista_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (motorista_id) {
    try {
        const result = await knex('motorista')
            .select('motorista_id')
            .orderBy('motorista_id', 'desc')
            .first()

        return result ? result.motorista_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

const getSelectDriverOnlyEmail = async function (email) {

    try {

        const result = await knex('motorista')
            .select('*')
            .where({
                email: email
            })

        return result

    } catch (error) {

        console.log(error)
        return false
    }
}

const updateSenhaMotorista = async function (motorista_id, senha) {

    try {

        const result = await knex('motorista')
            .where({ motorista_id: motorista_id })
            .update({
                senha: senha
            })

        return result

    } catch (error) {

        console.log(error)
        return false
    }
}

module.exports = {
    getSelectAllDriver,
    getSelectDriverById,
    getSelectDriverByEmail,
    getSelectDriverByCpf,
    setInsertDriver,
    setUpdateDriver,
    setDeleteDriver,
    getSelectLastID,
    getSelectDriverOnlyEmail,
    updateSenhaMotorista
}