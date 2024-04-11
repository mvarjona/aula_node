const express = require("express");
var session = require("express-session");
const router = express.Router();
const PATH = require("path");
const { render } = require("ejs"); //importa a biblioteca ejs
const UsuarioModel = require("../Model/Usuario");
const UsuarioDao = require("../Data/UsuarioDao");
const TestDao = require("../Data/testDao");
const factory = require("../../factory_conect"); //Importa o objeto para conexão
const conexao = factory();

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(12);

const usuarioDao = new UsuarioDao(conexao);
const testDao = new TestDao(conexao);

//Requisições Get
router.get("/Cadastro", (req, res) => {
  res.render("Pages/CadastroUsuario");
});

router.get("/login", (req, res) => {
  res.render("Pages/Login");
});

router.get("/", (req, res) => {
  res.render("Pages/home");
});

router.get("/home", (req, res) => {
  res.render("Pages/home");
});

router.get("/t", (req, res) =>{
  const t = testDao.TestConexao(conexao);
  console.log(t);
  res.render("Pages/t");
});


//Requisições Post
//função de login, ao clicar no botão de login, ele vai verificar se o usuário existe no banco de dados, e cria uma sessão para guardar o nome e o id
router.post("/Login", (req, res) => {
  user = req.body.user;
  ps = req.body.passwd;
  usuario = usuarioDao.GetAutenticUsuario(user, ps)
  if(usuario){
    req.session.id_u = user.id;
    req.session.nome = user.nome;
  }else{
    res.render("/home", {erro:"erro"});
  }
  res.render("/home", {usuario});
});


router.post("/Cadastro", async function (req, res) {
  if(!UsuarioModel.VerificaEmail(req.body.email)){
    return res.json("");
  }
  console.log(req.body.psw)
  var psw = bcrypt.hashSync(req.body.psw, salt);
  console.log(psw);
  const dataNacimento = req.body.dataNasc;
  if (UsuarioModel.VerificaIdade(dataNacimento)) {
    const usuario = {
      nome: req.body.nome,
      email: req.body.email,
      rua: req.body.rua,
      numero: parseInt(req.body.numero),
      cidade: req.body.cidade,
      estado: req.body.estado,
      passwd: psw,
      DataNascimento: dataNacimento,
    };
    await usuarioDao.SetUsuario(usuario);
    return res.json(usuario);
  } else {
    return res.json("");
  }
});
router.post("/Login", (req, res) =>{
   user = req.body.user;
   senha = cryp.hash(req.body.passwd, salt)
   usuario = usuarioDao.GetAutenticUsuario(user, senha);
   if(usuario != null){
     console.log('testes passou' + usuario)
     res.render("Pages/home", {usuario});
   }else{
     console.log("testes não passou")
     res.render("Pages/Login", {"erro":"usuario ou senha incorretos"});
   }
})

module.exports = router;
