const buscarTodos = async (model) => {
    return await model.findAll();
  };
  
  const buscarPorId = async (model, id) => {
    return await model.findByPk(id);
  };
  
  const criar = async (model, data) => {
    return await model.create(data);
  };
  
  const atualizar = async (model, id, data) => {
    return await model.update(data, {
      where: {
        id,
      },
    });
  };
  
  const remover = async (model, id) => {
    return await model.destroy({
      where: {
        id,
      },
    });
  };
  
  module.exports = { buscarTodos, buscarPorId, criar, atualizar, remover };