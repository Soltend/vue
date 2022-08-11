const express = require('express');
const router = express.Router();
const profileController = require('../Controllers/Profile');

router.post('/update-profile', profileController.update);

module.exports = router;