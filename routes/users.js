const express = require('express');
const router = express.Router();
const { dbOperations } = require('../database');
const { validateUserData } = require('../validators');
const { authenticate } = require('../auth');


router.get('/users', (req, res) => {
    dbOperations.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios', details: err.message });
        }
        res.json(users);
    });
});


router.get('/user', (req, res) => {
    dbOperations.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios', details: err.message });
        }
        // Retornar el primer usuario para mantener compatibilidad con la guía
        if (users && users.length > 0) {
            res.json(users[0]);
        } else {
            res.status(404).json({ error: 'No se encontraron usuarios' });
        }
    });
});

router.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    dbOperations.getUserById(id, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuario', details: err.message });
        }
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    });
});

router.post('/users', authenticate, validateUserData, (req, res) => {
    dbOperations.createUser(req.body, (err, user) => {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'El email ya está registrado' });
            }
            return res.status(500).json({ error: 'Error al crear usuario', details: err.message });
        }
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: user
        });
    });
});

router.post('/user', authenticate, validateUserData, (req, res) => {
    dbOperations.createUser(req.body, (err, user) => {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'El email ya está registrado' });
            }
            return res.status(500).json({ error: 'Error al crear usuario', details: err.message });
        }
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: user
        });
    });
});

router.put('/users/:id', authenticate, validateUserData, (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    dbOperations.updateUser(id, req.body, (err, user) => {
        if (err) {
            if (err.message === 'Usuario no encontrado') {
                return res.status(404).json({ error: err.message });
            }
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'El email ya está registrado' });
            }
            return res.status(500).json({ error: 'Error al actualizar usuario', details: err.message });
        }
        res.json({
            message: 'Usuario actualizado exitosamente',
            user: user
        });
    });
});

router.put('/user', authenticate, validateUserData, (req, res) => {
    const id = req.body.id || 1;

    dbOperations.updateUser(id, req.body, (err, user) => {
        if (err) {
            if (err.message === 'Usuario no encontrado') {
                return res.status(404).json({ error: err.message });
            }
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'El email ya está registrado' });
            }
            return res.status(500).json({ error: 'Error al actualizar usuario', details: err.message });
        }
        res.json({
            message: 'Usuario actualizado exitosamente',
            user: user
        });
    });
});

router.delete('/users/:id', authenticate, (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    dbOperations.deleteUser(id, (err, result) => {
        if (err) {
            if (err.message === 'Usuario no encontrado') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Error al eliminar usuario', details: err.message });
        }
        res.json({
            message: 'Usuario eliminado exitosamente',
            id: id
        });
    });
});

router.delete('/user/:id', authenticate, (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    dbOperations.deleteUser(id, (err, result) => {
        if (err) {
            if (err.message === 'Usuario no encontrado') {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Error al eliminar usuario', details: err.message });
        }
        res.json({
            message: 'Usuario eliminado exitosamente',
            id: id
        });
    });
});

module.exports = router;

