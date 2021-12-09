const orderModel = require('./order.model').orderModel;
const deliveryModel = require('./delivery.model').deliveryModel;

const HOURS_AGO_TS = 1000*60*60*4;

const getOrders = async (req, res) => {
    const restaurantID = req.params.restaurantID;
    const last = new Date().getTime() - HOURS_AGO_TS;
    console.log('getOrders', restaurantID);
    try {
        const orders = await orderModel.find({restaurantID: restaurantID})  //.where('time').gt(last);
        res.status(200).send({result: 'success', data: orders});
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}

const getMyOrders = async (req, res) => {
    const userID = req.user.id;
    console.log('getMyOrders', userID);
    try {
        const orders = await orderModel.find({userID: userID}) 
        res.status(200).send({result: 'success', data: orders});
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}

const addNewOrder = async (req, res) => {
    const {table, name, restaurantID, price, order, delivery, restaurantName} = req.body
    const userID = req.user.id;
    console.log('addNewOrder', table, name, restaurantID, price, order, delivery, userID, restaurantName); // JSON.parse(order)
   
    try {
        const addOrder = new orderModel({
            restaurantID: restaurantID,
            name: name,
            table: table,
            order: order,
            price: price,
            delivery: delivery,
            userID: userID,
            restaurantName: restaurantName
        });
        addOrder.save((err, data) => {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                const io = require('../server').io;
                io.emit(`${restaurantID}-orders`, data );
                io.emit(`${userID}`, {msg: 'new order commited', delivery: delivery, step: 1} );

                res.status(200).send({ result: 'success', data: 'Order Commited!' });
            }
        });
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}


const changeOrderStatus = async (req, res) => {
    const {restaurantID, callID, newStatus} = req.body;
    
    console.log('changeOrderStatus', restaurantID, callID, newStatus);

    try {
        const query = {'_id': callID};
        const updatedData = {status: newStatus}
        
        orderModel.findOneAndUpdate(query, updatedData, {new: true, runValidators: true}, function(err, data) {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                const io = require('../server').io;
                io.emit(`${restaurantID}-orders`, data );
                //io.emit(`${data.userID}`, {msg: 'order status changed', newStatus: newStatus} );

                let step = 1;
                if (data.delivery !== "Delivery") {
                    if(newStatus === 'progress') {
                        step = 2;
                    }
                    if(newStatus === 'done') {
                        step = 3;
                    }
                } else {
                    if(newStatus === 'delivery') {
                        step = 2;
                        const addDelivery = new deliveryModel({
                            restaurantID: restaurantID,
                            name: data.name,
                            table: data.table,
                            order: data.order,
                            price: data.price,
                            delivery: data.delivery,
                            userID: data.userID,
                            orderID: callID,
                            restaurantName: data.restaurantName
                            
                        });
                        addDelivery.save((err, data) => {
                            if (err) {
                                res.status(401).send({result: 'error', data: 'Something wrong!'});
                                throw err;
                            } else {
                                const io = require('../server').io;
                                io.emit(`Delivery`, data );
                            }
                        });

                    }
                }

                io.emit(`${data.userID}`, {msg: 'new order commited', delivery: data.delivery, step: step} );
                res.status(200).send({ result: 'success', data: data });
            }
        });
        
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}



const getDeliveries = async (req, res) => {
    const last = new Date().getTime() - HOURS_AGO_TS;
    console.log('getDeliveries');
    try {
        const deliveries = await deliveryModel.find({status: 'new'})  //.where('time').gt(last);
        res.status(200).send({result: 'success', data: deliveries});
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}



const acceptDelivery = async (req, res) => {
    const {restaurantID, callID} = req.body;
    const userID = req.user.id;
    console.log('acceptDelivery', restaurantID, callID, userID);

    try {
        const query = {'_id': callID};
        const updatedData = {status: 'accepted', senderID: userID}
        
        deliveryModel.findOneAndUpdate(query, updatedData, {new: true, runValidators: true}, function(err, data) {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                const io = require('../server').io;
                io.emit(`Delivery`, data );

                res.status(200).send({ result: 'success', data: data });
            }
        });
        
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }

}


const changeMyOrderStatus = async (req, res) => {
    const {restaurantID, callID, newStatus} = req.body;
    
    console.log('changeMyOrderStatus', restaurantID, callID, newStatus);

    try {
        const query = {'_id': callID};
        const updatedData = {status: newStatus}
        
        orderModel.findOneAndUpdate(query, updatedData, {new: true, runValidators: true}, function(err, data) {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                const io = require('../server').io;
                io.emit(`${restaurantID}-orders`, data );
                //io.emit(`${data.userID}`, {msg: 'order status changed', newStatus: newStatus} );

                let step = 1;
                if (data.delivery === "Take-away") {
                    if(newStatus === 'progress') {
                        step = 2;
                    }
                    if(newStatus === 'done') {
                        step = 3;
                    }
                } else if (data.delivery === "Delivery") {
                    if(newStatus === 'approved') {
                        step = 3;

                        const query = {'orderID': callID};
                        const updatedData = {status: newStatus}
                        
                        deliveryModel.findOneAndUpdate(query, updatedData, {new: true, runValidators: true}, function(err, data) {
                            if (err) {
                                res.status(401).send({result: 'error', data: 'Something wrong!'});
                                throw err;
                            } else {
                                const io = require('../server').io;
                                io.emit(`Delivery`, data );
                                io.emit(`${data.userID}`, {msg: 'new order commited', delivery: data.delivery, step: step} );
                                res.status(200).send({ result: 'success', data: data });
                            }
                        });

                    }
                } else {
                    res.status(401).send({result: 'error', data: 'Something wrong!'});
                }

                // io.emit(`${data.userID}`, {msg: 'new order commited', delivery: data.delivery, step: step} );
                // res.status(200).send({ result: 'success', data: data });
            }
        });
        
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}

module.exports = { 
    getOrders,
    getMyOrders,
    addNewOrder,
    changeOrderStatus,
    getDeliveries,
    acceptDelivery,
    changeMyOrderStatus
}