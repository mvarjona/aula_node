module.exports = class UsuarioDao{  //cria um modulo para exportação
       constructor(conexao){  // construtor que recebe como parametro a conexão com o banco de dados
        this.conexao = conexao; //atribui a variavel, local, conexao o parametro conexao
       }
  /*
     Cria uma função para inserir um novo usuario no banco de dados, passando como parametro um usuário
     e retornando um objeto com o resultado da operação
  */
SetUsuario(usuario){
    console.log(usuario.passwd);
    return new Promise((resolve, reject) => {
        this.conexao.query("INSERT INTO Usuarios(nome, Email, rua, numero, cidade, estado, senha, DataNascimento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [usuario.nome, usuario.email, usuario.rua, usuario.numero, usuario.cidade, usuario.estado, usuario.passwd, usuario.DataNascimento],
        function (error, elements) {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
/*
    Função que retorna todos os usuários cadastrados no banco de dados
*/
  GetUsuario(){
    return new Promise((resolve, reject) => {
        this.conexao.query("SELECT * FROM Usuarios",
        function (error, elements) {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });

  }

  GetAutenticUsuario(nome){
    return new Promise((resolve, reject) => {
        this.conexao.query("SELECT * FROM Usuarios WHERE nome = ?",
         nome,
        function (error, elements) {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
    
  }

  GetUsuario(nome){
    return new Promise((resolve, reject) => {
        this.conexao.query("SELECT * FROM Usuarios WHERE nome Like '%?%' ?",
         nome,
        function (error, elements) {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });

  }

  DeleteUsuario(nome){
    return new Promise((resolve, reject) => {
        this.conexao.query("Delete FROM Usuarios WHERE nome = ?",
         nome,
        function (error, elements) {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });

  }

  GetAutenticUsuario(nome, senha){
    return new Promise((resolve, reject) => {
        this.conexao.query("SELECT * FROM Usuarios WHERE nome = ? AND senha = ?",
         [nome, senha],
        function (error, elements) {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });

  }
  
}