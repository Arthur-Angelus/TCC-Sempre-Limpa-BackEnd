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
// INSERT PIX
const setInsertPix = async function (pix) {
    try {
        const result = await knex('pix').insert({
            chave_pix: pix.chave_pix,
            data_expiracao: pix.data_expiracao,
            qr_code: pix.qr_code,
            status: pix.status,
            fk_ordem_pagamento_id: pix.fk_ordem_pagamento_id
        })
        return result.map(pix => {
            return pix
        })
    } catch (error) {
        console.error("ERRO NO DAO INSERT:", error)
        throw error
    }
}
// UPDATE PIX
const setUpdatePix = async function (pix, pix_id) {
    try {
        const result = await knex('pix')
            .where({ pix_id: pix_id })
            .update({
                chave_pix: pix.chave_pix,
                data_expiracao: pix.data_expiracao,
                qr_code: pix.qr_code,
                status: pix.status,
                fk_ordem_pagamento_id: pix.fk_ordem_pagamento_id
            })
        return result
    } catch (error) {
        console.error("ERRO NO DAO UPDATE:",error)
        return false
    }
}
// DELETE
const setDeletePix = async function (pix_id) {
    try {
        const result = await knex('pix')
            .where({ pix_id: pix_id })
            .del()

        return result
    } catch (error) {
        console.error("ERRO NO DAO DELETE:",error)
        return false
    }
}
// GET LAST ID
const getSelectLastID = async function (pix_id) {
    try {
        const result = await knex('pix')
            .select('pix_id')
            .orderBy('pix_id', 'desc')
            .first()

        return result ? result.pix_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllPix,
    getSelectPixById,
    setInsertPix,
    setUpdatePix,
    setDeletePix,
    getSelectLastID
}
    
