const express = require('express');
const router = express.Router();

// Routers
const weatherRouter = require('./weatherRoutes');
const geocodeRouter = require('./geocodingRoutes');

// Controllers
const helpController = require('../controllers/helpController');

router.get('/api', helpController.welcomeFunc);
router.use('/api/weather', weatherRouter);
router.use('/api/geocode', geocodeRouter);
router.get('/api/help', helpController.helperFunc);

module.exports = router;