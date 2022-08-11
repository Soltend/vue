const express = require('express');
const router = express.Router();
const authController = require('../Controllers/Auth');

router.post('/auth', authController.auth);
router.post('/registration', authController.registration);
router.post('/recovery', authController.recovery);
router.post('/logout', authController.logout);

module.exports = router;