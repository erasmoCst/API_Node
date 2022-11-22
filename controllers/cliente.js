const { cliente } = require("../models");

const create = async ({ nome, email, senha, cpf }) => {
  const [result, isNewRecord] = await cliente.findOrCreate({
    defaults: {
      nome,
      email,
      senha,
      cpf,
    },
    where: {
      email,
    },
  });

  console.log("Novo Registro?", isNewRecord);
  return result;
};

const atualizar = async (id, { nome, senha, cpf }) => {
  const result = await cliente.update(
    {
      nome,
      senha,
      cpf,
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
  const result = await cliente.destroy({
    where: {
      id,
    },
  });
};

const buscar = async (id = null) => {
  const atributos = ["id", "nome", "email", "cpf"];
  if (id) {
    return await cliente.findByPk(id, {
      atributos,
    });
  }
  return await cliente.findAll({
    atributos,
  });
};

module.exports = { create, atualizar, remover, buscar };
