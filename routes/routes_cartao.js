/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do cartao
 * Data: 11/05/2026
 * Autor: Weslei Santos
 * Versão: 2.0 (corrigido)
 *******************************************************************************************/

const express = require('express')
const router = express.Router()

const controllerCartao = require('../controller/controller_cartao')

router.post('/v1/semprelimpa/cartao', async (req, res) => {

    let cartao = req.body

    let result = await controllerCartao.inserirCartao(cartao)

    res.status(result.status_code)
    res.json(result)
})

module.exports = router