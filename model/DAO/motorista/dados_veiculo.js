/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do dados_veiculo
 * Data: 18/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../../db')

// SELECT ALL
const getSelectAllVehicleData = async function () {
    try {
        const result = await knex.select('*').from('dados_veiculo')
        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// SELECT BY ID
const getSelectVehicleDataById = async function (dados_veiculo_id) {
    try {
        const result = await knex('dados_veiculo')
            .select('*')
            .where({ dados_veiculo_id: dados_veiculo_id })

            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// INSERT
const setInsertVehicleData = async function (dados_veiculo) {
    try {
        const result = await knex('dados_veiculo').insert({
            placa: dados_veiculo.placa,
            modelo: dados_veiculo.modelo,
            marca: dados_veiculo.marca,
            ano_modelo: dados_veiculo.ano_modelo,
            ano_fabricacao: dados_veiculo.ano_fabricacao,
            cor: dados_veiculo.cor
        })
        return result
    } catch (error) {
        console.error("🔥 ERRO NO DAO INSERT:", error)
        throw error
    }
}

// UPDATE
const setUpdateVehicleData = async function (dados_veiculo, dados_veiculo_id) {
    try {
        const result = await knex('dados_veiculo')
            .where({ dados_veiculo_id: dados_veiculo_id })
            .update({
                placa: dados_veiculo.placa,
                modelo: dados_veiculo.modelo,
                marca: dados_veiculo.marca,
                ano_modelo: dados_veiculo.ano_modelo,
                ano_fabricacao: dados_veiculo.ano_fabricacao,
                cor: dados_veiculo.cor
            })
            return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// DELETE
const setDeleteVehicleData = async function (dados_veiculo_id) {
    try {
        const result = await knex('dados_veiculo')
            .where({ dados_veiculo_id: dados_veiculo_id })
            .del()

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

// GET LAST ID
const getSelectLastID = async function (dados_veiculo_id) {
    try {
        const result = await knex('dados_veiculo')
            .select('dados_veiculo_id')
            .orderBy('dados_veiculo_id', 'desc')
            .first()

        return result ? result.dados_veiculo_id : null
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = {
    getSelectAllVehicleData,
    getSelectVehicleDataById,
    setInsertVehicleData,
    setUpdateVehicleData,
    setDeleteVehicleData,
    getSelectLastID
}