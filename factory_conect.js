const mysql = require('mysql2');
require('dotenv').config();

//função que cria um objeto do tipo conexão;

module.exports = function(){
    return mysql.createConnection({
        host: 'aula-node.mysql.uhserver.com',
        user: 'itb',
        password: 'NodeJS@12node',
        database: 'aula_node',
        port: process.env.PORTDB
    })
}