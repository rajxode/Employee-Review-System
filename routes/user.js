const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.home);
router.get('/sign-up',userController.signUp);

router.get('/signout',userController.signout);
router.post('/create-session',userController.createSession);
router.post('/create-account',userController.createAccount);

module.exports = router;