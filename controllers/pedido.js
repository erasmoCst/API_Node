const { Transaction } = require("sequelize");
const {
  cliente,
  pedido,
  produto,
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

  try {
    const pedidoCriado = await pedido.create(
      {
        clienteId,
        valorTotal,
        observacoes,
      },
      { transaction: transacao }
    );

    for (const item of produtos) {
      await produto_pedido.create(
        {
          pedidoId: pedidoCriado.id,
          produtoId: item.id,
          quantidade: item.quantidade,
          valorTotal: item.valorTotal,
        },
        { transaction: transacao }
      );
    }

    enderecoEntrega["pedidoId"] = pedidoCriado.id;
    //

    await endereco_pedido.create(enderecoEntrega, {
      transaction: transacao,
    });

    await transacao.commit();

    return pedidoCriado;
  } catch (error) {
    await transacao.rollback();
    throw error; //Envia o 'error', para o try/catch da rota
  }
};

const buscarPorId = async (id, clienteId) => {
  try {
    const options = {
      include: [
        {
          model: cliente,
          as: "cliente",
        },
        {
          model: produto_pedido,
          as: "produto_pedidos",
          include: [
            {
              model: produto,
              as: "produto",
            },
          ],
        },
      ],
      where: {
        clienteId,
      },
    };

    if (id) {
      options.where.id = id;
    }

    return id
      ? await pedido.findOne({ ...options, where: { id } })
      : await pedido.findAll(options);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const atualizar = async (
  id,
  { valorTotal = null, observacoes = null },
  produtos = [],
  enderecoEntrega = {}
) => {
  const transacao = await connection.transaction();
  try {
    await pedido.update(
      { valorTotal, observacoes },
      { where: { id }, transacao }
    );

    await produto_pedido.destroy({
      where: { pedidoId: id },
      transaction: transacao,
    });

    for (const item of produtos) {
      await produto_pedido.create(
        {
          pedidoId: id,
          produtoId: item.id,
          quantidade: item.quantidade,
          valorTotal: item.valorTotal,
        },
        { transaction: transacao }
      );
    }

    await endereco_pedido.update(enderecoEntrega, {
      where: { pedidoId: id },
      transaction: transacao,
    });
    await transacao.commit();
  } catch (error) {
    await transacao.rollback();
    throw error;
  }
};

const remover = async (id) => {
  transacao = await connection.transaction();

  try {
    await endereco_pedido.destroy({
      where: {
        pedidoId: id,
      },
      transaction: transacao,
    });
    await produto_pedido.destroy({
      where: {
        pedidoId: id,
      },
      transaction: transacao,
    });
    await pedido.destroy({
      where: {
        id,
      },
      transaction: transacao,
    });

    await transacao.commit();
  } catch (error) {
    await transacao.rollback();
    throw error;
  }
};

module.exports = { criar, buscarPorId, remover, atualizar };
