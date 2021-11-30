const restaurantModel = require('./restaurant.model').restaurantModel;
const categoryModel = require('./restaurant.model').categoryModel;
const itemModel = require('./restaurant.model').itemModel;
const additionModel = require('./restaurant.model').additionModel;
const additionItemModel = require('./restaurant.model').additionItemModel;



const addNewRestaurant = async (req, res) => {
    const {name, name_en, name_ar, name_he, location, location_en, location_ar, location_he, active} = req.body;
    console.log('addNewRestaurant', name, name_en, name_ar, name_he, location, location_en, location_ar, location_he, active);
    try {
        const restaurant = new restaurantModel({
            name: name,
            name_en: name_en,
            name_ar: name_ar,
            name_he: name_he,
            location: location,
            location_en: location_en,
            location_ar: location_ar,
            location_he: location_he,
            active: active
        });
        restaurant.save((err, data) => {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                res.status(200).send({ result: 'success', data: data });
            }
        });
    } catch (e) {
        console.log('errorr', e);
        return res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}

const addNewCategory = async (req, res) => {
    const {restaurantID, name, name_en, name_ar, name_he} = req.body;
    console.log('addNewCategory', restaurantID, name, name_en, name_ar, name_he);
    try {
        const category = new categoryModel({
            restaurantID: restaurantID,
            name: name,
            name_en: name_en,
            name_ar: name_ar,
            name_he: name_he
        });
        category.save((err, data) => {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                res.status(200).send({ result: 'success', data: data });
            }
        });
    } catch (e) {
        console.log('errorr');
        return res.status(200).send([]);
    }
}


const addNewItem = async (req, res) => {
    const {restaurantID, name, name_en, name_ar, name_he, price, quantity, url, active} = req.body;
    console.log('addNewItem', name, name_en, name_ar, name_he, price, quantity, url, active);
    try {
        const item = new itemModel({
            restaurantID: restaurantID,
            name: name,
            name_en: name_en,
            name_ar: name_ar,
            name_he: name_he,
            price: price,
            quantity: quantity,
            url: url,
            active: active
        });
        item.save((err, data) => {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                res.status(200).send({ result: 'success', data: data });
            }
        });
    } catch (e) {
        console.log('errorr');
        return res.status(200).send([]);
    }
}


const addNewAddition = async (req, res) => {
    const {restaurantID, name, name_en, name_ar, name_he, singleChoice} = req.body;
    console.log('addNewAddition', restaurantID, name, name_en, name_ar, name_he, singleChoice);
    try {
        const addition = new additionModel({
            restaurantID: restaurantID,
            name: name,
            name_en: name_en,
            name_ar: name_ar,
            name_he: name_he,
            singleChoice: singleChoice
        });
        addition.save((err, data) => {
            if (err) {
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                res.status(200).send({ result: 'success', data: data });
            }
        });
    } catch (e) {
        console.log('errorr');
        return res.status(200).send([]);
    }
}


const addNewAdditionItem = async (req, res) => {
    const {restaurantID, name, name_en, name_ar, name_he, isDefault, price, quantity} = req.body;
    console.log('addNewAdditionItem', restaurantID, name, name_en, name_ar, name_he, isDefault, price, quantity);
    try {
        const additionItem = new additionItemModel({
            restaurantID: restaurantID,
            name: name,
            name_en: name_en,
            name_ar: name_ar,
            name_he: name_he,
            isDefault: isDefault,
            price: price,
            quantity: quantity
        });
        additionItem.save((err, data) => {
            if (err) {
                console.log(err);
                res.status(401).send({result: 'error', data: 'Something wrong!'});
                throw err;
            } else {
                res.status(200).send({ result: 'success', data: data });
            }
        });
    } catch (e) {
        console.log('errorr');
        return res.status(200).send([]);
    }
}

// const getRestaurantData = async (req, res) => {
//     const id = req.params.id
//     console.log('getRestaurantData', id);
//     try {
//         restaurantModel.find({_id: id}).populate('categories').lean().exec(function(err, data) {
//             if (err) {
//                 res.status(401).send({result: 'error', data: 'Something wrong!'});
//             } 
//             console.log(data);
//             res.status(200).send({result: 'error', data: data});
//         });
//     } catch (e) {
//         console.log('errorr');
//         res.status(401).send({result: 'error', data: 'Something wrong!'});
//     } 
// }

const getRestaurantData = async (req, res) => {
    const id = req.params.id
    console.log('getRestaurantData', id);
    try {
        const data = await restaurantModel.find({_id: id}).populate({
            path: 'categories',
            populate: {
                path: 'items', 
                model: 'item',
                populate: {
                    path: 'additions',
                    model: 'addition',
                    populate: {
                        path: 'additionItems',
                        model: 'additionItem'
                    }
                }
            }
        });
        res.status(200).send(data);
    } catch (e) {
        console.log('errorr');
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    } 
}


const addCategoryToRestaurant = async (req, res) => {
    const restId = req.params.restId
    const {categoryID} = req.body
    console.log('addCategoryToRestaurant', restId, categoryID);
    try {
        const restaurant = await restaurantModel.findOne({_id: restId});
        console.log(restaurant);
        restaurant.categories.push(categoryID);
        restaurant.save();
        res.status(200).send({result: 'success', data: 'Success'});
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}

const addItemToCategory = async (req, res) => {
    const categoryId = req.params.categoryId
    const {itemId} = req.body
    console.log('addItemToCategory', categoryId, itemId);
    try {
        const category = await categoryModel.findOne({_id: categoryId});
        //console.log(category);
        category.items.push(itemId);
        category.save();
        res.status(200).send({result: 'success', data: 'Success'});
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}


const addAdditionToItem = async (req, res) => {
    const itemId = req.params.itemId
    const {additionId} = req.body
    console.log('addAdditionToItem', itemId, additionId);
    try {
        const item = await itemModel.findOne({_id: itemId});
        //console.log(category);
        item.additions.push(additionId);
        item.save();
        res.status(200).send({result: 'success', data: 'Success'});
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}


const addItemAdditionToAddition = async (req, res) => {
    const additionId = req.params.additionId
    const {additionItemId} = req.body
    console.log('addItemAdditionToAddition', additionId, additionItemId);
    try {
        const addition = await additionModel.findOne({_id: additionId});
        //console.log(category);
        addition.additionItems.push(additionItemId);
        addition.save();
        res.status(200).send({result: 'success', data: 'Success'});
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}


const getSearch = async (req, res) => {
    console.log('getSearch');
    try {
        const search = await restaurantModel.find({active: true}).select({"name":1, "name_en":1, "name_ar":1, "name_en":1, "name_he":1});
        res.status(200).send({result: 'success', data: search});
    } catch (e) {
        console.log('errorr', e);
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }
}


module.exports = {
    addNewRestaurant,
    addNewCategory,
    addNewItem,
    addNewAddition,
    addNewAdditionItem,
    getRestaurantData,
    addCategoryToRestaurant,
    addItemToCategory,
    addAdditionToItem,
    addItemAdditionToAddition,
    getSearch
}