const HttpError = require("../models/http-error");
const axios = require('axios')

const API_KEY = 'sdnljnsldknfljdslfjn'

async function getCoordsForAddress(address) {
    const response = await axios.get(
        `https://dummyadress.com/stuff/adress=${encodeURIComponent(address)}&api=${API_KEY}`
    );

    const data = response.data;

    if(!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError('could not find location', 422);
        throw error;
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;