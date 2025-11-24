# Backend en Express con JavaScript - Guía 10


## Características

- API REST completa con métodos GET, POST, PUT, DELETE
- Base de datos SQLite para persistencia de datos
- Validación de datos para POST y PUT
- Autenticación básica (Basic Auth) para operaciones de escritura
- Endpoint personalizado `/hello/:name`
- Estructura de código organizada con separación de responsabilidades

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

## Ejecución

Para iniciar el servidor:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
.
├── index.js              # Archivo principal del servidor
├── database.js           # Configuración y operaciones de SQLite
├── auth.js               # Middleware de autenticación
├── validators.js         # Validadores de datos
├── routes/
│   ├── users.js         # Rutas para usuarios
│   └── hello.js         # Rutas para mensajes personalizados
├── package.json
└── README.md
```

## Endpoints Disponibles

### Usuarios

- **GET /users** - Obtener todos los usuarios
- **GET /user** - Obtener un usuario (compatibilidad con la guía)
- **GET /users/:id** - Obtener un usuario por ID
- **POST /users** - Crear un nuevo usuario (requiere autenticación)
- **POST /user** - Crear usuario (compatibilidad, requiere autenticación)
- **PUT /users/:id** - Actualizar un usuario (requiere autenticación)
- **PUT /user** - Actualizar usuario (compatibilidad, requiere autenticación)
- **DELETE /users/:id** - Eliminar un usuario (requiere autenticación)
- **DELETE /user/:id** - Eliminar usuario (compatibilidad, requiere autenticación)

### Mensajes

- **GET /hello/:name** - Mensaje personalizado (ej: `/hello/John` → "¡Hola, John!")
- **GET /hello** - Mensaje genérico

## Autenticación

Para realizar operaciones POST, PUT y DELETE, se requiere autenticación Basic Auth.

**Credenciales disponibles:**
- Usuario: `admin` / Contraseña: `password123`
- Usuario: `user1` / Contraseña: `secret123`

### Configuración en Postman

1. Selecciona el método HTTP (POST, PUT o DELETE)
2. Ve a la pestaña "Authorization"
3. Selecciona "Basic Auth"
4. Ingresa el usuario y contraseña

### Importar Colección de Postman

Para facilitar las pruebas de la API, puedes importar la colección de Postman incluida en el proyecto:

1. Abre Postman
2. Haz clic en "Import" 
3. Selecciona el archivo `GUIA-10-SEBASTIAN-SANCHEZ-POSTMAN.postman_collection.json`
4. La colección se importará con todas las peticiones preconfiguradas, incluyendo:
   - Obtener todos los usuarios
   - Obtener un usuario
   - Obtener usuario por ID
   - Mensaje personalizado
   - Crear un nuevo usuario (con autenticación configurada)
   - Actualizar un usuario (con autenticación configurada)
   - Eliminar un usuario (con autenticación configurada)

Todas las peticiones que requieren autenticación ya tienen configuradas las credenciales de Basic Auth.

## Notas

- La base de datos SQLite se crea automáticamente en el directorio raíz del proyecto
- El archivo de base de datos (`database.sqlite`) está en `.gitignore` para no versionarlo
- Los usuarios autenticados pueden realizar todas las operaciones CRUD
- Los usuarios no autenticados solo pueden leer (GET)

