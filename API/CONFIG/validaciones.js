const Joi = require('joi');

exports.validateFC = (data) => {
    const schema = Joi.object({
        nombreCliente: Joi.string().min(3).required().messages({
            'string.min': 'El nombre debe de tener minimo 3 caracteres',
            'any.required': 'El nombre es requerido'
        }),
        numero_celular: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'El número de celular debe contener solo dígitos',
            'string.max': 'El número de celular debe tener máximo 10 caracteres',
            'any.required': 'El número de celular es requerido'
        }),
        correo: Joi.string().email().required().messages({
            'string.email': 'El correo no es válido',
            'any.required': 'El correo es requerido'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'La contraseña debe tener mínimo 6 caracteres',
            'any.required': 'La contraseña es requerida'
        }),
        direccion: Joi.string().optional()
    });
    return schema.validate(data);
};

exports.validateFP = (data) => {
    const schema = Joi.object({
        nombrePreventista: Joi.string().min(3).required().messages({
            'string.min': 'El nombre debe tener mínimo 3 caracteres',
            'any.required': 'El nombre es requerido'
        }),
        correo: Joi.string().email().required().messages({
            'string.email': 'El correo no es válido',
            'any.required': 'El correo es requerido'
        }),
        numero_celular: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'El número de celular debe contener solo dígitos',
            'string.max': 'El número de celular debe tener máximo 10 caracteres',
            'any.required': 'El número de celular es requerido'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'La contraseña debe tener mínimo 6 caracteres',
            'any.required': 'La contraseña es requerida'
        })
    });
    return schema.validate(data);
};

exports.validateFS = (data) => {
    const schema = Joi.object({
        nombreSucursal: Joi.string().min(3).required().messages({
            'string.min': 'El nombre debe tener mínimo 3 caracteres',
            'any.required': 'El nombre es requerido'
        }),
        correo: Joi.string().email().required().messages({
            'string.email': 'El correo no es válido',
            'any.required': 'El correo es requerido'
        }),
        numero_celular: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'El número de celular debe contener solo dígitos',
            'string.max': 'El número de celular debe tener máximo 10 caracteres',
            'any.required': 'El número de celular es requerido'
        }),
        direccionSucursal: Joi.string().optional()
    });
    return schema.validate(data);
};