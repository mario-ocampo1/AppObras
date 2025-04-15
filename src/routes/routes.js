const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Ruta protegida
router.get('/secure', verifyToken, (req, res) => {
  res.json({ message: `Hola ${req.user.email}` });
});

// Ruta pública
router.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

module.exports = router;