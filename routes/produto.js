const { Router } = require("express");
const router = Router();
const { buscarTodos, buscarPorId } = require("../controllers/basic");
const { criar, atualizar, remover, buscar } = require("../controllers/produto");
const { produto } = require("../models");

router.get("/:id?", async (req, res) => {
  try {
    const result = req.params.id
      ? await buscarPorId(produto, req.params.id)
      : await buscarTodos(produto);

    res.send(result);
  } catch (error) {
    res.status(500).send({ mensagem: error.message });
  }
});

router.post("/", async (req, res) => {
  try{
    const result = await criar(req.params.id);

    res.send(result);
    }catch(error){
        res.status(500).send({mensagem: error.message})
    }
});

router.put("/:id", async (req, res) => {
  try{
    await atualizar(req.params.id), req.body;
    const result = await buscar(req.params.id);

    res.send(result);
    }catch(error){
        res.status(500).send({mensagem: error.message})
    }
});

router.delete("/:id", async (req, res) => {
  try{
    await remover(req.params.id);

    res.send(result);
    }catch(error){
        res.status(500).send({mensagem: error.message})
    }
});

module.exports = router;
