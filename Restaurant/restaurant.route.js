const express = require('express')
const router = express.Router()
const restaurantController = require('./restaurant.controller')
const jwt = require('jsonwebtoken')

module.exports = router


router.post('/addNewRestaurant', (req,res) => {
    restaurantController.addNewRestaurant(req,res)
});

router.post('/addNewCategory', (req,res) => {
    restaurantController.addNewCategory(req,res)
});

router.post('/addNewItem', (req,res) => {
    restaurantController.addNewItem(req,res)
});

router.post('/addNewAddition', (req,res) => {
    restaurantController.addNewAddition(req,res)
});

router.post('/addNewAdditionItem', (req,res) => {
    restaurantController.addNewAdditionItem(req,res)
});

router.get('/getRestaurantData/:id', (req,res) => {
    restaurantController.getRestaurantData(req,res)
});

router.post('/addCategoryToRestaurant/:restId', (req,res) => {
    restaurantController.addCategoryToRestaurant(req,res)
});

router.post('/addItemToCategory/:categoryId', (req,res) => {
    restaurantController.addItemToCategory(req,res)
});

router.post('/addAdditionToItem/:itemId', (req,res) => {
    restaurantController.addAdditionToItem(req,res)
});

router.post('/addItemAdditionToAddition/:additionId', (req,res) => {
    restaurantController.addItemAdditionToAddition(req,res)
});

router.get('/getSearch', (req,res) => {
    restaurantController.getSearch(req,res)
});




