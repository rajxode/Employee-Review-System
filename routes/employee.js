
const express = require('express');
const router = express.Router();

const passport = require('passport');


const employeeController = require('../controllers/employeeController');

router.get('/',passport.checkAuthentication,employeeController.employee);
router.post('/addReview',passport.checkAuthentication,employeeController.addReview);

module.exports = router;