const searchModel = require('./search.model').searchModel;


const getSearch = async (req, res) => {
    console.log('getSearch');
    try {
        searchModel.find({}).lean().exec(function(err, data) {
            if (err) {
                console.log('err');
                return res.status(200).send([]);
            }
            console.log('data', data);
            return res.status(200).send(data);
        });
    } catch (e) {
        console.log('errorr');
        return res.status(200).send([]);
    }
}



module.exports = {
    getSearch
}