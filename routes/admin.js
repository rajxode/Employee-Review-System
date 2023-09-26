
const express = require('express');
const router = express.Router();

const passport = require('passport');


const adminController = require('../controllers/adminController');

router.get('/',passport.checkAuthentication,adminController.admin);
router.get('/delete/',passport.checkAuthentication,adminController.deleteEmployee);
router.get('/updateForm',passport.checkAuthentication,adminController.updateForm);
router.get('/addEmployee',passport.checkAuthentication,adminController.addEmployeeForm);

module.exports = router;