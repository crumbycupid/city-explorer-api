'use strict';

let cache = require('./cache');
const axios = require('axios');
require('dotenv').config();

async function getMovie(cityName) {

  const key = 'movie-' + cityName;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit for movies');
  } else {
    console.log('Cache miss for movies');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].date = await axios.get(url)
      .then(response => parseMovie(response.data));
  }
  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const myMovie = movieData.results.map(day => {
      return new Movie(day);
    });
    return Promise.resolve(myMovie);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.avgRating = movieObj.vote_average;
    this.totalRevies = movieObj.vote_count;
    this.img_url = movieObj.poster_path;
    this.releaseDate = movieObj.release_date;
  }
}

module.exports = getMovie;
