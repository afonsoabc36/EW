var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/alunos');

/* GET users listing. */
// /alunos
// /alunos?tpc=2
router.get('/', function(req, res, next) {
  if (req.query.tpc) {
    Aluno.listAllWithTPC(req.query.tpc)
      .then(data => {
        res.jsonp(data);
      })
      .catch(err => {
        res.status(504).jsonp(err);
      });
  } else {
    Aluno.list()
      .then(data => {
        res.jsonp(data);
      })
      .catch(err => {
        res.status(500).jsonp(err);
      });
  }
});

// /alunos/idAluno
router.get('/:id', function(req, res, next) {  
  Aluno.get(req.params.id)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(505).jsonp(err);
    });
});

// /alunos/idAluno/tpc
router.get('/:id/tpc', function(req, res, next) {  
  Aluno.getTPCDone(req.params.id)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(507).jsonp(err);
    });
});


/* POST users listing. */
router.post('/', function(req, res, next) {
  Aluno.insert(req.body)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(501).jsonp(err);
    });
});

/* PUT users listing. */
router.put('/:id', function(req, res, next) {
  Aluno.update(req.params.id, req.body)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(502).jsonp(err);
    });
});

/* PUT users listing. */
router.put('/:id/tpc/:idTPC', function(req, res, next) {
  Aluno.updateTPCValue(req.params.id, req.params.idTPC)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(506).jsonp(err);
    });
});

/* DELETE users listing. */
router.delete('/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(503).jsonp(err);
    });
});

module.exports = router;
