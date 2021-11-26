const jwt = require('jsonwebtoken')
const validator = require('validator');
const userModel = require('./user.model').userModel;
const refreshTokenModel = require('./token.model').refreshTokenModel;
const bcrypt = require('bcrypt');
require('dotenv').config();

const AT_EXP = '15s';
const RT_EXP = '25s';

const login = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    
    if (!validator.isEmail(email)) {
        res.status(401).send({ result: 'error', data: 'Invalid input' });
    } else {

        const users = await loadUsers();
        
        let userExist = users.find((user) => {
            return (user.email === email);
        })

        if (userExist == null) {
            res.status(401).send({ result: 'error', data: 'error' });
        } else {
            try {
                if (await bcrypt.compare(password, userExist.password)) {
                    const accessToken = generateAccessToken(userExist._id);
                    const refreshToken = jwt.sign({id: userExist._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: RT_EXP});

                    const newRefreshToken = new refreshTokenModel({
                        refreshToken: refreshToken
                    });
                    newRefreshToken.save((err, data) => {
                        if (err) {
                            res.status(401).send({result: 'error', data: 'Something wrong!'});
                            throw err;
                        } else {
                            res.status(200).send({ result: 'success', data: {accessToken, refreshToken} });
                        }
                    });
       
                } else {
                    res.status(401).send({ result: 'error', data: 'error' });
                }  
            } catch(err) {
                console.log('errrrrrrrr', err);
                res.status(401).send({ result: 'error', data: 'error' });
            }
        }
    }
}

const register = async (req, res) => {
    const {name, email, password} = req.body;
    console.log(name, email, password);
    if (!validator.isEmail(email) || !name.trim().length > 3 || !password > 5) {
        console.log('Invalid input');
        res.status(401).send({result: 'error', data: 'Invalid input'});
    } else {

        const data = await loadUsers()
        
        const users = data;
        console.log('users',users);
        let userExist = users.find((user) => {
            return user.email === email;
        });

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        if (!userExist) {
            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword,
                isActive: true
            });
            newUser.save((err, data) => {
                if (err) {
                    res.status(401).send({result: 'error', data: 'Something wrong!'});
                    throw err;
                } else {
                    res.status(201).send(data);
                }
            });
        } else {
            res.status(401).send({result: 'error', data: 'Email already exists'});
        }
        
    }
}

const loadUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            userModel.find({}).lean().exec(function(err, data) {
                if (err) {
                    resolve([]);
                } 
                resolve(data);
            });
        } catch (e) {
            console.log('errorr');
            resolve([]);
        }
    });
}

const test = async (req, res) => {
    res.send(req.user);
}

const getUsers = async (req, res) => {
    res.status(200).send({ result: 'success', data: "getUsers" });
}

const token = async (req, res) => {
    const authHeader = req.headers['authorization']
    const refreshToken = authHeader && authHeader.split(' ')[1]
    console.log('refreshToken ', refreshToken);
    if (refreshToken == null) {
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }

    refreshTokenModel.find({refreshToken: refreshToken}).exec(function(err, data) {
        if (err) {
            res.status(401).send({result: 'error1', data: 'Forbidden!'});
        } else {
            if (data.length === 0) {
                res.status(401).send({result: 'error2', data: 'Forbidden!'});
            } else {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) {
                        res.status(401).send({result: 'error3', data: 'Something wrong!'});
                    } else {
                        refreshTokenModel.findOneAndDelete({refreshToken: refreshToken}, (err, data) => {
                            if (err) {
                                res.status(401).send({result: 'error4', data: 'Something wrong!'});
                            } else {
                                const accessToken = generateAccessToken({ _id: user.id })
                                const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: RT_EXP});

                                const newRefreshToken = new refreshTokenModel({
                                    refreshToken: refreshToken
                                });
                                newRefreshToken.save((err, data) => {
                                    if (err) {
                                        res.status(401).send({result: 'error5', data: 'Something wrong!'});
                                        throw err;
                                    } else {
                                        res.status(200).send({ result: 'success', data: {accessToken, refreshToken} });
                                    }
                                });

                                //res.status(200).send({ result: 'success', data: {accessToken: accessToken, refreshToken: refreshToken} });
                            }
                    
                        })
                         
    
                    }
                })
            }
        }
        
    });
    
}


const kareem = async (refreshToken) => {
    
    if (refreshToken == null) {
        res.status(401).send({result: 'error', data: 'Something wrong!'});
    }

    refreshTokenModel.find({refreshToken: refreshToken}).exec(function(err, data) {
        if (err) {
            res.status(401).send({result: 'error', data: 'Forbidden!'});
        } else {
            if (data.length === 0) {
                res.status(401).send({result: 'error', data: 'Forbidden!'});
            } else {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) {
                        res.status(401).send({result: 'error', data: 'Something wrong!'});
                    } else {
                        const accessToken = generateAccessToken({ _id: user.id })
                        res.status(200).send({ result: 'success', data: {accessToken} }); 
    
                    }
                })
            }
        }
        
    });
    
}


const logout = async (req, res) => {
    const refreshToken = req.body.token;

    refreshTokenModel.findOneAndDelete({refreshToken: refreshToken}, (err, data) => {
        if (err) {
            res.status(401).send({result: 'error', data: 'Something wrong!'});
        } else {
            res.status(200).send({ result: 'success', data: 'deleted' });
        }

    })

}

function generateAccessToken(userExist) {
    return jwt.sign({id: userExist._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: AT_EXP}); 
}

module.exports = {
    login,
    register,
    test,
    token,
    logout,
    getUsers
}