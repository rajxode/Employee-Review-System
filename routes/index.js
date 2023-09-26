const express = require('express');

const router = express.Router();

router.use('/',require('./user'));
router.use('/dashboard/admin',require('./admin'));
router.use('/dashboard/employee',require('./employee'));

module.exports = router;