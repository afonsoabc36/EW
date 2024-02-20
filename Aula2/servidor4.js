var http = require('http');
var url = require('url');
var axios = require('axios');

// or http.createServer(function(req, res){...});
http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'}); // 200 em http é o código para OK

    if(req.url === '/cidades'){
        axios.get("http://localhost:17002/cidades?_sort=nome")
        .then((resp) => {
            var data = resp.data;

            res.write("<ul>");
            for (i in data) {
                res.write("<li><a href='/cidades/" + data[i].id + "'>" + data[i].nome + "</a></li>");
            }
            res.write("</ul>");
            res.end();
        })
        .catch((error) => {
            console.log("Error: " + error);
            res.write("<p>" + error + "</p>");
        });
    } else if (req.url.match(/\/cidades\/c\d+/)){// \d+ ou [0-9]+
        let cidadeId = req.url.substring(9);
        axios.get("http://localhost:17002/cidades/" + cidadeId)
        .then((resp) => {
            var data = resp.data;

            res.write("<h1>" + data.nome + "</h1>");
            res.write("<h3>" + data.distrito + "</h3>");
            res.write("<p><b>População: </b>" + data["população"] + "</p>");
            res.write("<br>");
            res.write("<p><b>Descrição: </b>" + data["descrição"] + "</p>");
            res.write("<h6><a href='/cidades'>Voltar</a></h6>");
            res.end();
        })
        .catch((error) => {
            console.log("Error: " + error);
            res.write("<p>" + error + "</p>");
        });
    }else { 
        res.write("Operação não suportada");
        res.end();
    }
}).listen(2010);

console.log('Servidor à escuta na porta 2010');