var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET users listing. */
router.get('/', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/alunos?_sort=nome")
    .then(resp => {
      var alunos = resp.data
      res.status(200).render("studentsListPage", { "lAlunos": alunos, "date": d })
    })
    .catch(erro => {
      res.status(501).render("error", { "error": erro })
    })
});

router.get('/registo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.status(200).render("studentFormPage", {"date": d})
});

router.post('/registo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var result = req.body
  axios.post("http://localhost:3000/alunos", result)
  .then(resp => {
    res.status(201).redirect('/')
  })
  .catch(erro => {
    res.status(502).render("error", { "error": erro })

  })
});

router.get('/:idAluno', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/alunos/" + req.params.idAluno)
    .then(resp => {
      var aluno = resp.data
      res.status(200).render("studentPage", { "aluno": aluno, "date": d })
    })
    .catch(erro => {
      res.status(503).render("error", { "error": erro })
    })
});

router.get('/edit/:idAluno', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/alunos/" + req.params.idAluno)
    .then(resp => {
      var aluno = resp.data
      res.status(200).render("studentFormEditPage", { "aluno": aluno, "date": d })
    })
    .catch(erro => {
      res.status(504).render("error", { "error": erro })
    })
});

router.post('/edit/:idAluno', function (req, res, next) {
  var aluno = req.body
  axios.put("http://localhost:3000/alunos/" + req.params.idAluno, aluno)
    .then(resp => {
      res.status(201).redirect('/')
    })
    .catch(erro => {
      res.status(506).render("error", { "error": erro })
    })
});

router.get('/delete/:idAluno', function (req, res, next) {
  axios.delete("http://localhost:3000/alunos/" + req.params.idAluno)
    .then(resp => {
      res.redirect('/')
    })
    .catch(erro => {
      res.status(505).render("error", { "error": erro })
    })
});


module.exports = router;
