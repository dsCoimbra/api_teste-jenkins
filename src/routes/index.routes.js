const express = require('express');
const app = express.Router()

//Importacao rota
const Pessoa = require('./pessoa.routes.js');


//Inicializacao rota
new Pessoa(app).init();

app.route('/api')
    .get((req, res) => {
        return res.status(200).send('Teste funcionando')
    })

module.exports = app