const orderModel = require('./order.model').orderModel;

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

const addNewOrder = async (req, res) => {
    const {service, table, name, restaurantID, price, order} = req.body
    console.log('addNewOrder', service, table, name, restaurantID, price, order); // JSON.parse(order)
    
    try {
        const addOrder = new orderModel({
            restaurantID: restaurantID,
            name: name,
            table: table,
            order: order,
            price: price
        });
        addOrder.save((err, data) => {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                res.status(200).send({ result: 'success', data: 'Order Commited!' });
            }
        });
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}


module.exports = { 
    getOrders,
    addNewOrder
}