/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do usuario
 * Data: 12/05/2026
 * Autor: Arthur Angelus
 * Versão: 2.0
 * implementado função esqueci minha senha e resetar senha
 *******************************************************************************************/

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const emailService = require('../services/email.js')
const usuarioDAO = require('../model/DAO/usuario.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

// GET ALL
const listarUsuarios = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultUsuarios = await usuarioDAO.getSelectAllUsers()

        if (resultUsuarios) {
            if (resultUsuarios.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Usuarios = resultUsuarios

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar usuarios"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar usuarios"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar usuarios"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY ID
const buscarUsuarioID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultUsuarios = await usuarioDAO.getSelectUserById(Number(id))

            if (resultUsuarios) {
                if (resultUsuarios.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Usuario = resultUsuarios

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar usuario id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar usuario id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar usuario id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY EMAIL
const buscarUsuarioEmail = async function (email, senha) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (email && senha && email != '' && senha != '') {
            let resultUsuarios = await usuarioDAO.getSelectUserByEmail(email, senha)

            if (resultUsuarios) {
                if (resultUsuarios.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Usuario = resultUsuarios

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar usuario email"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar usuario email"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Email incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar usuario email"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY CPF
const buscarUsuarioCpf = async function (cpf, senha) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (cpf && senha && cpf != '' && senha != '') {
            let resultUsuarios = await usuarioDAO.getSelectUserByCpf(cpf, senha)

            if (resultUsuarios) {
                if (resultUsuarios.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCES_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCES_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Usuario = resultUsuarios

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar usuario cpf"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar usuario cpf"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[CPF incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar usuario cpf"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// INSERT
const inserirUsuarios = async function (Usuario, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir usuario"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosUsuario(Usuario)

        if (validar) {
            return validar
        }

        // 🔐 HASH DA SENHA (AQUI ESTÁ A MUDANÇA PRINCIPAL)
        const senhaHash = await bcrypt.hash(Usuario.senha, 10)
        Usuario.senha = senhaHash

        // chama DAO
        let resultUsuarios = await usuarioDAO.setInsertUsers(Usuario)

        if (!resultUsuarios) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir usuario"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await usuarioDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir usuario"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        Usuario.usuario_id = lastID
        delete Usuario.senha // não retorna senha no response

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = Usuario

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir usuario"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// UPDATE
const atualizarUsuario = async function (Usuario, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosUsuario(Usuario)

            if (!validar) {

                let validarID = await buscarUsuarioID(id)

                if (validarID.status_code == 200) {

                    let idUsuario = Number(id)

                    let dados = Usuario
                    delete dados.id

                    let resultUsuarios = await usuarioDAO.setUpdateUsers(dados, idUsuario)

                    if (resultUsuarios) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Usuario = Usuario

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar usuario"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar usuario"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar usuario"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// DELETE
const excluirUsuario = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarUsuarioID(id)

            if (validarID.status_code == 200) {

                let resultUsuarios = await usuarioDAO.setDeleteUsers(Number(id))

                if (resultUsuarios) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Usuario = resultUsuarios
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir usuario"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir usuario"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir usuario"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// VALIDAR DADOS
const validarDadosUsuario = async function (Usuario) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (Usuario.nome == '' || Usuario.nome == undefined || Usuario.nome == null || Usuario.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Usuario.e_mail == '' || Usuario.e_mail == undefined || Usuario.e_mail == null || Usuario.e_mail.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Usuario.telefone == '' || Usuario.telefone == undefined || Usuario.telefone == null || Usuario.telefone.length > 11) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Telefone incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Usuario.cpf == '' || Usuario.cpf == undefined || Usuario.cpf == null || Usuario.cpf.length > 11) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CPF incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Usuario.rne && Usuario.rne.length > 11) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [RNE incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}
// LOGIN USUARIOS BY EMAIL
const loginUsuarioEmail = async function (email, senha) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!email || !senha) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Email ou senha inválidos]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let usuario = await usuarioDAO.getSelectUserByEmail(email)

        if (!usuario) {
            return {
                status: false,
                status_code: 404,
                message: 'Usuário não encontrado'
            }
        }

        // 🔐 COMPARAÇÃO SEGURA
        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            return {
                status: false,
                status_code: 401,
                message: 'Email ou senha incorretos'
            }
        }

        // 🎟️ gera token
        const token = jwt.sign(
            {
                usuario_id: usuario.usuario_id,
                email: usuario.e_mail
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return {
            status: true,
            status_code: 200,
            message: 'Login realizado com sucesso',
            token,
            usuario: {
                usuario_id: usuario.usuario_id,
                nome: usuario.nome,
                email: usuario.e_mail
            }
        }

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += 'login email'
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// LOGIN USUARIOS BY CPF
const loginUsuarioCpf = async function (cpf, senha) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!cpf || !senha) {
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let usuario = await usuarioDAO.getSelectUserByCpf(cpf)

        if (!usuario) {
            return {
                status: false,
                status_code: 404,
                message: 'Usuário não encontrado'
            }
        }

        // 🔐 compara hash
        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            return {
                status: false,
                status_code: 401,
                message: 'CPF ou senha incorretos'
            }
        }

        const token = jwt.sign(
            {
                usuario_id: usuario.usuario_id,
                email: usuario.cpf
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return {
            status: true,
            status_code: 200,
            message: 'Login realizado com sucesso',
            token,
            usuario: {
                usuario_id: usuario.usuario_id,
                nome: usuario.nome,
                cpf: usuario.cpf
            }
        }

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += 'login cpf'
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// ESQUECI MINHA SENHA
const esqueciMinhaSenha = async function (email) {

    try {

        let usuario = await usuarioDAO.getSelectUserOnlyEmail(email)

        if (usuario) {

            if (usuario.length > 0) {

                usuario = usuario[0]

                // TOKEN JWT
                const token = jwt.sign(

                    {
                        usuario_id: usuario.usuario_id,
                        email: usuario.e_mail
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn: '15m'
                    }
                )

                // HTML EMAIL
                const mensagem = `
                    <h1>Recuperação de senha</h1>

                    <p>Use o token abaixo para redefinir sua senha:</p>

                    <h2>${token}</h2>

                    <p>Esse token expira em 15 minutos.</p>
                `

                // ENVIAR EMAIL
                const resultEmail = await emailService.enviarEmail(
                    usuario.e_mail,
                    'Recuperação de senha',
                    mensagem
                )

                if (resultEmail) {

                    return {
                        status: true,
                        status_code: 200,
                        message: 'Email enviado com sucesso'
                    }

                } else {

                    return {
                        status: false,
                        status_code: 500,
                        message: 'Erro ao enviar email'
                    }
                }

            } else {

                return {
                    status: false,
                    status_code: 404,
                    message: 'Email não encontrado'
                }
            }

        } else {

            return {
                status: false,
                status_code: 500,
                message: 'Erro interno no banco'
            }
        }

    } catch (error) {

        console.log(error)

        return {
            status: false,
            status_code: 500,
            message: 'Erro interno'
        }
    }
}
// RESETAR SENHA
const resetarSenha = async function (token, novaSenha) {

    try {

        // VALIDAR TOKEN
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        // HASH NOVA SENHA
        const senhaHash = await bcrypt.hash(novaSenha, 10)

        // UPDATE SENHA
        const result = await usuarioDAO.updateSenhaUsuario(
            decoded.usuario_id,
            senhaHash
        )

        if (result) {

            return {
                status: true,
                status_code: 200,
                message: 'Senha alterada com sucesso'
            }

        } else {

            return {
                status: false,
                status_code: 500,
                message: 'Erro ao atualizar senha'
            }
        }

        
    } catch (error) {

        console.log(error)

        return {
            status: false,
            status_code: 401,
            message: 'Token inválido ou expirado'
        }
    }
}

module.exports = {
    listarUsuarios,
    buscarUsuarioID,
    buscarUsuarioEmail,
    buscarUsuarioCpf,
    inserirUsuarios,
    atualizarUsuario,
    excluirUsuario,
    loginUsuarioEmail,
    loginUsuarioCpf,
    esqueciMinhaSenha,
    resetarSenha
}