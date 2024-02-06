const express = require('express');
const router = express.Router();

// Controllers
const weatherController = require('../controllers/weatherController');

router.get('/', weatherController.getWeatherInfo);
router.get('/forecast', weatherController.getCurrentWeatherForecastHour);
router.get('/coordForecast', weatherController.getCoordForecast)

module.exports = router;