/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do endereco
 * Data: 05/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

const getSelectAllAdress = async function () {
    knex.select('*')

        .from('endereco')

        .then(rows => {

            console.log(rows);

        })

        .catch(err => {

            console.error(err);

        })

        .finally(() => {

            knex.destroy();

        });
}

const getSelectAdressById = async function (id) {
    knex.select('*')

        .from('usuario')

        .where({ id: id })

        .first()

        .then(rows => {

            console.log(rows);

        })

        .catch(err => {

            console.error(err);

        })

        .finally(() => {

            knex.destroy();

        });
}

const setInsertAdress = async function () {
    knex('endereco').insert({
        cep: '02384-917',
        uf: 'sp',
        cidade: 'saquarema',
        bairro: 'sao masquilhos',
        logradouro: 'rua pablo pasqualhenquick',
        numero: '3974',
        complemento: 'do lado do bar do thomas turbando'
    })
}

const setUpdateAdress = async function (id) {
    knex('endereco')

        .where({ id: id })

        .update({
            cep: '02384-917',
            uf: 'sp',
            cidade: 'saquarema',
            bairro: 'sao masquilhos',
            logradouro: 'rua pablo pasqualhenquick',
            numero: '3974',
            complemento: 'do lado do bar do thomas turbando'
        })
}

const setDeleteAdress = async function (id) {
    knex('endereco')

        .where({ id: id })

        .del()
}

const getSelectLastID = async function () {
    knex.select('*')

        .from('endereco')

        .where({ id: id })

        .last()

        .then(rows => {

            console.log(rows);

        })

        .catch(err => {

            console.error(err);

        })

        .finally(() => {

            knex.destroy();

        });
}

module.exports = {
    getSelectAllAdress,
    getSelectAdressById,
    setInsertAdress,
    setUpdateAdress,
    setDeleteAdress,
    getSelectLastID
}