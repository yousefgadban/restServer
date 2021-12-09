const express = require('express')
const router = express.Router()
const orderController = require('./order.controller')
const jwt = require('jsonwebtoken')

module.exports = router


router.get('/getOrders/:restaurantID', (req,res) => {
    orderController.getOrders(req,res)
});

router.post('/addNewOrder', authenticateToken, (req,res) => {
    orderController.addNewOrder(req,res)
});

router.put('/changeOrderStatus', authenticateToken, (req,res) => {
    orderController.changeOrderStatus(req,res)
});

router.get('/getMyOrders', authenticateToken, (req,res) => {
    orderController.getMyOrders(req,res)
});

router.put('/changeMyOrderStatus', authenticateToken, (req,res) => {
    orderController.changeMyOrderStatus(req,res)
});

////////////////////////////////////////////////// Delivery ///////////////////////////////////////

router.get('/getDeliveries', (req,res) => {
    orderController.getDeliveries(req,res)
});

router.put('/acceptDelivery', authenticateToken, (req,res) => {
    orderController.acceptDelivery(req,res)
});




///////////////////////////////////////////////// MIDDLEWARE ////////////////////////////////////

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
