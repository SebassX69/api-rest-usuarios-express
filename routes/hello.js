const express = require('express');
const router = express.Router();


router.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.json({ message: `¡Hola, ${name}!` });
});


router.get('/hello', (req, res) => {
    res.json({ message: '¡Hola, mundo!' });
});

module.exports = router;

