/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela status_pedido
 * Data: 11/05/2026
 * Autor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const statusDAO = require('../model/DAO/status.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')

const listarStatus = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultStatus = await statusDAO.getSelectAllStatus()

        if (resultStatus) {
            if (resultStatus.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Status = resultStatus

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar status"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar status"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar status"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

/*
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

const inserirUsuarios = async function (Usuario, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosUsuario(Usuario)

            if (!validar) {
                let resultUsuarios = await usuarioDAO.setInsertUsers(Usuario)

                console.log("DEBUG INSERT RESULT:", resultUsuarios)

                if (!resultUsuarios) {
                    throw new Error("Insert retornou falso")
                }

                if (resultUsuarios) {
                    let lastID = await usuarioDAO.getSelectLastID()
                    if (lastID) {
                        Usuario.usuario_id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = Usuario

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir usuario"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir usuario"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir usuario"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir usuario"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

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

const loginUsuarioEmail = async function (email, senha) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (email == '' || senha == '') {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Email ou senha inválidos]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        } else {

            let resultUsuario = await usuarioDAO.getSelectUserByEmail(email, senha)

            if (resultUsuario) {

                if (resultUsuario.length > 0) {

                    let usuario = resultUsuario[0]

                    // GERAR TOKEN
                    const token = jwt.sign(
                        {
                            id: usuario.id,
                            email: usuario.e_mail
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1h'
                        }
                    )

                    return {
                        status: true,
                        status_code: 200,
                        message: 'Login realizado com sucesso',
                        token: token,
                        usuario: {
                            id: usuario.id,
                            nome: usuario.nome,
                            email: usuario.e_mail
                        }
                    }

                } else {

                    return {
                        status: false,
                        status_code: 401,
                        message: 'Email ou senha incorretos'
                    }
                }

            } else {

                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += 'login usuario'
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += 'login usuario'
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const loginUsuarioCpf = async function (cpf, senha) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (cpf == '' || senha == '') {

            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Cpf ou senha inválidos]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        } else {

            let resultUsuario = await usuarioDAO.getSelectUserByCpf(cpf, senha)

            if (resultUsuario) {

                if (resultUsuario.length > 0) {

                    let usuario = resultUsuario[0]

                    // GERAR TOKEN
                    const token = jwt.sign(
                        {
                            id: usuario.id,
                            email: usuario.cpf
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1h'
                        }
                    )

                    return {
                        status: true,
                        status_code: 200,
                        message: 'Login realizado com sucesso',
                        token: token,
                        usuario: {
                            id: usuario.id,
                            nome: usuario.nome,
                            email: usuario.cpf
                        }
                    }

                } else {

                    return {
                        status: false,
                        status_code: 401,
                        message: 'Cpf ou senha incorretos'
                    }
                }

            } else {

                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += 'login usuario'
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += 'login usuario'
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

*/

module.exports = {
    listarStatus,
}