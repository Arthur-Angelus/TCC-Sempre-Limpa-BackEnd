/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do endereco_Lavanderia
 * Data: 11/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

const getSelectAllAddresLaundry= async function(){
    try {
       return await knex('endereco_lavanderia').select('*')
    } catch (error) {
        console.log("Ocorreu um erro ao requisitar informações no Banco de dados", error)
        return error
    }
}

const getSelectAddresLaundryById = async function(id_endereco_lavanderia){
    try {
        return await knex('endereco_lavanderia').where({
            endereco_lavanderia_PK: id_endereco_lavanderia
        })
        .first()
    } catch (error) {
        console.log("Erro ao buscar endereço referente a lavanderia", error)
        return false
    }
}

const setInsertAddresLaundry = async function (dadosEndereco) {
    try {
        const [idGerado] = await knex('endereco_lavanderia').insert({
            cep: dadosEndereco.cep,
            uf: dadosEndereco.uf,
            cidade: dadosEndereco.cidade,
            bairro: dadosEndereco.bairro,
            logradouro: dadosEndereco.logradouro,
            numero: dadosEndereco.numero,
            complemento: dadosEndereco.complemento
        })

        return idGerado
    } catch (error) {
        console.log("Erro ao cadastrar endereço:", error)
        return false
    }
}

const setUpdateAddresLaundry = async function(id_endereco_lavanderia, dadosEndereco){
    try {
        const linhasAlteradas = await knex('endereco_lavanderia')
        .where({endereco_lavanderia_PK: id_endereco_lavanderia})
        .update(dadosEndereco)

        return linhasAlteradas
    } catch (error) {
        console.log("Erro ao atualizar endereço:", error)
        return false
    }
}

const setDeleteAdressLaundry = async function(id_endereco_lavanderia){
    try {
        const linhasAlteradas = await knex('endereco_lavanderia')
        .where({endereco_lavanderia_PK: id_endereco_lavanderia})
        .del()
    } catch (error) {
        console.log ("erro ao deletar", error)
        return false
    }
}

module.exports = {
    getSelectAllAddresLaundry,
    getSelectAddresLaundryById,
    setInsertAddresLaundry,
    setUpdateAddresLaundry,
    setDeleteAdressLaundry
}