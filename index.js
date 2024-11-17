const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

// Exercise 1: Get All Restaurants
// http://localhost:3000/restaurants

app.get('/restaurants', (req, res) => {
  let restaurants = res.status(200).json({ restaurants: restaurants });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
