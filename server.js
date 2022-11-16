'use strict';

console.log('our first server');

const { response } = require('express');

const express = require('express');
let data = require('./data/weather.json');

require('dotenv').config();

const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT

app.get('/weather', (request, response, next) => {
    try {
        //slice(0,(query.indexOf(',')));
        let dirtyReq = request.query; 
        let Req = Object.keys(dirtyReq)[0];
        let cleanReq = Req.slice(0,Req.indexOf(','));
        //console.log (cleanReq);

        let selectedCity = data.find(x => x.city_name === cleanReq);
        console.log(selectedCity.data);

        //let CleanResponse = new Forecast();
        const forecastArray = selectedCity.data.map(day => new Forecast(day.valid_date,day.weather.description))
        //console.log(CleanResponse);
        //console.log(selectedCity);
       // console.log(selectedCity);
        response.send(forecastArray);
    } catch (error) {
        // create a new instance of the Error object that lives in Express
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
    constructor (date,description){
        this.date = date;
        this.description = description;
    }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));