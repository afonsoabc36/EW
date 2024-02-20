// Data
exports.myDateTime = () => {
    var d = new Date().toISOString().substring(0,16);
    return d;
}

// Nome
exports.myName = () => {
    return "Afonso Silva";
}

// Turma
exports.turma = "EngWeb2024::TP2";