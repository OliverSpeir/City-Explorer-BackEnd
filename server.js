'use strict';

console.log('our first server');

const { response } = require('express');

const express = require('express');
let data = require('./data/weather.json');

require('dotenv').config();

const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

const PORT = process.env.PORT

app.get('/weather', async (request, response, next) => {
    try {
        // let dirtyReq = request.query; 
        // let Req = Object.keys(dirtyReq)[0];
        // let cleanReq = Req.slice(0,Req.indexOf(','));
        // let city = request.query.cityName;
        // let lon = request.query.lon;
        // let lat = request.query.lat;
        let selectedCity = request.query.cityName
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${selectedCity}&days=3`
        //console.log(url);
        let results = await axios.get(url);
        console.log(results.data.data);
        // let selectedCity = data.find(x => x.city_name === city);
        const forecastArray = results.data.data.map(day => new Forecast(day))
        console.log(forecastArray);
        response.send(forecastArray);
    } catch (error) {
        next(error);
    }
})
app.get('/movies', async (request, response, next) => {
    try {
        let selectedCity = request.query.cityName
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${selectedCity}&page=1&include_adult=false`
        console.log(url);
        let results = await axios.get(url);
       // console.log(results.data.data);
        // let selectedCity = data.find(x => x.city_name === city);
        const movieArray = results.data.results.map(data => new MovieArrayClass(data))
        //console.log(forecastArray);
        console.log(url);
        response.send(movieArray);
    } catch (error) {
        next(error);
    }
})

app.get('*', (request, response) => {
    response.send('That route does not exist');
});


app.use((error, request, response, next) => {
    response.status(500).send(error.message);
});

class Forecast {
    constructor (data){
        this.date = data.valid_date;
        this.description = data.weather.description;
    }
}
class MovieArrayClass {
    constructor (data){
        this.title = data.original_title;
        this.poster = data.poster_path;
    }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));