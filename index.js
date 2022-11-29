//Metodo de inicalizacao EXPRESS de acordo com a documentacao
const express = require("express");
const app = express();

//Carrega as rotas criadas
const connection = require("./models");
const cliente = require("./routes/cliente");
const pedido = require("./routes/pedido");
const cep = require("./routes/cep");
const produto = require("./routes/produto");
const tipo_produto = require("./routes/tipo_produto");
const login = require("./routes/login");
const verifyToken = require("./middlewares/auth");

app.use(express.json());//Utiliza o modulo de conversão (do express) para Json //USAR ANTES DA ROTA!!   
app.use("/login", login);
app.use("/cep", cep);//Usa a rota cep
app.use("/cliente", cliente);//Usa a rota cliente
app.use(verifyToken);//Protege todas as requisicoes abaixo dele 
app.use("/produto", produto);
app.use("/pedido", pedido);//Usa a rota pedido
app.use("/tipo_produto", tipo_produto);



app.listen(3001,()=>{//Faz com que a aplicação fique aberta, na porta 3000
    console.log("Aplicação rodando na porta 3000!");//DEBUG - Saber que a aplicacao esta rodando e em qual porta
});

//app.use("/cliente")