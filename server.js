'use strict';



const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/weather', async (request, response, next) => {
  try {
    //console.log(request.query);
    let cityInput = request.query;
    let lat = request.query.lat;
    let lon = request.query.lon;
    let weatherURL = '';
    let searchQuerry = await axios.get(weatherURL);
    let forecastArr = searchQuerry.data.data.map(day => new Forecast(day));
  } catch (error) {
    next(error);
  }
});

app.get('/movie', async(request, response) =>{
  let searchTerm = request.query.search;
  let movieURL = '';
  let movieResults = await axios.get(movieURL);
  let topMovies = movieResults.data.results.map(movie => new movie(movie));
  topMovies.length < 1 ? response.status(500).send('Error, Movie not found.'):send(topMovies);
});

app.get(`/`, (request, response) => {
  response.send('Hello, from our server');
});

app.get('*', (request, response) => {
  response.send('That route does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description.toLowerCase();
    this.low = day.low_temp;
    this.high = day.max_temp;
    this.fullForecast = `Low of ${this.low}, high of ${this.high} with ${this.description}.`;
  };
};

class Movie {
  constructor (movies) {
    this.title = movies.title
    this.overview = movies.overview;
    this.averageRating = movieObj.vote_average;
    this.totalReviews = movieObj.vote_count;
    this.imgPath = '';
    this.releaseDate = movieObj.release_date;
  };
};

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
