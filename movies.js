'use strtict';
const axios = require('axios');
require('dotenv').config();





function getMovies (request,response) {
  let selectedCity = request.query.cityName
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${selectedCity}&page=1&include_adult=false`
  axios
    .get(url)
    .then(results => {
      const movieArray = results.data.results.map(x => new MovieArrayClass(x));
      response.status(200).send(movieArray);
    })
    .catch(error => {
      response.status(500).send(`server error ${error}`);
    });
}


class MovieArrayClass {
  constructor(data) {
    this.title = data.original_title;
    this.poster = data.poster_path;
  }
}






module.exports = getMovies;


// app.get('/movies', async (request, response, next) => {
//     try {
//       let selectedCity = request.query.cityName
//       let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${selectedCity}&page=1&include_adult=false`
//       let results = await axios.get(url);
//       const movieArray = results.data.results.map(data => new MovieArrayClass(data))
//       response.send(movieArray);
//     } catch (error) {
//       next(error);
//     }
//   });