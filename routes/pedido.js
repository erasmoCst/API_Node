//Cria a rota e permite o uso no Index.js
const express = require("express");
const { criar, buscarPorId, remover } = require("../controllers/pedido");
const { connection } = require("../models");
const router = express.Router();

router.get("/:id?", async (req, res) => {
  try {
    const result = await buscarPorId(req.params.id);

    res.send(result);
  } catch (error) {
    res.status(500).send({ mensegem: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const pedidoCriado = await criar(
      req.body,
      req.body.produtos,
      req.body.enderecoEntrega
    );

    const result = await buscarPorId(pedidoCriado.id);

    res.send(result);
  } catch (error) {
    res.status(500).send({
      mensagem: error.message,
    });
  }
});

router.put("/:id", function (req, res) {
  console.log("Atualizado pedido", req.params.id, req.body);
  res.send("Atualizar Pedido (PUT)!");
});

router.delete("/:id", async (req, res) => {
  try {
    await remover(req.params.id);
    
    res.send();
  } catch (error) {
    res.status(500).send({ mensagem: error.message })
  }
});

module.exports = router; //Exporta a rota "clientes"
