const logger = require('../Logs/Logger');

const start = (io) => {
    io.on('connection', socket => {
        // console.log('New connection ' + socket.id);
        logger.writeToLogFile('socket', 'New connection ' + socket.id);
    
        socket.emit('message', 'Welcome');

        socket.on('joinRestaurantCalls', ({restId}) => {
            console.log('joinRestaurantCalls', restId, socket.id);

            socket.join(`${restId}-calls`);
        });

        socket.on('joinNotifications', ({userId}) => {
            console.log('joinNotifications', userId);

            socket.join(`${userId}`);

            //io.emit(`${userId}`, {msg: 'new notification'} );
        });

        socket.on("disconnect", () => {
            console.log('Client disconnected ' + socket.id);
        });

    })
}

module.exports = {
    start
}
