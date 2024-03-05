// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if (req.url == '/' || req.url == '/alunos'){
                    axios.get("http://localhost:3000/alunos?_sort=nome")
                    .then(resp => {
                        alunos = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write(templates.studentsListPage(alunos, d));
                        res.end();
                    })
                    .catch(erro => {
                        res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter a lista de alunos: " + erro + "</p>");
                        res.end();
                    });
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/(A|PG)[0-9]+$/i)) {
                    idAluno = req.url.split('/')[2]
                    axios.get("http://localhost:3000/alunos/" + idAluno)
                    .then(resp => {
                        aluno = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write(templates.studentPage(aluno, d));
                        res.end();
                    })
                    .catch(erro => {
                        res.writeHead(504, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter a informação do aluno " + idAluno + "::" + erro + "</p>");
                        res.end();
                    });
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/registo/)) {
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                    res.write(templates.studentFormPage(d));
                    res.end();
                }
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/(A|PG)[0-9]+$/i)) {
                    idAluno = req.url.split('/')[3]
                    axios.get("http://localhost:3000/alunos/" + idAluno)
                    .then(resp => {
                        aluno = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write(templates.studentFormEditPage(aluno, d));
                        res.end();
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter a informação do aluno " + idAluno + "::" + erro + "</p>");
                        res.end();
                    });
                }
                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/delete\/(A|PG)[0-9]+$/i)) {
                    idAluno = req.url.split('/')[3]
                    axios.delete("http://localhost:3000/alunos/" + idAluno)
                    .then(resp => {
                        res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Registo apagado</p>");
                        res.end();
                    })
                    .catch(erro => {
                        res.writeHead(510, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível eliminar o aluno " + idAluno + "::" + erro + "</p>");
                        res.end();
                    });
                }
                // GET ? -> Lancar um erro
                else {
                    res.writeHead(502, {'Content-Type' : 'text/html; charset=utf-8'});
                    res.write("<p>GET request não suportado:" + req.url + " </p>");
                    res.end();
                }
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if (req.url == '/alunos/registo'){
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/alunos", result)
                            .then( resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write("<p>Registo criado: " + JSON.stringify(resp.data) + "</p>");
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(508, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write(templates.errorPage("Não foi possível criar novo registo....",d));
                                res.end();
                            });
                        } else {
                            res.writeHead(506, {'Content-Type' : 'text/html; charset=utf-8'});
                            res.write("<p>Não foi possível obter os dados do body</p>");
                            res.end();
                        }
                    });
                }
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/(A|PG)[0-9]+$/i)) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/alunos/" + result.id, result)
                            .then( resp => {
                                res.writeHead(303, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write("<p>Registo alterado: " + JSON.stringify(resp.data) + "</p>");
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(507, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write(templates.errorPage("Não foi possível editar....",d));
                                res.end();
                            });
                        } else {
                            res.writeHead(509, {'Content-Type' : 'text/html; charset=utf-8'});
                            res.write("<p>Não foi possível obter os dados do body</p>");
                            res.end();
                        }
                    });
                }
                // POST ? -> Lancar um erro
                else {
                    res.writeHead(501, {'Content-Type' : 'text/html; charset=utf-8'});
                    res.write("<p>POST request não suportado:" + req.url + " </p>");
                    res.end();
                }
                break
                
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'});
                res.write("<p>Método não suportado:" + req.method + " </p>");
                res.end();
                break
        }
    }
})

alunosServer.listen(3050, () => {
    console.log("Servidor à  escuta na porta 3050...")
});


