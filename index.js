const express = require('express');
const { resolve } = require('path');
let sqlite3 = require('sqlite3').verbose();
let {open} = require('sqlite');
let cors = require('cors');

const app = express();
app.use(cors());


const port = 3010;


let db;
(async ()=> {
  db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database
  })
})();


app.get('/', async (req, res) => {
  res.status(200).json({message: "Server Running..."});
});

// Exercise 1: Get All Restaurants
// http://localhost:3000/restaurants

async function findAllRestaurent() {
  let query = "Select * from restaurants";
  let response = await db.all(query, []);
  return {restaurants: response};
}

app.get('/restaurants', async (req, res) => {
  let restaurants = await findAllRestaurent();
  res.status(200).json(restaurants);
});


// Exercise 2: Get Restaurant by ID
// http://localhost:3000/restaurants/details/1

async function findRestaurentsById(id) {
  let query = "Select * from restaurants WHERE id=?";
  let response = await db.get(query, [id]);
  return {restaurant: response};
}

app.get('/restaurants/details/:id', async (req, res) => {
  let id = req.params.id;
  let restaurants = await findRestaurentsById(id);
  res.status(200).json(restaurants);
});


// Exercise 3: Get Restaurants by Cuisine
// http://localhost:3000/restaurants/cuisine/Indian

async function findRestaurentsByCuisine(cuisine) {
  let query = "Select * from restaurants WHERE cuisine=?";
  let response = await db.all(query, [cuisine]);
  return {restaurants: response};
}

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  let restaurants = await findRestaurentsByCuisine(cuisine);
  res.status(200).json(restaurants);
});


//Exercise 4: Get Restaurants by Filter
// http://localhost:3000/restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false

async function findRestaurentsByFilters(isVeg, hasOutdoorSeating, isLuxury) {
  let query = "Select * from restaurants WHERE isVeg=? and hasOutdoorSeating=? and isLuxury=?";
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return {restaurants: response};
}


app.get('/restaurants/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury  = req.query.isLuxury;


  let restaurants = await findRestaurentsByFilters(isVeg, hasOutdoorSeating, isLuxury);
  res.status(200).json(restaurants);
});

// Exercise 5: Get Restaurants Sorted by Rating
// http://localhost:3000/restaurants/sort-by-rating


async function findAllRestaurentSortByRating() {
  let query = "Select * from restaurants order by rating desc";
  let response = await db.all(query, []);
  return {restaurants: response};
}

app.get('/restaurants/sort-by-rating', async (req, res) => {
  let restaurants = await findAllRestaurentSortByRating();
  res.status(200).json(restaurants);
});


// Exercise 6: Get All Dishes
// http://localhost:3000/dishes

async function findAllDishes() {
  let query = "Select * from dishes";
  let dishes = await db.all(query, []);
  return {restaurants: dishes};
}

app.get('/dishes', async (req, res) => {
  let dishes = await findAllDishes();
  res.status(200).json(dishes);
});

// Exercise 7: Get Dish by ID
// http://localhost:3000/dishes/details/1

async function findDishesById(id) {
  let query = "Select * from dishes WHERE id=?";
  let response = await db.get(query, [id]);
  return {dish: response};
}

app.get('/dishes/details/:id', async (req, res) => {
  let id = req.params.id;
  let dishes = await findDishesById(id);
  res.status(200).json(dishes);
});

// Exercise 8: Get Dishes by Filter
// http://localhost:3000/dishes/filter?isVeg=true

async function findDishesByFilter(isVeg) {
  let query = "Select * from dishes WHERE isVeg=?";
  let response = await db.all(query, [isVeg]);
  return {dishes: response};
}
app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let dishes = await findDishesByFilter(isVeg);
  res.status(200).json(dishes);
});


// Exercise 9: Get Dishes Sorted by Price
// http://localhost:3000/dishes/sort-by-price
async function findDishesSortByPrice() {
  let query = "Select * from dishes order by price";
  let response = await db.all(query, []);
  return {dishes: response};
}

app.get('/dishes/sort-by-price', async (req, res) => {
  let dishes = await findDishesSortByPrice();
  res.status(200).json(dishes);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
