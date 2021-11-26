const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketController = require('./Socket/socketController');
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())   



/////////////////////////////////////////// ROUTES //////////////////////////////////////////////

const authRouter = require('./Auth/auth.route')
app.use('/api/auth', authRouter)


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@cluster0.szbva.mongodb.net/FinalDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB ');
});

const socketio = require('socket.io') 
const http = require('http')

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: ['http://localhost:3000']
    }
});

socketController.start(io);


const PORT = process.env.PORT || 4000
server.listen(PORT)