const express = require('express')
const router = express.Router()
const orderController = require('./order.controller')
const jwt = require('jsonwebtoken')

module.exports = router


router.get('/getOrders/:restaurantID', (req,res) => {
    orderController.getOrders(req,res)
});

router.post('/addNewOrder', (req,res) => {
    orderController.addNewOrder(req,res)
});