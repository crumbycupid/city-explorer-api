'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

let theWeather = require('./modules/weather');
let theMovie = require('./modules/movie');

app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/weather', theWeather);
app.get('/movie', theMovie);
/*app.get('/weather', async (request, response, next) => {
  try {
    //console.log(request.query);
    //let cityInput = request.query;
    //let lat = request.query.lat;
    //let lon = request.query.lon;
    //let weatherURL = `https://api.weatherbit.io/v2.0/forecast/airquality?lat=38.0&lon=-78.0&key=38c98f67942a46c690e58a2649c773b3&hours=0-72`;
    //let searchQuerry = await axios.get(weatherURL);
    //let forecastArr = searchQuerry.data.data.map(day => new Forecast(day));
  } catch (error) {
    next(error);
  }
});*/

app.get('*', (request, response) => {
  response.send('This is the landing page');
});

app.use((error, request, response,) => {
  response.status(500).send(error.message);
});

/*class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description.toLowerCase();
    this.low = day.low_temp;
    this.high = day.max_temp;
    this.fullForecast = `Low of ${this.low}, high of ${this.high} with ${this.description}.`;
  }
}*/


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
