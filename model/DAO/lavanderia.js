/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do endereco_Lavanderia
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

const getSelectLaundry = async function(){
    try {
        const result = await knex('vw_lavanderia_endereco')
        .select('*')
        .orderBy('lavanderia_id', 'desc')

        return result
    } catch (error) {
        return false
    }
}



module.exports = {
    getSelectLaundry
}