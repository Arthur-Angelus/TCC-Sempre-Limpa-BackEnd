/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do roupa
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

const getAllClothes = async function (){
    try {
        return await knex('roupas').select('*')
    } catch (error) {
        return false
    }
}

const getClothesById = async function(id_roupa){
    try {
        return await knex('roupas').where('id', id_roupa).first()
    } catch (error) {
        return false        
    }
}

const getClothesByName = async function (nome_peca) {
    try {
        return await knex('roupas').where('nome_peca', 'like', `%${nome_peca}%`)
        .orderBy('nome_peca', 'asc')
    } catch (error) {
        return false
    }
}

const setInsertClothes = async function(dadosRoupa){
    try {
        const [idGerado] = await knex('roupas').insert({
            nome_peca: dadosRoupa.nome_peca
        })
        return idGerado
    } catch (error) {
        return false
    }
}

const setUpdateClothes = async function(id_roupa, dadosRoupa){
    try {
        const linhasAlteradas = await knex('roupas')
        .where({
            id: id_roupa
        })
        .update({
            nome_peca: dadosRoupa.nome_peca
        })

        return linhasAlteradas
    } catch (error) {
        return false
    }
}

const setDeleteClothes = async function (id_roupa){
    try {
        const linhasAlteradas = await knex('roupas')
        .where({
            id: id_roupa
        })
        .del()

        return linhasAlteradas
    } catch (error) {
        return false
    }
}


module.exports = {
    getAllClothes,
    getClothesById,
    getClothesByName,
    setInsertClothes,
    setUpdateClothes,
    setDeleteClothes
}