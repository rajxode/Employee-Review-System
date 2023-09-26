
const express = require('express');
const router = express.Router();

const passport = require('passport');


const adminController = require('../controllers/adminController');

router.get('/',passport.checkAuthentication,adminController.admin);
router.get('/delete/',passport.checkAuthentication,adminController.deleteEmployee);
router.get('/updateForm',passport.checkAuthentication,adminController.updateForm);
router.post('/update',passport.checkAuthentication,adminController.updateEmployee);
router.get('/addEmployee',passport.checkAuthentication,adminController.addEmployeeForm);
router.post('/createEmployee',passport.checkAuthentication,adminController.addEmployee);

module.exports = router;