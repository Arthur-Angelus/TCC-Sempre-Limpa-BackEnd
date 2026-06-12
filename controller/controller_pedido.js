/*******************************************************************************************
 * Objetivo: Arquivo responsável pela controller da tabela pedido
 * Data de Criação: 18/05/2026
 * Autor: Kauan Lopes Pereira, Arthur Angelus
 * Versão: 2.0
 * implementando buscar pedido pelo id do usuario
 *******************************************************************************************/

const pedidoDAO = require('../model/DAO/pedido.js')
const cestoDAO = require('../model/DAO/cesto.js')
const cestoRoupaDAO = require('../model/DAO/cesto_roupa.js')

const DEFAULT_MESSAGES = require('./module/config_messages.js')
// GET ALL
const listarPedido = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultPedido = await pedidoDAO.getSelectAllPedido()

        if (resultPedido) {
            if (resultPedido.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Pedido = resultPedido

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " GET - Nenhum pedido encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " GET - Erro ao buscar pedido"
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " GET - Erro ao buscar pedido, acionar suporte técnico"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY ID
const buscarPedidoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPedido = await pedidoDAO.getSelectPedidoById(Number(id))

            if (resultPedido) {
                if (resultPedido.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Pedido = resultPedido

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar pedido id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar pedido id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar pedido id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// GET BY USER ID
const buscarPedidoUsuarioID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPedido = await pedidoDAO.getSelectPedidoByUserId(Number(id))

            if (resultPedido) {
                if (resultPedido.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Pedido = resultPedido

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar pedido usuario id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar pedido usuario id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar pedido usuario id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// GET BY USER ID
const buscarPedidoMotoristaID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPedido = await pedidoDAO.getSelectPedidoByDriverId(Number(id))

            if (resultPedido) {
                if (resultPedido.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Pedido = resultPedido

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar pedido motorista id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar pedido motorista id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar pedido motorista id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// INSERT
const inserirPedido = async function (Pedido, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosPedido(Pedido)

            if (!validar) {
                let resultPedido = await pedidoDAO.setInsertPedido(Pedido)

                if (resultPedido) {
                    let lastID = await pedidoDAO.getSelectLastID()
                    if (lastID) {
                        Pedido.pedido_id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = Pedido

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel recuperar o ID do novo pedido"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " INSERT - Não foi possivel inserir o pedido no banco de dados"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += " INSERT - Tipo de conteúdo não suportado. Use 'application/json'"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " INSERT - Erro Critico na controller, acionar suporte técnico"
        console.log("DEBUG VALIDAÇÃO:", error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// UPDATE
const atualizarPedido = async function (Pedido, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosPedido(Pedido)

            if (!validar) {
                let validarID = await buscarPedidoID(id)

                if (validarID.status_code == 200) {

                    let idPedido = Number(id)

                    let dados = Pedido
                    delete dados.id

                    let resultPedido = await pedidoDAO.setUpdatePedido(dados, idPedido)

                    if (resultPedido) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Pedido = Pedido

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " UPDATE - Não foi possivel atualizar o pedido no banco de dados"
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID
                }
            } else {
                return validar //400
            }
        } else {
            MESSAGES.ERROR_CONTENT_TYPE.message += " UPDATE - Tipo de conteúdo não suportado. Use 'application/json'"
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " UPDATE - Erro Critico na controller, acionar suporte técnico"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
// DELETE
const excluirPedido = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarPedidoID(id)

            if (validarID.status_code == 200) {

                let resultPedido = await pedidoDAO.setDeletePedido(Number(id))

                if (resultPedido) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.Pedido = resultPedido
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " DELETE - Não foi possível excluir o pedido do banco de dados"
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                MESSAGES.ERROR_NOT_FOUND.message += " DELETE - pedido não encontrado"
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += " DELETE -[ID incorreto]"
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " DELETE - controller excluir pedido, acionar suporte técnico"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


// =======================================================
// CONTROLLER: Função para o Checkout Completo
// =======================================================
const criarPedidoCompleto = async function (dadosPedidoCompleto, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));

    try {
        // Validação do Content-Type obrigatório
        if (String(contentType).toUpperCase() !== 'APPLICATION/JSON') {
            MESSAGES.ERROR_CONTENT_TYPE.message += " - Tipo de conteúdo não suportado. Use 'application/json'";
            return MESSAGES.ERROR_CONTENT_TYPE; // 415
        }

        // 1. PASSO: Validação dos campos obrigatórios que vêm do Front-end
        if (!dadosPedidoCompleto.usuario_id || !dadosPedidoCompleto.lavanderia_id || !dadosPedidoCompleto.cestos) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += " - Dados obrigatórios ausentes (usuario_id, lavanderia_id ou array de cestos).";
            return MESSAGES.ERROR_REQUIRED_FIELDS; // 400
        }

        // 2. PASSO: Executa a Stored Procedure para criar o Pedido e a Ordem de Pagamento no MySQL
        let pedidoIdGerado = await pedidoDAO.executeProcedurePedidoCompleto(dadosPedidoCompleto);

        if (!pedidoIdGerado) {
            MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += " - Falha crítica ao executar a procedure sp_criar_pedido_completo no banco.";
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
        }

        // 3. PASSO: Processamento dos Cestos e suas respectivas Roupas no MySQL (via Knex)
        for (let cestoFront of dadosPedidoCompleto.cestos) {
            
            // Traduz a lógica textual do React para os ENUMs do Banco de Dados
            let tipoLavagem = 'NORMAL';
            if (cestoFront.circulo_ativo?.includes('lavagem_pesada') || cestoFront.ciclos_selecionados?.includes('lavagem_pesada')) {
                tipoLavagem = 'PESADA'; 
            }

            let aplicaSecagem = cestoFront.ciclos_selecionados?.includes('secagem') ? 'SIM' : 'NAO';

            let objetoCesto = {
                peso_estimado: 0, // Campo padrão inicializado como zero para o MVP
                secagem: aplicaSecagem,
                tipo_lavagem: tipoLavagem,
                fk_pedido_id: pedidoIdGerado
            };

            // Insere o Cesto e recupera o ID auto-incremental gerado
            let resultCesto = await cestoDAO.setInsertCesto(objetoCesto);
            let cestoId = resultCesto[0]; 

            if (cestoId) {
                // Varre as roupas contidas dentro deste cesto específico
                for (let roupa of cestoFront.roupas) {
                    
                    let objetoCestoRoupa = {
                        fk_cesto_id: cestoId,
                        fk_roupa_id: roupa.fk_roupas_id, // Converte a nomenclatura plural do React para o singular do BD
                        quantidade: roupa.quantidade,
                        cor: roupa.cor
                    };
                    
                    // Insere o registro na tabela relacional cesto_roupa
                    await cestoRoupaDAO.setInsertReceive(objetoCestoRoupa); 
                }
            }
        }

        // 4. PASSO: Comunicação com o Gateway de Pagamentos (AbacatePay)
        let dadosPagamento = null;
        
        try {
            // Conversão obrigatória para centavos (R$ 45.00 -> 4500) para evitar quebras decimais na API de pagamento
            let valorTotalPedido = dadosPedidoCompleto.valor_ciclos + dadosPedidoCompleto.taxa_entrega + 6.00; 
            let valorEmCentavos = Math.round(valorTotalPedido * 100);

            // Converte a palavra do front para maiúsculo e garante que seja 'CARD' (Padrão AbacatePay)
            let tipoPagamentoRecebido = String(dadosPedidoCompleto.tipo_pagamento).toUpperCase();
            let metodoAbacate = tipoPagamentoRecebido === 'CARTAO' ? 'CARD' : 'PIX';

            // Requisição Http nativa para criar o link de checkout / PIX
            // Disparo seguro de servidor para servidor
            const reqAbacate = await fetch('https://api.abacatepay.com/v1/billing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.ABACATE_PAY_API_KEY}`
                },
                body: JSON.stringify({
                    frequency: "ONE_TIME",
                    methods: [metodoAbacate],
                    products: [
                        {
                            externalId: String(pedidoIdGerado),
                            name: `SempreLimpa - Pedido #${pedidoIdGerado}`,
                            quantity: 1,
                            price: valorEmCentavos
                        }
                    ],
                    returnUrl: "http://localhost:5173/sucesso", 
                    completionUrl: "http://localhost:5173/sucesso",
                    
                    // 👇 O PULO DO GATO AQUI! 
                    // Na V1, a AbacatePay exige o objeto 'customer' para autorizar a cobrança.
                    customer: {
                        name: "Guilherme", // No futuro você pode puxar o nome real do banco
                        email: "guigui.maninhogames@gmail.com", // Obrigatório na API
                        cellphone: "11999999999", 
                        taxId: "43557488802" // CPF genérico padrão para aprovar testes
                    }
                })
            });

            const resAbacate = await reqAbacate.json();
            
            if (resAbacate.success) {
                const pixTextoFallback = "00020126580014br.gov.bcb.pix0136guigui.maninhogames@gmail.com5204000053039865802BR5913Sempre Limpa6009Sao Paulo62070503***63041A2B";
                
                
                const textoRealDaApi = resAbacate.data.pix?.qrcodeText;
                dadosPagamento = {
                    url_checkout: resAbacate.data.url, 
                    codigo_copia_cola: textoRealDaApi || pixTextoFallback, 
                    url_imagem_qrcode: resAbacate.data.pix?.qrcodeImage || null
                };
            } else {
                console.error("⚠️ AbacatePay recusou a criação do checkout:", resAbacate.error);
            }
        } catch (err) {
            console.error("🔥 Falha na comunicação de rede com a API AbacatePay:", err);
            // O bloco catch isolado garante que se a API externa falhar, os dados salvos no banco não quebrem
        }

        // 5. PASSO: Montagem do cabeçalho estruturado de resposta para o cliente (Postman / React)
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
        MESSAGES.DEFAULT_HEADER.message = "Pedido completo gerado com sucesso!";
        MESSAGES.DEFAULT_HEADER.items = {
            pedido_id: pedidoIdGerado,
            pagamento: dadosPagamento // Retorna nulo se a API falhar ou os links de pagamento reais se der sucesso
        };

        return MESSAGES.DEFAULT_HEADER; // 201

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += " - Erro Crítico no Controller de Checkout Completo.";
        console.error("🔥 CRITICAL ERROR IN CONTROLLER:", error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};



// Validação dos dados INPUT - INSERT E UPDATE
const validarDadosPedido = async function (Pedido) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (Pedido.taxa_entrega == '' || Pedido.taxa_entrega == undefined ||
        Pedido.taxa_entrega == null || typeof Pedido.taxa_entrega !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Taxa de Entregador Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pedido.taxa_entregador == '' || Pedido.taxa_entregador == undefined ||
        Pedido.taxa_entregador == null || typeof Pedido.taxa_entregador !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Taxa do entregador Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pedido.taxa_app == '' || Pedido.taxa_app == undefined ||
        Pedido.taxa_app == null || typeof Pedido.taxa_app !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Taxa do app Invalida]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pedido.tempo_estimado == '' || Pedido.tempo_estimado == undefined ||
        Pedido.tempo_estimado == null || typeof Pedido.tempo_estimado !== 'string') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Tempo Estimado Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pedido.fk_status_id == '' || Pedido.fk_status_id == undefined ||
        Pedido.fk_status_id == null || typeof Pedido.fk_status_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do Status Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (Pedido.fk_lavanderia_id == '' || Pedido.fk_lavanderia_id == undefined ||
        Pedido.fk_lavanderia_id == null || typeof Pedido.fk_lavanderia_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID da Lavanderia Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else if (Pedido.fk_usuario_id == '' || Pedido.fk_usuario_id == undefined ||
        Pedido.fk_usuario_id == null || typeof Pedido.fk_usuario_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do Usuario Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }
    else if (Pedido.fk_motorista_id == '' || Pedido.fk_motorista_id == undefined ||
        Pedido.fk_motorista_id == null || typeof Pedido.fk_motorista_id !== 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do motorista Invalido]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    }
    else {
        return false
    }
}

// GET DETALHES PEDIDO BY ID
const buscarDetalhesPedidoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPedido = await pedidoDAO.getSelectDetalhesPedidoByPedidoId(Number(id))

            if (resultPedido) {
                if (resultPedido.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Pedido = resultPedido

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    MESSAGES.ERROR_NOT_FOUND.message += "controller buscar detalhes pedido id"
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                MESSAGES.ERROR_INTERNAL_SERVER_MODEL.message += "controller buscar detalhes pedido id"
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER.message += "controller buscar detalhes pedido id"
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    listarPedido,
    buscarPedidoID,
    buscarPedidoUsuarioID,
    buscarPedidoMotoristaID,
    inserirPedido,
    atualizarPedido,
    excluirPedido,
    criarPedidoCompleto,
    buscarDetalhesPedidoID
}