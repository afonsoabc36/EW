var http = require('http');
var url = require('url');
var meta = require('./aux');

// or http.createServer(function(req, res){...});
http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'}); // 200 em http é o código para OK

    var q = url.parse(req.url, true);
    
    // add?n1=X&n2=Y -> X+Y
    if(q.pathname === "/add"){
        var n1 = parseInt(q.query.n1, 10);
        var n2 = parseInt(q.query.n2, 10);
        soma = n1 + n2;
        res.write("<pre>" + n1 + "+" + n2 + "=" + soma + "</pre>");
    } else if(q.pathname === "/sub"){ // add?n1=X&n2=Y -> X+Y
        var n1 = parseInt(q.query.n1, 10);
        var n2 = parseInt(q.query.n2, 10);
        dif = n1 - n2;
        res.write("<pre>" + n1 + "-" + n2 + "=" + dif + "</pre>");
    } else {
        res.write("Operação não suportada");
    }

    res.end();
}).listen(2005);

console.log('Servidor à escuta na porta 2005');