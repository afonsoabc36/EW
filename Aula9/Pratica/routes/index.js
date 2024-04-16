var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var fs = require('fs');
var multer = require('multer');
const { formToJSON } = require('axios');

var upload = multer({dest: 'uploads/'})

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0,19);

  jsonfile.readFile(__dirname + '/../data/dbFiles.json', (err, fileList) => {
    if (err) {
      res.render('error', {error: err});
    } else {
      res.render('index', { files: fileList , d : date });
    }
  });

});

router.post('/files', upload.single('myFile'), (req, res, next) => {
  console.log('cdir: '  + __dirname);
  let oldPath = __dirname + "/../" + req.file.path;
  console.log('oldPath: ' + oldPath);
  let newPath = __dirname + "/../public/fileStore/" + req.file.originalname;
  console.log('newPath: ' + newPath);

  fs.rename(oldPath, newPath, error => {
    if (error) throw error;
  })

  var date = new Date().toISOString().substring(0,19);
  var files = jsonfile.readFileSync(__dirname + "/../data/dbFiles.json")

  files.push({
    date: date,
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  })

  jsonfile.writeFileSync(__dirname + "/../data/dbFiles.json", files)

  res.redirect('/')
})

router.get('/fileContents/:fname', (req, res) => {
  console.log(__dirname + "/../public/fileStore/" + req.params.fname)
  var contents = fs.readFileSync(__dirname + "/../public/fileStore/" + req.params.fname);
  res.send(contents)
})

router.get('/download/:fname', (req, res) => {
  res.download(__dirname + "/../public/fileStore/" + req.params.fname);
})


module.exports = router;
