/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do roupa
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Contributor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

//CRUD - Create, Read, Update, Delete
// SELECT
const getAllClothes = async function (){
    try {
        return await knex('roupas').select('*')
    } catch (error) {
        return false
    }
}
// SELECT BY ID
const getClothesById = async function(id_roupa){
    try {
        return await knex('roupas').where('id', id_roupa).first()
    } catch (error) {
        return false        
    }
}
// SELECT BY NAME
const getClothesByName = async function (nome_peca) {
    try {
        return await knex('roupas').where('nome_peca', 'like', `%${nome_peca}%`)
        .orderBy('nome_peca', 'asc')
    } catch (error) {
        return false
    }
}
// INSERT
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
// UPDATE
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
// DELETE
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
// GET LAST ID
const getSelectLastID = async function (roupa_id) {
    try {
        const result = await knex('roupas')
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
    getAllClothes,
    getClothesById,
    getClothesByName,
    setInsertClothes,
    setUpdateClothes,
    setDeleteClothes,
    getSelectLastID
}