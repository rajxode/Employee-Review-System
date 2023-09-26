
const express = require('express');
const router = express.Router();

const passport = require('passport');


const employeeController = require('../controllers/employeeController');

router.get('/',passport.checkAuthentication,employeeController.employee);

module.exports = router;