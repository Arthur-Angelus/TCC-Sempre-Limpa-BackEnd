/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do endereco da lavanderia
 * Data: 11/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const req = require('express/lib/request')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerEnderecoLavanderia = require('../controller/controller_endereco_lavanderia.js')

router.get('/v1/semprelimpa/enderecolavanderia', cors(), async function(request, response){
    let enderecoLavanderia = await controllerEnderecoLavanderia.listarTodosEnderecosLavanderias()
    
        response.status(enderecoLavanderia.status_code)
        response.json(enderecoLavanderia)
})

module.exports = router