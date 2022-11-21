'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const getWeather = require('./weather.js');
const getMovies = require ('./movies.js');
const PORT = process.env.PORT;

app.use(cors());
app.get('/weather',getWeather);
app.get('/movies',getMovies);

app.get('*', (request, response) => {
  response.send('That route does not exist');
});

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
