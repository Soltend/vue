const express = require('express');
const router = express.Router();
const { jwtCheck } = require('../Middleware/Jwt');
const verificationController = require('../Middleware/Verification');

router.post('/verification', jwtCheck, verificationController.user);
router.post('/verification-company', jwtCheck, verificationController.company);

module.exports = router;