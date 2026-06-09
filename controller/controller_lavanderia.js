/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela lavanderia
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Versão: 1.0
 *******************************************************************************************/

const lavanderiaDAO = require('../model/DAO/lavanderia.js')
const controllerEnderecoLavanderia = require('./controller_endereco_lavanderia.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

async function selecionarMediaLavanderias() {
    try {
        const dados = await knex('vw_media_lavanderias');

        return {
            status_code: 200,
            items: {
                lavanderias: dados
            }
        };
    } catch (error) {
        return {
            status_code: 500,
            message: 'Erro ao selecionar a média das lavanderias.'
        };
    }
}

const selecionarTodasLavanderia = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let lavanderias = await lavanderiaDAO.getSelectAllLaundry()
        if (lavanderias) {
            if (lavanderias.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.lavanderia = lavanderias

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const selecionarLavanderiaPorId = async function (id_lavanderia) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id_lavanderia) && id_lavanderia != '' && id_lavanderia != null && id_lavanderia > 0) {
            let lavanderia = await lavanderiaDAO.getSelectLaundryById(Number(id_lavanderia))
            if (lavanderia !== false) {
                if (lavanderia !== undefined) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.lavanderia = lavanderia

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const selecionarLavanderiaPorFiltro = async function (parametrosQuery) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let filtros = {}

        if (parametrosQuery.cidade != '' && parametrosQuery.cidade != undefined) {
            filtros.cidade = parametrosQuery.cidade
        }
        if (parametrosQuery.bairro != '' && parametrosQuery.bairro != undefined) {
            filtros.bairro = parametrosQuery.bairro
        }
        if (parametrosQuery.avaliacao_minima != '' && parametrosQuery.avaliacao_minima != undefined && !isNaN(parametrosQuery.avaliacao_minima)) {
            filtros.avaliacao_minima = Number(parametrosQuery.avaliacao_minima)
        }
        if (parametrosQuery.preco_max_lavagem != '' && parametrosQuery.preco_max_lavagem != undefined && !isNaN(parametrosQuery.preco_max_lavagem)) {
            filtros.preco_max_lavagem = Number(parametrosQuery.preco_max_lavagem)
        }
        if (parametrosQuery.preco_max_secagem != '' && parametrosQuery.preco_max_secagem != undefined && !isNaN(parametrosQuery.preco_max_secagem)) {
            filtros.preco_max_secagem = Number(parametrosQuery.preco_max_secagem)
        }
        if (Object.keys(filtros).length === 0) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nenhum parâmetro de filtro foi selecionado]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        let lavanderia = await lavanderiaDAO.getSelectLaundryByFilterSelect(filtros)
        if (lavanderia) {
            if (lavanderia.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.lavanderia = lavanderia

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const inserirLavanderia = async function (dadosRequisicao, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let dadosEndereco = {
                cep: dadosRequisicao.cep,
                uf: dadosRequisicao.uf,
                cidade: dadosRequisicao.cidade,
                bairro: dadosRequisicao.bairro,
                logradouro: dadosRequisicao.logradouro,
                numero: dadosRequisicao.numero,
                complemento: dadosRequisicao.complemento
            }

            let dadosLavanderia = {
                nome: dadosRequisicao.nome,
                descricao: dadosRequisicao.descricao,
                cnpj: dadosRequisicao.cnpj,
                tempo_padrao_lavagem: dadosRequisicao.tempo_padrao_lavagem,
                tempo_secagem: dadosRequisicao.tempo_secagem,
                preco_padrao_lavagem: dadosRequisicao.preco_padrao_lavagem,
                preco_padrao_secagem: dadosRequisicao.preco_padrao_secagem,
                logo: dadosRequisicao.logo,
                e_mail: dadosRequisicao.e_mail,
                telefone: dadosRequisicao.telefone
            }


            let resultadoValidacaoEndereco = await controllerEnderecoLavanderia.validarDadosEnderecoLavanderia(dadosEndereco)
            if (resultadoValidacaoEndereco != false) {
                return resultadoValidacaoEndereco
            }

            let resultadoValidacaoLavanderia = await validarDadosLavanderia(dadosLavanderia)
            if (resultadoValidacaoLavanderia != false) {
                return resultadoValidacaoLavanderia
            }

            let resultadoInsert = await lavanderiaDAO.setInsertLaundry(dadosLavanderia, dadosEndereco)
            if (resultadoInsert) {
                dadosLavanderia.id = resultadoInsert
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.lavanderiaCompleta = {
                    lavanderia_id: resultadoInsert,
                    ...dadosLavanderia,
                    endereco: dadosEndereco
                }

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarLavanderia = async function (dadosRequisicao, id_lavanderia, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosLavanderia(dadosRequisicao)
            if (!validar) {
                let validarID = await selecionarLavanderiaPorId(id_lavanderia)
                if (validarID.status_code == 200) {
                    let idLavanderia = Number(id_lavanderia)
                    let dados = dadosRequisicao

                    let resultLavanderia = await lavanderiaDAO.setUpdateLaundry(dados, idLavanderia)
                    if (resultLavanderia) {
                        dados.id = id_lavanderia

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.enderecoLavanderia = dados

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validarID
                }
            } else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const deletarLavanderia = async function (id_lavanderia) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let validarID = await selecionarLavanderiaPorId(id_lavanderia)
        if (validarID.status_code == 200) {
            let idEncontrado = Number(id_lavanderia)

            let resultDelete = await lavanderiaDAO.setDeleteLaundry(idEncontrado)
            if (resultDelete) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                MESSAGES.DEFAULT_HEADER.items.enderecoLavanderia = { id: idEnderecoLavanderia }

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return validarID
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const validarDadosLavanderia = async function (dados) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (dados.nome == '' || dados.nome == undefined || dados.nome == null || dados.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto ou vazio]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (dados.cnpj == '' || dados.cnpj == undefined || dados.cnpj == null || dados.cnpj.length != 14 || isNaN(dados.cnpj)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CNPJ incorreto, deve conter 14 números]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (dados.preco_padrao_lavagem == '' || dados.preco_padrao_lavagem == undefined || dados.preco_padrao_lavagem == null || isNaN(dados.preco_padrao_lavagem)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Preço de lavagem obrigatório e numérico]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (dados.preco_padrao_secagem == '' || dados.preco_padrao_secagem == undefined || dados.preco_padrao_secagem == null || isNaN(dados.preco_padrao_secagem)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Preço de secagem obrigatório e numérico]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (dados.e_mail != undefined && dados.e_mail != '' && dados.e_mail != null && (!String(dados.e_mail).includes('@') || dados.e_mail.length > 255)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [E-mail inválido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (dados.telefone != undefined && dados.telefone != '' && dados.telefone != null && (isNaN(dados.telefone) || String(dados.telefone).length < 11)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Telefone inválido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}


module.exports = {
    selecionarTodasLavanderia,
    selecionarLavanderiaPorId,
    selecionarLavanderiaPorFiltro,
    inserirLavanderia,
    atualizarLavanderia,
    deletarLavanderia,
    selecionarMediaLavanderias
}