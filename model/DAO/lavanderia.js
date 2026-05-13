/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do endereco_Lavanderia
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

const getSelectAllLaundry = async function(){
    try {
        const result = await knex('vw_lavanderia_endereco')
        .select('*')
        .orderBy('lavanderia_id', 'desc')

        return result
    } catch (error) {
        return false
    }
}

const getSelectLaundryById = async function(id_lavanderia){
    try {
        return await knex('vw_lavanderia_endereco')
        .where('lavanderia_id', id_lavanderia)
        .first()
    } catch (error) {
        return false
    }
}

const getSelectLaundryByFilterSelect = async function(filtros){
    try {
        let query = knex('vw_lavanderias_filtros').select('*')

        if (filtros.cidade) {
            query.where('cidade', 'like', `%${filtros.cidade}%`)
        }
        if (filtros.bairro){
            query.where('bairro', 'like', `%${filtros.bairro}%`)
        }
        if (filtros.preco_max_lavagem) {
            query.where('preco_lavagem', '<=', filtros.preco_max_lavagem)
        }
        if (filtros.preco_max_secagem) {
            query.where('preco_secagem', '<=', filtros.preco_max_secagem)
        }
        if (filtros.avaliacao_minima) {
            query.where('media_avaliacao', '>=', filtros.avaliacao_minima)
        }

        query.orderBy('media_avaliacao', 'desc')

        return await query
    } catch (error) {
        return false
    }
}


module.exports = {
    getSelectAllLaundry,
    getSelectLaundryByFilterSelect,
    getSelectLaundryById
}