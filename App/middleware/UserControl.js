
function VarificaAcesso(req, res, next){
  if(req.session.id_u){
    next();
  }else{
    res.redirect("/");
  }
}

function limparSessao(req, res, next) {
    req.session.destroy();
    next()
}


module.exports ={
  limparSessao
}