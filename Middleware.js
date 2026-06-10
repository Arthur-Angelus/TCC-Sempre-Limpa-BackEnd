/*******************************************************************************************
 * Objetivo: Arquivo responsável pela validação do jwt web token
 * Data: 08/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const jwt = require('jsonwebtoken')

const validarJWT = async function (request, response, next) {

    try {

        const authHeader = request.headers.authorization

        if (!authHeader) {
            return response.status(401).json({
                status: false,
                message: 'Token não informado'
            })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        request.usuario = decoded

        next()

    } catch (error) {

        return response.status(401).json({
            status: false,
            message: 'Token inválido ou expirado'
        })
    }
}

module.exports = {
    validarJWT
}