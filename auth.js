const authorizedUsers = {
    'admin': 'password123',
    'user1': 'secret123'
};

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ 
            error: 'No se proporcionó credenciales de autenticación' 
        });
    }

    const base64Credentials = authHeader.split(' ')[1];
    
    if (!base64Credentials) {
        return res.status(401).json({ 
            error: 'Formato de autenticación inválido' 
        });
    }

    try {
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');

        if (!username || !password) {
            return res.status(401).json({ 
                error: 'Credenciales inválidas' 
            });
        }
        
        if (authorizedUsers[username] && authorizedUsers[username] === password) {
            req.user = username;
            next();
        } else {
            return res.status(401).json({ 
                error: 'Credenciales inválidas' 
            });
        }
    } catch (error) {
        return res.status(401).json({ 
            error: 'Error al procesar las credenciales' 
        });
    }
}

module.exports = { authenticate };

