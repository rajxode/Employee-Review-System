const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.get('/sign-up',homeController.signUp);
router.post('/create-session',homeController.createSession);
router.post('/create-account',homeController.createAccount);

module.exports = router;