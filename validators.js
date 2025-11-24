
function validateUser(user) {
    const errors = [];

    if (!user.name || typeof user.name !== 'string' || user.name.trim().length === 0) {
        errors.push('El nombre es requerido y debe ser una cadena de texto válida');
    }

    if (user.age === undefined || user.age === null) {
        errors.push('La edad es requerida');
    } else {
        const age = parseInt(user.age);
        if (isNaN(age) || age < 0 || age > 150) {
            errors.push('La edad debe ser un número válido entre 0 y 150');
        }
    }

    if (!user.email || typeof user.email !== 'string') {
        errors.push('El email es requerido y debe ser una cadena de texto válida');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email.trim())) {
            errors.push('El email debe tener un formato válido (ejemplo: usuario@dominio.com)');
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function validateUserData(req, res, next) {
    const validation = validateUser(req.body);

    if (!validation.isValid) {
        return res.status(400).json({
            error: 'Datos de validación inválidos',
            details: validation.errors
        });
    }
    
    req.body.name = req.body.name.trim();
    req.body.age = parseInt(req.body.age);
    req.body.email = req.body.email.trim().toLowerCase();

    next();
}

module.exports = { validateUser, validateUserData };

