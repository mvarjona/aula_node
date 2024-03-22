module.exports = class UsuarioDao{
       constructor(conexao){
        this.conexao = conexao;
       }
  
SetUsuario(usuario){
    return new Promise((resolve, reject) => {
        this.conexao.query("INSERT INTO Usuarios(nome, rua, numero, cidade, estado, DataNascimento) VALUES (?, ?, ?, ?, ?, ?)",
        [usuario.nome, usuario.rua, usuario.numero, usuario.cidade, usuario.estado, usuario.DataNascimento],
        function (error, elements) {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
}
}