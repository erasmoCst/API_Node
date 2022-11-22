//Cria a rota e permite o uso no Index.js
const express = require("express");
const { criar } = require("../controllers/pedido");
const { connection } = require("../models");
const router = express.Router();

router.get("/:id?", function (req, res) {
  res.send("Lista de Pedidos (GET)!");
});

router.post("/", async function (req, res) {
  try {
    const result = await criar(req.body);

    res.send(result);
  } catch (error) {}
});

router.put("/:id", function (req, res) {
  console.log("Atualizado pedido", req.params.id, req.body);
  res.send("Atualizar Pedido (PUT)!");
});

router.delete("/:id", function (req, res) {
  console.log("Removido pedido", req.params.id);
  res.send("Remover Pedido (DELETE)!");
});

module.exports = router; //Exporta a rota "clientes"
