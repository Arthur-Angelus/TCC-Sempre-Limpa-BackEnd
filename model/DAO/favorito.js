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

const getSelectAllFavoriteByUsuaryId = async function (idUsuario) {
    try {
        let resultado = await knex('vw_favoritos_detalhados')
        .where('usuario_id', idUsuario)
        .orderBy('id_favorito', 'desc')

        return resultado
    } catch (error) {
        return false
    }
}

const getSelectFavoriteByLavanderiaId = async function (idlavanderia){
    try {
        let resultado = await knex('vw_favoritos_detalhados')
        .where('lavanderia_id', idlavanderia)
        .orderBy('id_favorito', 'desc')

        return resultado
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllFavorite,
    getSelectFavoriteById,
    getSelectAllFavoriteByUsuaryId,
    getSelectFavoriteByLavanderiaId
}