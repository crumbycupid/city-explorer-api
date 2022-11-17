'use strict';



const express = require('express');
let data = require('./data/weather.json');
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
    let selectedCity = data.find(city => city.city_name.toLowerCase() === cityInput.city.toLowerCase());
    //console.log(selectedCity, 'this is city weather');
    let forecastArr = selectedCity.data.map(day => new Forecast(day));
    console.log(forecastArr);
    // let newCity = new City(selectedCity);
    response.status(200).send(forecastArr);
  } catch (error) {
    next(error);
  }
});

//'*' wild card
//this will run for any route not defined above
app.get('*', (request, response) => {
  response.send('That route does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
