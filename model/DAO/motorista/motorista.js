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

            const bancoIdRaw = await trx('dados_bancarios').insert(banco)
            const enderecoIdRaw = await trx('endereco_motorista').insert(endereco)

            const bancoId = Array.isArray(bancoIdRaw) ? bancoIdRaw[0] : bancoIdRaw
            const enderecoId = Array.isArray(enderecoIdRaw) ? enderecoIdRaw[0] : enderecoIdRaw

            // 🔥 REMOVE CAMPOS QUE NÃO EXISTEM NA TABELA
            const { dadosBancarios, endereco: _, veiculo: __, ...motoristaLimpo } = motorista

            const motoristaIdRaw = await trx('motorista').insert({
                ...motoristaLimpo,
                fk_dados_bancarios_id: bancoId,
                fk_endereco_motorista_id: enderecoId
            })

            const motoristaId = Array.isArray(motoristaIdRaw)
                ? motoristaIdRaw[0]
                : motoristaIdRaw

            if (veiculo.modalidade !== 'bike' && !veiculo.dados) {
                throw new Error('Dados do veículo obrigatórios para essa modalidade')
            }

            let dadosVeiculoId = null

            if (veiculo.dados) {
                const dadosVeiculoRaw = await trx('dados_veiculo').insert(veiculo.dados)

                dadosVeiculoId = Array.isArray(dadosVeiculoRaw)
                    ? dadosVeiculoRaw[0]
                    : dadosVeiculoRaw
            }

            const veiculoIdRaw = await trx('veiculo').insert({
                modalidade: veiculo.modalidade,
                fk_motorista_id: motoristaId,
                fk_dados_veiculo_id: dadosVeiculoId
            })

            const veiculoId = Array.isArray(veiculoIdRaw)
                ? veiculoIdRaw[0]
                : veiculoIdRaw

            return {
                motoristaId,
                bancoId,
                enderecoId,
                dadosVeiculoId,
                veiculoId
            }
        })

    } catch (error) {
        console.log('ERRO MODEL:', error)
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