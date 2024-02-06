const weatherModel = require('../models/weatherModel');

// Function to handle the root endpoint (/api/weather/)
function getWeatherInfo(req, res) {
    const baseUrl = req.baseUrl;
    
    const availableRoutes = [
        { endpoint: `${baseUrl}/`, description: 'Display welcome message and available routes' },
        { endpoint: `${baseUrl}/forecast`, description: 'Get current weather forecast' },
        // Add more routes as needed
    ];

    res.json({
        status: 'OK',
        availableRoutes: availableRoutes.map(route => ({
            ...route,
            url: `${req.protocol}://${req.get('host')}${route.endpoint}`,
        })),
    });
}


const getCurrentWeatherForecastHour = async (req, res) => {
    try {
        const weatherData = await weatherModel.fetchWeather();
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getCoordForecast = async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const weatherData = await weatherModel.fetchCoordsForecast(lat, lng);
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getWeatherInfo,
    getCurrentWeatherForecastHour,
    getCoordForecast,
};