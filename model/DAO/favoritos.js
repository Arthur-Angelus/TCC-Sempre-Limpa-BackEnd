const knex = require('../../db')

const insertFavorito = async function(usuarioId, lavanderiaId) {
    try {
        await knex('favoritos').insert({
            fk_usuario_id: usuarioId,
            fk_lavanderia_id: lavanderiaId
        });
        return true;
    } catch (error) {
        console.error("ERRO AO INSERIR FAVORITO:", error);
        return false;
    }
}

// Função para remover o favorito
const deleteFavorito = async function(usuarioId, lavanderiaId) {
    try {
        await knex('favoritos')
            .where({
                fk_usuario_id: usuarioId,
                fk_lavanderia_id: lavanderiaId
            })
            .del();
        return true;
    } catch (error) {
        console.error("ERRO AO DELETAR FAVORITO:", error);
        return false;
    }
}

module.exports= {
    insertFavorito,
    deleteFavorito
}