const express = require('express');
const router = express.Router();
const companyController = require('../Controllers/Company');

router.post('/all-company', companyController.getAll);
router.post('/remove-company', companyController.remove);
router.post('/create-company', companyController.create);
router.post('/get-company', companyController.getSingle);
router.post('/edit-company', companyController.edit);

module.exports = router;