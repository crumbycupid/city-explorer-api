'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;

const weather = require('./modules/weather');
const getMovie = require('./modules/movie');

app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/weather', weatherHandler);
function weatherHandler(request, response) {
  const {lat,lon} = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}


app.get('/movie', movieHandler);
function movieHandler(request, response) {
  const {cityName} = request.query;
  getMovie(cityName)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}



app.get('*', (request, response) => {
  response.send('This is the landing page');
});

app.use((error, request, response,) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
