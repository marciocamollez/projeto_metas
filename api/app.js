const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Metas');
const Meta = mongoose.model('Meta')

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors())
    next();
});

mongoose.connect('mongodb://localhost/db_metas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com o Banco de Dados realizado com sucesso!");
}).catch((err) => {
    console.log("Conexão com o Banco de Dados falhou!" + err);
});

app.get('/metas', async (req, res) => {

    await Meta.find({}).then((metas) => {
        return res.json({
            error: false,
            metas
        });
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum registro encontrado"
        });
    });

});

app.post('/metas', async (req, res) => {
    await Meta.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Meta não cadastrada com sucesso"
        });
    });


    return res.json({
        error: false,
        message: "Meta cadastrada com sucesso"
    })
});

app.listen(8080, () => {
    console.log("Servidor iniciado na pota 8080 http://localhost:8080");
});