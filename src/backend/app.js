const express = require('express');
const cors = require('cors');
const verifyToken = require('./middleware/verifyToken');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes); // Tus rutas ahora responden en /api/*



module.exports = app;