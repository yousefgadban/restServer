const express = require('express')
const router = express.Router()
const callsController = require('./call.controller')
const jwt = require('jsonwebtoken')

module.exports = router


router.get('/getCalls/:restaurantID', (req,res) => {
    callsController.getCalls(req,res)
});


router.post('/addNewCall', authenticateToken, (req,res) => {
    callsController.addNewCall(req,res)
});

router.put('/changeCallStatus', (req,res) => {
    callsController.changeCallStatus(req,res)
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log('authenticateToken ', token);
    if (token == null) return res.status(201).send({result: 'error', msg: 'Something wrong!'});
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send({result: 'error', msg: 'Expired token'});
      req.user = user
      next()
    })
}