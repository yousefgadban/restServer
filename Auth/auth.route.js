const express = require('express')
const router = express.Router()
const authController = require('./auth.controller')
const jwt = require('jsonwebtoken')

module.exports = router


router.post('/register', (req,res) => {
    authController.register(req,res)
});

router.post('/login', (req,res) => {
    authController.login(req,res)
});

router.get('/test', authenticateToken, (req,res) => {
    authController.test(req,res)
});

router.post('/token', (req,res) => {
    console.log('token');
    authController.token(req,res)
});

router.delete('/logout', (req,res) => {
    authController.logout(req,res)
});

router.get('/getUsers', authenticateToken, (req,res) => {
    authController.getUsers(req,res)
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
