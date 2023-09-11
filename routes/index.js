const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.get('/sign-up',homeController.signUp);

module.exports = router;