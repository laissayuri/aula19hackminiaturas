const express = require('express');
const bodyParser = require('body-parser');
const expressMongoDb = require("express-mongo-db");
const ObjectID = require('mongodb').ObjectID;


const app = express();
app.set("view engine", "ejs");
app.use("/assets", express.static("static"));
app.use(bodyParser.urlencoded());
app.use(expressMongoDb("mongodb://localhost/miniaturas"));

app.get("", (req, res) =>{ //request e response
    res.render("index"); // se for colocar com o html direto: res.send(`codigo do html`);
});

app.get("/contato", (req, res) =>{ //request e response
    res.render("contato"); // se for colocar com o html direto: res.send(`codigo do html`);
});

app.get('/produtos', (req, res) => {
    req.db.collection('produtos').find().toArray((erro, dados) => {
        res.render('produtos', {'produtos': dados});
    });
});

app.get("/admin", (req, res) => {
    res.render("admin");
});

app.get('/admin/produtos', (req, res) => {
    req.db.collection('produtos').find().toArray((erro, dados) => {
        res.render('admin-produtos', {'produtos': dados});
    });
});

app.get('/admin/produtos/inserir', (req, res) => {
    res.render('cadastro', {'mensagem': ''});
});

app.post('/admin/produtos/inserir', (req, res) => {
    req.db.collection('produtos').insert(req.body, (erro) => {
        console.log(erro);
        res.render('cadastro', {'mensagem': 'O produto foi inserido com sucesso.'});
    });
});

app.post('/admin/produtos/:id', (req, res) => {
    let id = ObjectID(req.params.id);

    req.db.collection('produtos').remove({_id: id}, (erro) => {
        console.log(erro);
        res.redirect('/admin/produtos');
    });
});

app.listen(3000, () => { // 3000 é porta para acessar o meu computador, que virou um servidor (ip:3000) (se eu for acessar o meu pc, localhost:3000)
    console.log("Servidor Inicializado");
});