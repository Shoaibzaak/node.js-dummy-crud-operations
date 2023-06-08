/**
 * Created by Mb
 */
 
const express = require('express');
const router = express.Router();

const controller = require('../../controllers').user;

router.post('/signUp', controller.signup);
router.post('/signIn', controller.signin);
router.post('/forgot-password', controller.forgotPassword);
router.post('/verify-code', controller.verifyCode);
router.get('/as', controller.AS);

module.exports = router;
