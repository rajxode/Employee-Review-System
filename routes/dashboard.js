
const express = require('express');
const router = express.Router();

const auth = require('../config/auth');

const dashBoardController = require('../controllers/dashBoardController');

router.get('/admin',auth,dashBoardController.admin);
router.get('/employee',auth,dashBoardController.employee);

module.exports = router;