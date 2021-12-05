const callModel = require('./call.model').callModel;


const HOURS_AGO_TS = 1000*60*60*4;

const getCalls = async (req, res) => {
    const restaurantID = req.params.restaurantID;
    const last = new Date().getTime() - HOURS_AGO_TS;
    console.log('getCalls', restaurantID);
    try {
        const calls = await callModel.find({restaurantID: restaurantID}).where('time').gt(last);
        res.status(200).send({result: 'success', data: calls});
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}

const addNewCall = async (req, res) => {
    const {restaurantID, service, table, name} = req.body;
    console.log('addNewCall', restaurantID, service, table, name);

    try {
        const call = new callModel({
            restaurantID: restaurantID,
            name: name,
            service: service,
            table: table
        });
        call.save((err, data) => {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                // socket
                const io = require('../server').io;
                io.emit(restaurantID, data );
                res.status(200).send({ result: 'success', data: data });
            }
        });
    } catch (e) {
        console.log('errorr');
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}



module.exports = {
    getCalls,
    addNewCall
}