/*******************************************************************************************
 * Objetivo: Arquivo responsável pela configuração de enviar email ao usuario
 * Data: 04/05/2026
 * Autor: Arthur Angelus
 * Versão: 1.0
 *******************************************************************************************/

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({

    service: 'gmail',

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const enviarEmail = async function(destinatario, assunto, mensagem){

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,
            to: destinatario,
            subject: assunto,
            html: mensagem
        })

        return true

    } catch(error){

        console.log(error)
        return false
    }
}

module.exports = {
    enviarEmail
}