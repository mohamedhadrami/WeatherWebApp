const fetch = require('node-fetch');

const baseApiUrl = 'https://api.weather.gov';
const headers = {
    'Accept': 'application/json',
    'User-Agent': 'mohamedhadrami9@gmail.com',
};

const fetchWeather = async () => {
    const endpoint = '/gridpoints/ILX/46,100/forecast/';
    const url = baseApiUrl + endpoint;

    try {
        // Call endpoint
        const response = await fetch(url, { headers });
        const data = await response.json();

        // Extracting additional information
        const periods = data.properties.periods.map(period => ({
            number: period.number,
            name: period.name,
            startTime: period.startTime,
            endTime: period.endTime,
            isDaytime: period.isDaytime,
            temperature: period.temperature,
            temperatureUnit: period.temperatureUnit,
            temperatureTrend: period.temperatureTrend,
            probabilityOfPrecipitation: period.probabilityOfPrecipitation,
            dewpoint: period.dewpoint,
            relativeHumidity: period.relativeHumidity,
            windSpeed: period.windSpeed,
            windDirection: period.windDirection,
            icon: period.icon,
            shortForecast: period.shortForecast,
            detailedForecast: period.detailedForecast,
        }));

        return {
            temperature: data.properties.periods[0].temperature,
            description: data.properties.periods[0].shortForecast,
            location: 'Peoria',
            periods: periods,
            // Add more properties as needed
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Rethrow the error to handle it at a higher level if needed
    }
};


const fetchGridPointsFromCoords = async (lat, lng) => {
    const endpoint = `/points/${encodeURIComponent(lat)},${encodeURIComponent(lng)}`;
    const url = baseApiUrl + endpoint;
    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching grid point data for ${encodeURIComponent(lat)},${encodeURIComponent(lng)}:`, error);
        throw error;
    }
}

const fetchCoordsForecast = async (lat, lng) => {
    try {
        const gridData = await fetchGridPointsFromCoords(lat, lng);
        //return gridData;
        //const endpoint = `/gridpoints/${gridData.properties.gridId}/${gridData.properties.gridX},${gridData.properties.gridY}/forecast/`;
        //const url = baseApiUrl + endpoint;
        const response = await fetch(gridData.properties.forecast, { headers });
        const data = await response.json();
        //return data;

        // Extracting additional information
        const periods = data.properties.periods.map(period => ({
            number: period.number,
            name: period.name,
            startTime: period.startTime,
            endTime: period.endTime,
            isDaytime: period.isDaytime,
            temperature: period.temperature,
            temperatureUnit: period.temperatureUnit,
            temperatureTrend: period.temperatureTrend,
            probabilityOfPrecipitation: period.probabilityOfPrecipitation,
            dewpoint: period.dewpoint,
            relativeHumidity: period.relativeHumidity,
            windSpeed: period.windSpeed,
            windDirection: period.windDirection,
            icon: period.icon,
            shortForecast: period.shortForecast,
            detailedForecast: period.detailedForecast,
        }));

        return {
            temperature: data.properties.periods[0].temperature,
            description: data.properties.periods[0].shortForecast,
            location: `${gridData.properties.relativeLocation.properties.city}, ${gridData.properties.relativeLocation.properties.state}`,
            periods: periods,
            // Add more properties as needed
        };

    } catch (error) {
        console.error(`Error fetching weather data for ${encodeURIComponent(lat)},${encodeURIComponent(lng)}:`, error);
        throw error;
    }

}



module.exports = {
    fetchWeather,
    fetchCoordsForecast,
};