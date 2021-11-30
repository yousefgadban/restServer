const express = require('express')
const router = express.Router()
const searchController = require('./search.controller')
const jwt = require('jsonwebtoken')

module.exports = router


router.get('/getSearch', (req,res) => {
    searchController.getSearch(req,res);
});