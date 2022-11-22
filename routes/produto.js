//Cria a rota e permite o uso no Index.js
const { Router } = require("express");
const { criar, atualizar, remover, buscar } = require("../controllers/produto") ;
const router = Router();

router.get("/:id?",  async (req,res) =>
{
    const result = await buscar(req.params.id);

    res.send(result);
});

router.post("/", async (req,res) =>
{
    const result = await criar(req.body);

    res.send(result);
});

router.put("/:id", async (req,res) =>
{
    await atualizar(req.params.id, req.body);
    const result = await buscar(req.params.id);
    //console.log("Atualizado Cliente", corpo);
    res.send(result);
});

router.delete("/:id", async (req,res) =>
{
    const result = await remover(req.params.id);
    //console.log("Removido Cliente", id);
    res.send("Remover produto (DELETE)!");
});

module.exports = router;//Exporta a rota "clientes"