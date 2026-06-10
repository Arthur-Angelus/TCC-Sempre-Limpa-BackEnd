const lavanderiaDAO = require('../model/DAO/favoritos.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

const favoritarLavanderia = async function(dados) {
     let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!dados.usuario_id || !dados.lavanderia_id) {
            return { status_code: 400, message: "ID do usuário e da lavanderia são obrigatórios." };
        }

        let inseriu = await lavanderiaDAO.insertFavorito(dados.usuario_id, dados.lavanderia_id);
        
        if(inseriu) {
            return { status_code: 201, message: "Lavanderia favoritada com sucesso!" };
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

const desfavoritarLavanderia = async function(dados) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!dados.usuario_id || !dados.lavanderia_id) {
            return { status_code: 400, message: "ID do usuário e da lavanderia são obrigatórios." };
        }

        let deletou = await lavanderiaDAO.deleteFavorito(dados.usuario_id, dados.lavanderia_id);
        
        if(deletou) {
            return { status_code: 200, message: "Lavanderia removida dos favoritos." };
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

module.exports= {
    favoritarLavanderia,
    desfavoritarLavanderia
}