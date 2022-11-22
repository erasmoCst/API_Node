const { produto } = require("../models");

const criar = async ({ nome, valor, descricao, tipoProduto }) => {
  const result = await produto.create({
      nome,
      valor,
      descricao,
      tipoProduto,
  });

  return result;
};

const atualizar = async (id, { nome, valor, descricao, tipo_produto }) => {
  const result = await produto.update(
    {
      nome,
      valor,
      descricao,
      tipoProduto,
    },
    {
      where: {
        id,
      },
    }
  );

  return result;
};

const remover = async (id) => {
  const result = await produto.destroy({
    where: {
      id,
    },
  });
};

const buscar = async (id = null) => {
  const atributos = ["id", "nome", "valor", "descricao", "tipo_produto"];
  if (id) {
    return await produto.findByPk(id, {
      atributos,
    });
  }
  return await produto.findAll({
    atributos,
  });
};

module.exports = { criar, atualizar, remover, buscar };
