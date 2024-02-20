var http = require('http');
var meta = require('./aux');

// or http.createServer(function(req, res){...});
http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'}); // 200 em http é o código para OK
    
    res.write("<h1>Uma página Web</h1>");
    res.write("<p>Página criada com node.js por " + meta.myName() + " em " + meta.myDateTime() + " na turma " + meta.turma  + "</p>");
    res.end();
}).listen(2003);

console.log('Servidor à escuta na porta 2003');