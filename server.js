const cors = require('cors')
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketController = require('./Socket/socketController');
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())   



/////////////////////////////////////////// ROUTES //////////////////////////////////////////////////////////

const authRouter = require('./Auth/auth.route')
app.use('/api/auth', authRouter)

const searchRouter = require('./Search/search.route')
app.use('/api/search', searchRouter)

const restaurantRouter = require('./Restaurant/restaurant.route')
app.use('/api/restaurant', restaurantRouter)

const callsRouter = require('./Call/call.route')
app.use('/api/calls', callsRouter)

const orderRouter = require('./Order/order.route')
app.use('/api/orders', orderRouter)

/////////////////////////////////////////// MONGO, SOCKET, SERVER //////////////////////////////////////////////

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@cluster0.szbva.mongodb.net/FinalDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB ');
});

const socketio = require('socket.io') 
const http = require('http')

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: ['https://yousefgadban-restaurant.netlify.app']
    }
});

socketController.start(io);


const PORT = process.env.PORT || 4000
server.listen(PORT)

module.exports = {
    io,
}