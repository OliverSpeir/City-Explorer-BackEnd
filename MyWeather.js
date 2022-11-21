'use strtict';
const axios = require('axios');
require('dotenv').config();

function getWeather(request, response) {
  let selectedCity = request.query.cityName
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${selectedCity}&days=3`
  axios
    .get(url)
    .then(results => {
      const forecastArray = results.data.data.map(day => new Forecast(day));
      response.status(200).send(forecastArray);
    })
    .catch(error => {
      response.status(500).send(`server error ${error}`);
    });
}

class Forecast {
  constructor(data) {
    this.date = data.valid_date;
    this.max = data.max_temp;
    this.min = data.min_temp;
    this.description = data.weather.description;
  }
}
module.exports = getWeather;
