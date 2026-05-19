/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD da tabela pix
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

// PIX ALL
const getSelectAllPix = async function () {
    try {
        const rows = await knex.select('*').from('pix')
        return rows.map(pix => {
            return pix
        })
    } catch (error) {
        console.error(error)
        return false
    }
}
// SELECT PIX BY ID
const getSelectPixById = async function (pix_id) {
    try {
        const rows = await knex('pix')
            .select('*')
            .where({ pix_id: pix_id })

        return rows.map(pix => {
            return pix
        })
    } catch (error) {
        console.error(error)
        return false
    }
}


module.exports = {
    getSelectAllPix,
    getSelectPixById
}
    
