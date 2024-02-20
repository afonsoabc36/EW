var http = require('http');

// or http.createServer(function(req, res){...});
http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type' : 'text/plain; charset=utf-8'}); // 200 em http é o código para OK
    res.end('Olá Mundo! Turma de EngWeb2024 TP2');
}).listen(2002);

console.log('Servidor à escuta na porta 2002');