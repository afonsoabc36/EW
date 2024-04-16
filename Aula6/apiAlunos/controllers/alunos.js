var mongoose = require('mongoose');
const { modelName } = require('../models/alunos');
var Aluno = require('../models/alunos');

module.exports.get = (idAluno) => {
    return Aluno
        .findById(idAluno)
        .exec();
}

module.exports.getTPCDone = (idAluno) => {
    return Aluno
        .findOne({_id : idAluno}, {_id : 0, nome : 0, gitlink : 0, teste: 0})
        .select('tpc1 tpc2 tpc3 tpc4 tpc5 tpc6 tpc7 tpc8')
        .exec();
}

module.exports.list = () => {
    return Aluno
        .find()
        .sort({nome : 1})
        .exec();
}

module.exports.listAllWithTPC = (idTPC) => {
    tpc = `tpc${idTPC}`;
    filtro = {}; // criar filtro porque ele não lê variaveis dentro do find
    filtro[tpc] = true;
    return Aluno
        .find(filtro) // {tpcx : true}
        .sort({nome : 1})
        .exec();
}

module.exports.insert = (aluno) => {
    var newAluno = new Aluno(aluno);

    return newAluno.save();
}

module.exports.update = (id, aluno) => {
    return Aluno
        .findByIdAndUpdate(id, aluno, {new : true})
        .exec();
}

module.exports.updateTPCValue = (idAluno, nTPC) => {
    return this.get(idAluno)
        .then( aluno => {
            var idTPC = `tpc${nTPC}`;
            tpcValue = aluno[idTPC];
            if (tpcValue === undefined) {
                aluno[idTPC] = true;
            } else {
                aluno[idTPC] = !tpcValue;
            }
            return Aluno
                .findByIdAndUpdate(idAluno, aluno, {new : true})
                .exec();
        });
}

module.exports.delete = (id) => {
    return Aluno
        .findByIdAndDelete(id)
        .exec();

    /*
    Aluno
        .find({_id: id})
        .deleteOne()
        .exec();
    */
}