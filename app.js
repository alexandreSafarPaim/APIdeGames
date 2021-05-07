const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
require('./src/database');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})