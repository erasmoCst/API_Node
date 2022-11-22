const { Router } = require("express");
const { criar, atualizar, remover, buscar } = require("../controllers/tipo_produto");
const router = Router();
const { searchAll } = require("../controllers/basic");
const { tipo_produto } = require("../models");

router.get("/:id?", async(req,res) => 
{
    let result = await searchAll(tipo_produto);

    //const result = await buscar(req.params.id);

    res.send(result);
});

router.post("/",async(req,res)=>
{
    const result = await criar(req.body);
    res.send(result);
});

router.put("/:id", async (req,res) =>
{
    await atualizar(req.params.id, req.body);
    const result = await buscar(req.params.id);
    res.send(result);
})

router.delete("/:id", async(req,res) => 
{
    const result = await(req.params.id);
    res.send("Tipo de produto Removido");
});

module.exports = router;