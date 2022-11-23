const { Router } = require("express");
const router = Router();
const { buscarTodos, buscarPorId } = require("../controllers/basic");
const { criar, atualizar, remover, buscar } = require("../controllers/produto");
const { produto } = require("../models");

router.get("/:id?", async (req, res) => {
  const result = req.params.id
    ? await buscarPorId(produto, req.params.id)
    : await buscarTodos(produto);

  res.send(result);
});

router.post("/", async (req, res) => {
  const result = await criar(req.body);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  await atualizar(req.params.id, req.body);
  const result = await buscar(req.params.id);

  res.send(result);
});

router.delete("/:id", async (req, res) => {
  await remover(req.params.id);

  res.send();
});

module.exports = router;