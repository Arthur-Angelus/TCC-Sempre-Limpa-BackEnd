/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas configurações do knex
 * Data: 04/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  test: {
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    useNullAsDefault: true,
    migrations: { directory: './migrations' },
    seeds: { directory: './seeds' }
  },

  development: {
    development: {
      client: 'mysql2',
      connection: {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'sempre_limpa_db'
      }
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};