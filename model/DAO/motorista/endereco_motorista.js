/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do endereço do motorista
 * Data: 18/05/2026
 * Autor: Weslei Santos
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../../db')

const getSelectAllEnderecoMotorista = async function(){
    try {
       return await knex('endereco_motorista').select('*')
    } catch (error) {
        console.log(error)
        return false
    }
}

const getSelectEnderecoMotoristaById = async function(id_endereco_motorista){
    try {
        return await knex('endereco_motorista').where({
            endereco_motorista_id: id_endereco_motorista
        })
        .first()
    } catch (error) {
        return false
    }
}

const setInsertEnderecoMotorista = async function (dadosEndereco) {
    try {
        const [idGerado] = await knex('endereco_motorista').insert({
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
        return false
    }
}

const setUpdateEnderecoMotorista = async function(id_endereco_motorista, dadosEndereco){
    try {
        const linhasAlteradas = await knex('endereco_motorista')
        .where({endereco_motorista_id: id_endereco_motorista})
        .update(dadosEndereco)

        return linhasAlteradas
    } catch (error) {
        return false
    }
}

const setDeleteEnderecoMotorista = async function(id_endereco_motorista){
    try {
        const linhasAlteradas = await knex('endereco_motorista')
        .where({endereco_motorista_id: id_endereco_motorista})
        .del()

        return linhasAlteradas
    } catch (error) {
        return false
    }
}


module.exports = {
    getSelectAllEnderecoMotorista,
    getSelectEnderecoMotoristaById,
    setInsertEnderecoMotorista,
    setUpdateEnderecoMotorista,
    setDeleteEnderecoMotorista
}