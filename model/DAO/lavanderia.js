/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do endereco_Lavanderia
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

const getSelectAllLaundry = async function(){
    try {
        const result = await knex('vw_lavanderia_endereco')
        .select('*')
        .orderBy('lavanderia_id', 'desc')

        return result
    } catch (error) {
        return false
    }
}

const getSelectLaundryById = async function(id_lavanderia){
    try {
        return await knex('vw_lavanderia_endereco')
        .where('lavanderia_id', id_lavanderia)
        .first()
    } catch (error) {
        return false
    }
}

const getSelectLaundryByFilterSelect = async function(filtros){
    try {
        let query = knex('vw_lavanderias_filtros').select('*')

        if (filtros.apenas_favoritos && filtros.usuario_id) {
            query.innerJoin('favoritos', 'vw_lavanderias_filtros.lavanderia_id', 'favoritos.fk_lavanderia_id')
                 .where('favoritos.fk_usuario_id', filtros.usuario_id);
        }

        if (filtros.nome) {
            query.where('nome', 'like', `%${filtros.nome}%`)
        }
        

        if (filtros.cidade) {
            query.where('cidade', 'like', `%${filtros.cidade}%`)
        }
        if (filtros.bairro){
            query.where('bairro', 'like', `%${filtros.bairro}%`)
        }
    
        if (filtros.preco_max_lavagem) {
            query.where('preco_padrao_lavagem', '<=', filtros.preco_max_lavagem)
        }
        if (filtros.preco_max_secagem) {
            query.where('preco_padrao_secagem', '<=', filtros.preco_max_secagem)
        }
        
        if (filtros.avaliacao_minima) {
            query.where('media_avaliacao', '>=', filtros.avaliacao_minima)
        }

        query.orderBy('media_avaliacao', 'desc')

        return await query
    } catch (error) {
        console.error("ERRO NO KNEX (getSelectLaundry):", error);
        return false
    }
}

const setInsertLaundry = async function (dadosLavanderia, dadosEnderecoLavanderia) {
    try {
        return await knex.transaction(async (trx)=> {
            let arrayIdEndereco = await trx('endereco_lavanderia').insert({
                cep: dadosEnderecoLavanderia.cep,
                uf: dadosEnderecoLavanderia.uf,
                cidade: dadosEnderecoLavanderia.cidade,
                bairro: dadosEnderecoLavanderia.bairro,
                logradouro: dadosEnderecoLavanderia.logradouro,
                numero: dadosEnderecoLavanderia.numero,
                complemento: dadosEnderecoLavanderia.complemento
            })

            let idEnderecoGerado = arrayIdEndereco[0]

            let arrayIdLavanderia = await trx('lavanderia').insert({
                nome: dadosLavanderia.nome,
                descricao: dadosLavanderia.descricao,
                cnpj: dadosLavanderia.cnpj,
                tempo_padrao_lavagem: dadosLavanderia.tempo_padrao_lavagem,
                tempo_secagem: dadosLavanderia.tempo_secagem,
                preco_padrao_lavagem: dadosLavanderia.preco_padrao_lavagem,
                preco_padrao_secagem: dadosLavanderia.preco_padrao_secagem,
                logo: dadosLavanderia.logo,
                e_mail: dadosLavanderia.e_mail,
                telefone: dadosLavanderia.telefone,
                fk_endereco_lavanderia: idEnderecoGerado 
            })

            return arrayIdLavanderia[0]
        })
    } catch (error) {
        return false
    }
}

const setUpdateLaundry = async function (dadosLavanderia, idLavanderia){
    try {
        let atualizar = await knex('lavanderia')
        .where('lavanderia_id', idLavanderia)
        .update({
                nome: dadosLavanderia.nome,
                descricao: dadosLavanderia.descricao,
                cnpj: dadosLavanderia.cnpj,
                tempo_padrao_lavagem: dadosLavanderia.tempo_padrao_lavagem,
                tempo_secagem: dadosLavanderia.tempo_secagem,
                preco_padrao_lavagem: dadosLavanderia.preco_padrao_lavagem,
                preco_padrao_secagem: dadosLavanderia.preco_padrao_secagem,
                logo: dadosLavanderia.logo,
                e_mail: dadosLavanderia.e_mail,
                telefone: dadosLavanderia.telefone
            })

            return atualizar
    } catch (error) {
        return false
    }
}

const setDeleteLaundry = async function(idLavanderia){
    try {
        const linhasAlteradas = await knex('lavanderia')
        .where('lavanderia_id', idLavanderia)
        .del()

        return linhasAlteradas
    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = {
    getSelectAllLaundry,
    getSelectLaundryByFilterSelect,
    getSelectLaundryById,
    setInsertLaundry,
    setUpdateLaundry,
    setDeleteLaundry
}