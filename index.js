//Metodo de inicalizacao EXPRESS de acordo com a documentacao
const express = require("express");
const app = express();

//Carrega a rota para clientes
const cliente = require("./routes/cliente");
const pedido = require("./routes/pedido");
const cep = require("./routes/cep");
const produto = require("./routes/produto");
const tipo_produto = require("./routes/tipo_produto");
const connection = require("./models");


app.use(express.json());//Utiliza o modulo de conversão (do express) para Json //USAR ANTES DA ROTA!!   

app.use("/cliente", cliente);//Usa a rota cliente
app.use("/pedido", pedido);//Usa a rota pedido
app.use("/cep", cep);//Usa a rota cep
app.use("/produto", produto);
app.use("/tipo_produto", tipo_produto);

app.listen(3000,()=>{//Faz com que a aplicação fique aberta, na porta 3000
    console.log("Aplicação rodando na porta 3000!");//DEBUG - Saber que a aplicacao esta rodando e em qual porta
    const produto = {
        nome: "Arroz",
        preco: 20
    };

    console.log(produto);

    const {nome} = produto;

    console.log(nome);

    const produtos = [1,2,3,4,5];

    const [a, b] = produtos;
    console.log(b);
});

//app.use("/cliente")