/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisição do banco de dados no knex
 * Data: 04/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'sempre_limpa_db'
    }
});