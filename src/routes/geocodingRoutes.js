const express = require('express');
const router = express.Router();
const geocodingController = require('../controllers/geocodingController');

router.get('/location', geocodingController.getGeocodingStatus);

module.exports = router;
