/*******************************************************************************************
 * Objetivo: Arquivo responsável pelos endpoints da localizacao
 * Data: 11/06/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const router = express.Router()

const controller = require('../../controller/localizacao/controller_localizacao.js')

// CREATE
router.post('/localizacao', async (req, res) => {
    const result = await controller.criarLocalizacao(req.body)
    res.status(result.status_code).json(result)
})

// READ ALL
router.get('/localizacao', async (req, res) => {
    const result = await controller.listarLocalizacoes()
    res.status(result.status_code).json(result)
})

// READ BY ID
router.get('/localizacao/:id', async (req, res) => {
    const result = await controller.buscarLocalizacao(req.params.id)
    res.status(result.status_code).json(result)
})

// UPDATE
router.put('/localizacao/:id', async (req, res) => {
    const result = await controller.atualizarLocalizacao(req.params.id, req.body)
    res.status(result.status_code).json(result)
})

// DELETE
router.delete('/localizacao/:id', async (req, res) => {
    const result = await controller.deletarLocalizacao(req.params.id)
    res.status(result.status_code).json(result)
})

module.exports = router