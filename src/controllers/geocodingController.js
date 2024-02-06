const geocodingModel = require('../models/geocodingModel');

const getGeocodingStatus = async (req, res) => {
    try {
        const { location } = req.query;
        const geocodingData = await geocodingModel.fetchCoordsFromLocation(location);
        res.json(geocodingData);
    } catch (error) {
        console.error('Error fetching geocode data: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getGeocodingStatus,
};
