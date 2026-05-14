/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do favorito
 * Data: 14/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

const getSelectAllFavorite = async function () {
    try {
        return await knex('favoritos')
        .select('*')
        .orderBy('favoritos_id', 'desc')
    } catch (error) {
        return false
    }
}

const getSelectFavoriteById = async function(idFavorito){
    try {
        return await knex('favoritos')
        .where ('favoritos_id', idFavorito)
        .first()
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllFavorite
}