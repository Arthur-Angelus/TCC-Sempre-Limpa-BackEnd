/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller do Motorista
 * Data: 12/05/2026
 * Autor: Arthur Angelus
 * Versão: 2.0
 * implementado função esqueci minha senha e resetar senha
 *******************************************************************************************/

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const emailService = require('../../services/email.js')
const motoristaDAO = require('../../model/DAO/motorista/motorista.js')
const DEFAULT_MESSAGES = require('../module/config_messages.js')

// GET ALL
const listarMotoristas = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultMotoristas = await motoristaDAO.getSelectAllDriver()

        if (resultMotoristas) {
            if (resultMotoristas.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Motoristas = resultMotoristas

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Motoristas"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Motoristas"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Motoristas"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY ID
const buscarMotoristaID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultMotoristas = await motoristaDAO.getSelectDriverById(Number(id))

            if (resultMotoristas) {
                if (resultMotoristas.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Motorista = resultMotoristas

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Motorista id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Motorista id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Motorista id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY EMAIL
const buscarMotoristaEmail = async function (email, senha) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (email && senha && email != '' && senha != '') {
            let resultMotoristas = await motoristaDAO.getSelectDriverByEmail(email, senha)

            if (resultMotoristas) {
                if (resultMotoristas.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Motorista = resultMotoristas

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Motorista email"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Motorista email"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Email incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Motorista email"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY CPF
const buscarMotoristaCpf = async function (cpf, senha) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (cpf && senha && cpf != '' && senha != '') {
            let resultMotoristas = await motoristaDAO.getSelectDriverByCpf(cpf, senha)

            if (resultMotoristas) {
                if (resultMotoristas.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCES_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCES_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Motorista = resultMotoristas

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar Motorista cpf"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar Motorista cpf"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[CPF incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar Motorista cpf"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// INSERT
const inserirMotoristas = async function (Motorista, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller inserir Motorista"
            return MESSAGES.ERROR_CONTENT_TYPE
        }

        // validação
        let validar = await validarDadosMotorista(Motorista)

        if (validar) {
            return validar
        }

        // 🔐 HASH DA SENHA (AQUI ESTÁ A MUDANÇA PRINCIPAL)
        const senhaHash = await bcrypt.hash(Motorista.senha, 10)
        Motorista.senha = senhaHash

        // chama DAO
        let resultMotoristas = await motoristaDAO.setInsertDriver(Motorista)

        if (!resultMotoristas) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Motorista"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        let lastID = await motoristaDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller inserir Motorista"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }

        Motorista.Motorista_id = lastID
        delete Motorista.senha // não retorna senha no response

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = Motorista

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller inserir Motorista"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// UPDATE
const atualizarMotorista = async function (Motorista, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosMotorista(Motorista)

            if (!validar) {

                let validarID = await buscarMotoristaID(id)

                if (validarID.status_code == 200) {

                    let idMotorista = Number(id)

                    let dados = Motorista
                    delete dados.id

                    let resultMotoristas = await motoristaDAO.setUpdateDriver(dados, idMotorista)

                    if (resultMotoristas) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Motorista = Motorista

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller atualizar Motorista"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += "controller atualizar Motorista"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller atualizar Motorista"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// DELETE
const excluirMotorista = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarMotoristaID(id)

            if (validarID.status_code == 200) {

                let resultMotoristas = await motoristaDAO.setDeleteDriver(Number(id))

                if (resultMotoristas) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Motorista = resultMotoristas
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller excluir Motorista"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += "controller excluir Motorista"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller excluir Motorista"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// VALIDAR DADOS
const validarDadosMotorista = async function (Motorista) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (Motorista.nome == '' || Motorista.nome == undefined || Motorista.nome == null || Motorista.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Motorista.data_nascimento == '' || Motorista.data_nascimento == undefined || Motorista.data_nascimento == null || Motorista.data_nascimento.length > 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data nascimento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Motorista.cpf == '' || Motorista.cpf == undefined || Motorista.cpf == null || Motorista.cpf.length > 11) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CPF incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Motorista.telefone == '' || Motorista.telefone == undefined || Motorista.telefone == null || Motorista.telefone.length > 11) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Telefone incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Motorista.email == '' || Motorista.email == undefined || Motorista.email == null || Motorista.email.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Email incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Motorista.cnh != null && Motorista.cnh > 11) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Cnh incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Motorista.foto == '' || Motorista.foto == undefined || Motorista.foto == null || Motorista.foto.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [foto incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Motorista.fk_dados_bancarios_id == null || isNaN(Motorista.fk_dados_bancarios_id) || Motorista.fk_dados_bancarios_id <= 0) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message = "[fk_dados_bancarios_id inválido]";
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}
// LOGIN Motoristas BY EMAIL
const loginMotoristaEmail = async function (email, senha) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!email || !senha) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Email ou senha inválidos]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let Motorista = await motoristaDAO.getSelectDriverByEmail(email)

        if (!Motorista) {
            return {
                status: false,
                status_code: 404,
                message: 'Usuário não encontrado'
            }
        }

        // 🔐 COMPARAÇÃO SEGURA
        const senhaValida = await bcrypt.compare(senha, Motorista.senha)

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
                Motorista_id: Motorista.Motorista_id,
                email: Motorista.data_nascimento
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return {
            status: true,
            status_code: 200,
            message: 'Login realizado com sucesso',
            token,
            Motorista: {
                Motorista_id: Motorista.Motorista_id,
                nome: Motorista.nome,
                email: Motorista.data_nascimento
            }
        }

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += 'login email'
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// LOGIN Motoristas BY CPF
const loginMotoristaCpf = async function (cpf, senha) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!cpf || !senha) {
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

        let Motorista = await motoristaDAO.getSelectDriverByCpf(cpf)

        if (!Motorista) {
            return {
                status: false,
                status_code: 404,
                message: 'Usuário não encontrado'
            }
        }

        // 🔐 compara hash
        const senhaValida = await bcrypt.compare(senha, Motorista.senha)

        if (!senhaValida) {
            return {
                status: false,
                status_code: 401,
                message: 'CPF ou senha incorretos'
            }
        }

        const token = jwt.sign(
            {
                Motorista_id: Motorista.Motorista_id,
                email: Motorista.cpf
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return {
            status: true,
            status_code: 200,
            message: 'Login realizado com sucesso',
            token,
            Motorista: {
                Motorista_id: Motorista.Motorista_id,
                nome: Motorista.nome,
                cpf: Motorista.cpf
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

        let Motorista = await motoristaDAO.getSelectDriverOnlyEmail(email)

        if (Motorista) {

            if (Motorista.length > 0) {

                Motorista = Motorista[0]

                // TOKEN JWT
                const token = jwt.sign(

                    {
                        Motorista_id: Motorista.Motorista_id,
                        email: Motorista.data_nascimento
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
                    Motorista.data_nascimento,
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
        const result = await motoristaDAO.updateSenhaMotorista(
            decoded.Motorista_id,
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
    listarMotoristas,
    buscarMotoristaID,
    buscarMotoristaEmail,
    buscarMotoristaCpf,
    inserirMotoristas,
    atualizarMotorista,
    excluirMotorista,
    loginMotoristaEmail,
    loginMotoristaCpf,
    esqueciMinhaSenha,
    resetarSenha
}