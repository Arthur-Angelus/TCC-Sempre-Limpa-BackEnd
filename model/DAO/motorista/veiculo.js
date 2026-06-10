/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do veiculo
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../../db')

// SELECT ALL
const getSelectAllVehicle = async function () {
    try {
        const result = await knex.select('*').from('veiculo')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectVehicleById = async function (veiculo_id) {
    try {
        const result = await knex('veiculo')
            .select('*')
            .where({ veiculo_id: veiculo_id })

            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertVehicle = async function (veiculo) {
    try {
        const result = await knex('veiculo').insert({
            modalidade: veiculo.modalidade,
            fk_motorista_id: veiculo.fk_motorista_id,
            fk_dados_veiculo_id: veiculo.fk_dados_veiculo_id
        })
        return result
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdateVehicle = async function (veiculo, veiculo_id) {
    try {
        const result = await knex('veiculo')
            .where({ veiculo_id: veiculo_id })
            .update({
                modalidade: veiculo.modalidade
            })
            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteVehicle = async function (veiculo_id) {
    try {
        const result = await knex('veiculo')
            .where({ veiculo_id: veiculo_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (veiculo_id) {
    try {
        const result = await knex('veiculo')
            .select('veiculo_id')
            .orderBy('veiculo_id', 'desc')
            .first()

        return result ? result.veiculo_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllVehicle,
    getSelectVehicleById,
    setInsertVehicle,
    setUpdateVehicle,
    setDeleteVehicle,
    getSelectLastID
}