'use strict';



const express = require('express');
let data = require('./data/weather.json');




require('dotenv').config();


const app = express();



const PORT = process.env.PORT || 3002;

/*app.get('/', (request, response) => {
  response.send('Hello, from our server');
});*/

app.get('/weather', (request, response) => {
  let city_name = request.query.city_name;
  let selectedCity = data.find(weather => weather.city_name === city_name);
  let newCity = new City(selectedCity);
  response.send(newCity);
});

//'*' wild card
//this will run for any route not defined above
app.get('*', (request, response) => {
  response.send('That route does not exist');
});

class City {
  constructor(cityObject){
    this.lat = cityObject.data.lat;
    this.lon = cityObject.data.lon;
    this.searchQuery = cityObject.data;
  }
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
