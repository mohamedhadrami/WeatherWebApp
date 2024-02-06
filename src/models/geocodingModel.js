require('dotenv').config();

const fetchCoordsFromLocation = async (location) => {
    try {
        const apiKey = process.env.OPENCAGE_API_KEY;
        const baseApiUrl = 'https://api.opencagedata.com/geocode/v1/json?';
        const query = `q=${encodeURIComponent(location)}`;
        const url = baseApiUrl + query + '&key=' + apiKey;

        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching geocode data: ', error);
        throw error;
    }
};

module.exports = {
    fetchCoordsFromLocation,
};
