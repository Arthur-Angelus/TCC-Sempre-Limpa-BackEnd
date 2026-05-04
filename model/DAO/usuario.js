/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições CRUD do usuario
 * Data: 04/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('../../db')

const getSelectAllUsers = async function () {
    knex.select('*')

    .from('usuario')

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

const getSelectUserById = async function (id) {
    knex.select('*')

    .from('usuario')

    .where({ id: id})

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

const getSelectUserByEmail = async function (email, senha) {
    knex.select('*')

    .from('usuario')

    .where({ email: email, senha: senha})

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

const getSelectUserByCpf = async function (cpf, senha) {
    knex.select('*')

    .from('usuario')

    .where({ cpf: cpf, senha: senha})

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

const setInsertUsers = async function () {
    knex('usuario').insert({
        nome: 'joseph',
        e_mail: 'josephReiDelas@gmail.com',
        telefone: '11940583423',
        cpf: '85747584754',
        rne: '',
        fk_endereco: 1
    })
}

const setUpdateUsers = async function () {
    knex('usuario')
    
    .where({ id: 1})
    
    .update({
        nome: 'joseph',
        e_mail: 'josephReiDelas@gmail.com',
        telefone: '11940583423',
        cpf: '85747584754',
        rne: '',
        fk_endereco: 1
    })
}

const setDeleteUsers = async function () {
    knex('usuario')
    
    .where({ id: 1})
    
    .del()
}

const getSelectLastID = async function (){
    const getSelectUserById = async function (id) {
        knex.select('*')
    
        .from('usuario')
    
        .where({ id: id})
    
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
}

module.exports = {
    getSelectAllUsers,
    getSelectUserById,
    getSelectUserByEmail,
    getSelectUserByCpf,
}