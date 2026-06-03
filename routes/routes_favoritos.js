
/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da tabela relacionamento favoritos
 * Data: 03/06/2026
 * Autor: Guilherme Viana
 * Versão: 1.0
 *******************************************************************************************/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const req = require('express/lib/request')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerFavorito = require('../controller/controller_favoritos.js')

router.post('/favorito', cors(), async function (request, response){
    
    let dadosRequest = request.body; 
    let resultado = await controllerFavorito.favoritarLavanderia(dadosRequest);
    
    response.status(resultado.status_code || 500).json(resultado);
});


router.delete('/favorito', cors(), async function (request, response){
    
    // Convertendo os textos da URL para Números reais antes de mandar pra Controller
    const dadosFormatados = {
        usuario_id: Number(request.query.usuario_id),
        lavanderia_id: Number(request.query.lavanderia_id)
    };
    console.log(dadosFormatados)
    
    let resultado = await controllerFavorito.desfavoritarLavanderia(dadosFormatados);
    
    response.status(resultado.status_code || 500).json(resultado);
});

module.exports = router