
const express = require('express');
const router = express.Router();

const passport = require('passport');


const dashBoardController = require('../controllers/dashBoardController');

router.get('/admin',passport.checkAuthentication,dashBoardController.admin);
router.get('/employee',passport.checkAuthentication,dashBoardController.employee);

module.exports = router;