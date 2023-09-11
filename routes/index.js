const express = require('express');

const router = express.Router();

router.use('/',require('./user'));
router.use('/dashboard',require('./dashboard'));

module.exports = router;