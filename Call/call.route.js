const express = require('express')
const router = express.Router()
const callsController = require('./call.controller')
const jwt = require('jsonwebtoken')

module.exports = router


router.get('/getCalls/:restaurantID', (req,res) => {
    callsController.getCalls(req,res)
});


router.post('/addNewCall', (req,res) => {
    callsController.addNewCall(req,res)
});