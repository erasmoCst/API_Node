const { Transaction } = require("sequelize");
const {
  pedido,
  produto_pedido,
  endereco_pedido,
  connection,
} = require("../models");

const criar = async (
  {
    clienteId,
    valorTotal,
    observacoes = null,
    produtos = [],
    enderecoEntrega = {},
  },
  transacao = null
) => {
  transacao = await connection.transaction(); //transacition(): Metodo do SEQUELIZE que inicia a transacao

  try 
  {
    const pedidoCriado = await pedido.create(
      {
        clienteId,
        valorTotal,
        observacoes,
      },
      { transaction: transacao }
    );

    await transacao.commit();

    return pedidoCriado;
  } 

  catch (error) 
  {
    await transacao.rollback();
    throw error; //Envia o 'error', para o try/catch da rota
  }
};

module.exports = { criar };
