const knex = require('../../../db')

const getSelectAllDriver = async () => {
    try {
        return await knex('motorista').select('*')
    } catch (error) {
        return null
    }
}

const getSelectDriverById = async (id) => {
    try {
        return await knex('motorista')
            .where({ motorista_id: id })
            .first()
    } catch (error) {
        return null
    }
}

const getSelectDriverByEmail = async (email) => {
    try {
        return await knex('motorista')
            .where({ email })
            .first()
    } catch (error) {
        return null
    }
}

const setInsertMotoristaCompleto = async (motorista, banco, endereco, veiculo) => {
    try {
        return await knex.transaction(async (trx) => {

            const bancoId = await trx('dados_bancarios').insert(banco).returning('id')
            const enderecoId = await trx('endereco_motorista').insert(endereco).returning('id')

            const motoristaId = await trx('motorista')
                .insert({
                    ...motorista,
                    fk_dados_bancarios_id: bancoId[0],
                    fk_endereco_motorista_id: enderecoId[0]
                })
                .returning('motorista_id')

                if (veiculo.modalidade !== 'bike' && !veiculo.dados) {
                    throw new Error('Dados do veículo obrigatórios para essa modalidade')
                }

            const dadosVeiculoId = veiculo.dados
                ? await trx('dados_veiculo').insert(veiculo.dados).returning('id')
                : null

            const veiculoId = await trx('veiculo')
                .insert({
                    modalidade: veiculo.modalidade,
                    fk_motorista_id: motoristaId[0],
                    fk_dados_veiculo_id: dadosVeiculoId[0]
                })
                .returning('veiculo_id')

            return {
                motoristaId: motoristaId[0],
                bancoId: bancoId[0],
                enderecoId: enderecoId[0],
                dadosVeiculoId: dadosVeiculoId[0],
                veiculoId: veiculoId[0]
            }
        })
    } catch (error) {
        return null
    }
}

const updateSenhaMotorista = async (id, senha) => {
    try {
        return await knex('motorista')
            .where({ motorista_id: id })
            .update({ senha })
    } catch (error) {
        return null
    }
}

module.exports = {
    getSelectAllDriver,
    getSelectDriverById,
    getSelectDriverByEmail,
    setInsertMotoristaCompleto,
    updateSenhaMotorista
}