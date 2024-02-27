var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((req,res) => {
    var regex = /^\/[123]$/
    var q = url.parse(req.url, true);
    fs.readFile('pag' + q.pathname.substring(1) +'.html', (erro,dados) => {
        if (!erro) {
            res.writeHead(200, {'Content-Type': 'text/html, charset = utf8'});
            res.write(dados);
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/html, charset = utf8'});
            res.write("<pre>" + erro + "</pre>");
            res.end();
        }
    });
}).listen(7777);