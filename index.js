const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const helloRoutes = require('./routes/hello');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', usersRoutes);
app.use('/', helloRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: 'API REST con Express y SQLite',
        endpoints: {
            'GET /users': 'Obtener todos los usuarios',
            'GET /user': 'Obtener un usuario (compatibilidad)',
            'GET /users/:id': 'Obtener un usuario por ID',
            'GET /hello/:name': 'Mensaje personalizado',
            'POST /users': 'Crear un nuevo usuario (requiere autenticación)',
            'POST /user': 'Crear usuario (compatibilidad, requiere autenticación)',
            'PUT /users/:id': 'Actualizar un usuario (requiere autenticación)',
            'PUT /user': 'Actualizar usuario (compatibilidad, requiere autenticación)',
            'DELETE /users/:id': 'Eliminar un usuario (requiere autenticación)',
            'DELETE /user/:id': 'Eliminar usuario (compatibilidad, requiere autenticación)'
        },
        authentication: {
            method: 'Basic Auth',
            username: 'admin',
            password: 'password123',
            note: 'Usa Basic Authentication en Postman para POST, PUT y DELETE'
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
    console.log(`Accede a http://localhost:${PORT} para ver la información de la API`);
});

