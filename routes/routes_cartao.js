/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints do cartao
 * Data: 11/05/2026
 * Autor: Weslei Santos
 * Versão: 2.0 (corrigido)
 *******************************************************************************************/
const express = require('express')
const router = express.Router()
const cors = require('cors')

const controllerCartao = require('../controller/controller_cartao')

/* Get All Cards */
router.get('/cartao', cors(), async (req, res) => {

    let result = await controllerCartao.listarTodosCartoes();

    res.status(result.status_code).json(result);
});

/* Get Card por User */
router.get('/cartao/:usuario_id', async (req, res) => {
    let usuario_id = req.params.usuario_id
    let result = await controllerCartao.listarCartoesPorUsuario(usuario_id)

    if (result && result.status_code) {
        res.status(result.status_code).json(result)
    } else {
        res.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno inesperado"
        })
    }
})

/* Post Card */
router.post('/cartao', async (req, res) => {

    let cartao = req.body

    let result = await controllerCartao.inserirCartao(cartao)

    res.status(result.status_code)
    res.json(result)
})

/* Del Card */
router.delete('/cartao/:cartao_id/usuario/:usuario_id', cors(), async (req, res) => {

    let { cartao_id, usuario_id } = req.params;
    let result = await controllerCartao.deletarCartao(cartao_id, usuario_id)
    res.status(result.status_code).json(result)
})
module.exports = router