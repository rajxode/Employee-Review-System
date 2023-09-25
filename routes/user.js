const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.home);
router.get('/sign-up',userController.signUp);

router.get('/signout',userController.signout);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'}),
    userController.createSession);

router.post('/create-account',userController.createAccount);

module.exports = router;