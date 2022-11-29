const jwt = require("jsonwebtoken");
const { palavraChave } = require("../config/token.json");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.send(401).send({ mensagem: "Token não foi informado" });
  }
console.log(token, palavraChave);
  jwt.verify(token, palavraChave, (error, decoded) => {
    if (error) {
      return res.status(401).send({ mensagem: "Token inválido" });
    }

    req.clienteId = decoded.id

    next();
  });
};

module.exports = verifyToken;