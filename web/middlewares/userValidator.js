// Validator for user register/login forms

const {check} = require('express-validator');

const validator = [
    check('name')
    .notEmpty().withMessage("Falta datos por llenar").bail(),
    check('lastName')
    .notEmpty().withMessage("Falta datos por llenar").bail(),
    check('email')
    .notEmpty().withMessage('Falta datos por llenar').bail()
    .isEmail().withMessage('Ingrese e-mail valido'),
    check('password')
    .notEmpty().withMessage("Falta datos por llenar").bail()
    .isLength({min:8}).withMessage("La contraseña debe tener minimo 8 caracteres"),
    check('confirmPswd')
    .notEmpty().withMessage("Falta datos por llenar").bail()
    .isLength({min:6}).withMessage("La contraseña debe tener minimo 8 caracteres").bail()
    .custom(async (confirmPswd, {req}) => {
        const pswd = req.body.password;
        if(pswd !== confirmPswd){
            throw new Error('Las contraseñas deben coincidir');
        }
    })
    
]

module.exports = validator;