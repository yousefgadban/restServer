const logger = require('../Logs/Logger');

const start = (io) => {
    io.on('connection', socket => {
        // console.log('New connection ' + socket.id);
        logger.writeToLogFile('socket', 'New connection ' + socket.id);
    
        socket.emit('message', 'Welcome');

        socket.on("disconnect", () => {
            console.log('Client disconnected ' + socket.id);
        });

    })
}

module.exports = {
    start
}
