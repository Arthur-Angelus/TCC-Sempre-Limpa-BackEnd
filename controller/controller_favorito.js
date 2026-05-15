/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do Endereco lavanderia
 * Data: 11/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const favoritosDao = require('../model/DAO/favorito.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')


const listarTodosOsFavoritos = async function (){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let dadosDao = await favoritosDao.getSelectAllFavorite()
        if (dadosDao){
            if (dadosDao.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.favoritos = dadosDao
                
                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarFavoritoPorId = async function(id_favorito){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id_favorito) && id_favorito != '' && id_favorito != null && id_favorito > 0){
            let resultFavorito = await favoritosDao.getSelectFavoriteById(id_favorito)

            if(resultFavorito !== false) {
                if(resultFavorito !== undefined) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.favoritos = resultFavorito

                    ret
                }
            }
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}