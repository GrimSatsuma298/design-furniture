const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userValidator = require('../middlewares/userValidator');
const isUserLogged = require('../middlewares/isLoggedMiddleware');

// Login form
router.get('/login', isUserLogged, userController.login);
router.post('/login', userValidator,userController.sendLogin);

// Register form
router.get('/register', isUserLogged, userController.register);
router.post('/register', userValidator, userController.sendRegister) // Send register form

// Logout
router.get('/logout', userController.logout);



module.exports = router;