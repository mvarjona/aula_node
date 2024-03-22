const express = require("express");
const router = express.Router();
const PATH = require("path");
const { render } = require("ejs"); //importa a biblioteca ejs
const UsuarioModel = require("../Model/Usuario");
const UsuarioDao = require('../Data/UsuarioDao'); 
const factory = require('../../factory_conect');  //Importa o objeto para conexão
const conexao = factory();

const usuarioDao = new UsuarioDao(conexao);

router.get("/", (req, res) => {
  res.render("Pages/home");
});

router.get("/home", (req, res) => {
  res.render("Pages/home");
});

router.get("/Cadastro", (req, res) => {
  res.render("Pages/CadastroUsuario");
});

router.post("/Cadastro", function (req, res) {
  const dataNacimento = req.body.dataNasc;
  if(UsuarioModel.VerificaIdade(dataNacimento)){

    const usuario = {
        nome:req.body.nome,
        rua: req.body.rua,
        numero: parseInt(req.body.numero),
        cidade: req.body.cidade,
        estado: req.body.estado,
        DataNascimento: dataNacimento
    }
    usuarioDao.SetUsuario(usuario);
    return res.json(usuario);
  }else{
    return res.json('');
  }
});

module.exports = router;