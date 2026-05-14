/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller de Roupas
 * Data: 13/05/2026
 * Autor: Guilherme Viana de Souza
 * Contributor: Kauan Lopes Pereira
 * Versão: 1.0
 *******************************************************************************************/

const roupasDAO = require('../model/DAO/roupa.js')
const DEFAULT_MESSAGES = require('./module/config_messages.js')

// SELECT ALL
const listarTodasRoupas = async function(){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let todasRoupas = await roupasDAO.getAllClothes()
        if(todasRoupas){
            if(todasRoupas.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.roupas = todasRoupas
                
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
// SELECT BY ID
const listarRoupaPorId = async function(id_roupa){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if(!isNaN(id_roupa) && id_roupa !='' && id_roupa!= null && id_roupa > 0) {
            let resultRoupa = await roupasDAO.getClothesById(Number(id_roupa))

            if(resultRoupa !== false) {
                if(resultRoupa !== undefined) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                    MESSAGES.DEFAULT_HEADER.items.roupa = resultRoupa 

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// SELECT BY NAME
const listarRoupaPorNome = async function (nome_peca){
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let validarRoupa = validarDadosRoupa({nome_peca: nome_peca})
        if(!validarRoupa){
            let resultRoupas = await roupasDAO.getClothesByName(nome_peca)
            if(resultRoupas) {
                if(resultRoupas.length != 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                    MESSAGES.DEFAULT_HEADER.items.roupas = resultRoupas

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL += "GET BY NAME - Não foi possível buscar a roupa por nome no banco de dados"
            }
        } else {
            return validarRoupa // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// INSERT
const inserirRoupa = async function (Roupa, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += " INSERT - controller inserir roupa"
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
        // validação
        let validar = await validarDadosRoupa(Roupa)
        if (validar) {
            return validar // 400
        }
        // chama DAO
        let resultRoupas = await roupasDAO.setInsertClothes(Roupa)

        if (!resultRoupas) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possível inserir a roupa no banco de dados"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }

        let lastID = await roupasDAO.getSelectLastID()

        if (!lastID) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possível recuperar o ID da roupa inserida"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }

        Roupa.roupa_id = lastID
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
        MESSAGES.DEFAULT_HEADER.items = Roupa

        return MESSAGES.DEFAULT_HEADER

    } catch (error) {

        console.log(error)

        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " INSERT - Erro critico na controller de roupa, contatar o suporte " 
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// UPDATE
const atualizarRoupa = async function (Roupa, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosRoupa(Roupa)

            if (!validar) {

                let validarID = await listarRoupaPorId(id)

                if (validarID.status_code == 200) {

                    let idRoupa = Number(id)

                   let dados = Roupa
                    let resultRoupas = await roupasDAO.setUpdateClothes(idRoupa, dados)
                    console.log("DEBUG", resultRoupas)
                    if (resultRoupas) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Roupa = Roupa

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " UPDATE - Não foi possível atualizar a roupa no banco de dados"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += " UPDATE - Tipo de conteúdo enviado não é do tipo JSON"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " UPDATE - Erro critico na controller de roupa, contatar o suporte"
        console.log("DEBUG",error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para validar os dados da roupa
const validarDadosRoupa = function (dadosRoupa) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    if (dadosRoupa.nome_peca == '' || dadosRoupa.nome_peca == undefined || 
        dadosRoupa.nome_peca == null || dadosRoupa.nome_peca.length > 100 ||
        dadosRoupa.nome_peca.length == 0 || !isNaN(dadosRoupa.nome_peca)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message +=  " [Nome da peça incorreto ou vazio]"
        return MESSAGES.ERROR_REQUIRED_FIELDS // 400
    } else {
        return false 
    }
}

module.exports = {
    listarTodasRoupas,
    listarRoupaPorId,
    listarRoupaPorNome,
    inserirRoupa,
    atualizarRoupa  
}