const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            email TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error al crear la tabla:', err.message);
        } else {
            console.log('Tabla de usuarios inicializada correctamente.');
            insertDefaultUser();
        }
    });
}

function insertDefaultUser() {
    db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (err) {
            console.error('Error al verificar usuarios:', err.message);
        } else if (row.count === 0) {
            const defaultUsers = [
                ['María', 33, 'maria@gmail.com'],
                ['Juan', 28, 'juan@example.com'],
                ['Ana', 25, 'ana@example.com'],
                ['Carlos', 35, 'carlos@example.com'],
                ['Laura', 29, 'laura@example.com'],
                ['Pedro', 31, 'pedro@example.com'],
                ['Sofía', 27, 'sofia@example.com'],
                ['Diego', 26, 'diego@example.com'],
                ['Isabella', 24, 'isabella@example.com'],
                ['Andrés', 32, 'andres@example.com']
            ];

            let inserted = 0;
            defaultUsers.forEach((user, index) => {
                db.run(
                    'INSERT INTO users (name, age, email) VALUES (?, ?, ?)',
                    user,
                    (err) => {
                        if (err) {
                            console.error(`Error al insertar usuario ${user[0]}:`, err.message);
                        } else {
                            inserted++;
                            if (inserted === defaultUsers.length) {
                                console.log(`${inserted} usuarios por defecto insertados correctamente.`);
                            }
                        }
                    }
                );
            });
        }
    });
}

const dbOperations = {
    getAllUsers: (callback) => {
        db.all('SELECT * FROM users', callback);
    },

    getUserById: (id, callback) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], callback);
    },

    createUser: (user, callback) => {
        const { name, age, email } = user;
        db.run(
            'INSERT INTO users (name, age, email) VALUES (?, ?, ?)',
            [name, age, email],
            function(err) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, { id: this.lastID, ...user });
                }
            }
        );
    },

    updateUser: (id, user, callback) => {
        const { name, age, email } = user;
        db.run(
            'UPDATE users SET name = ?, age = ?, email = ? WHERE id = ?',
            [name, age, email, id],
            function(err) {
                if (err) {
                    callback(err, null);
                } else {
                    if (this.changes === 0) {
                        callback(new Error('Usuario no encontrado'), null);
                    } else {
                        callback(null, { id: parseInt(id), ...user });
                    }
                }
            }
        );
    },

    deleteUser: (id, callback) => {
        db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
            if (err) {
                callback(err, null);
            } else {
                if (this.changes === 0) {
                    callback(new Error('Usuario no encontrado'), null);
                } else {
                    callback(null, { message: 'Usuario eliminado correctamente' });
                }
            }
        });
    }
};

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la base de datos:', err.message);
        } else {
            console.log('Conexión a la base de datos cerrada.');
        }
        process.exit(0);
    });
});

module.exports = { db, dbOperations };

