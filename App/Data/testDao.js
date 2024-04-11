module.exports = class TestDao{  //cria um modulo para exportação
       constructor(conexao){  // construtor que recebe como parametro a conexão com o banco de dados
        this.conexao = conexao; //atribui a variavel, local, conexao o parametro conexao
       }
  
  TestConexao(conexao){
    return new Promise((resolve, reject) =>{
      this.conexao.query("SELECT * FROM Usuarios",
      function (error, elements) {
        if (error) {
          return reject(false);
        }
        return resolve(true);
      })
    })
  }
}