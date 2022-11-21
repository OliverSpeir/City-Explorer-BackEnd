'use strict';
const axios = require('axios');
require('dotenv').config();
let cache = require('./cache.js');

module.exports = getMovie;

function getMovie(city) {
  const key = 'movie-' + city;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
  console.log(url);
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovie(response.data));
  }

  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.results.map(data => {
      return new Movie(data);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(data) {
    this.title = data.original_title;
    this.poster = data.poster_path;
  }
}
