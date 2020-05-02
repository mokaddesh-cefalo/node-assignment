const userService = require('../service/user.service');

const requestLogger = async (req, res, next) => {
    console.log(`Received a ${req.method} request from ${req.hostname} to ${req.url}`);
    next();
}

const registerUser = async (req, res, next) => {
    if(req.cookies.authorization) { next(); }
    else if(req.body.name && req.body.type) {
        req.cookies.authorization = await userService.createUser({ name: req.body.name, type: req.body.type });
        next()
    }
    else { res.render('login'); }
}

const removeUser = async (req, res, next) => {
    res.cookie('authorization', req.cookies.authorization, { maxAge: 0, httpOnly: true });
    res.render('login');
}

const addUserInfoFromToken = async (req, res, next) => {
    try {
        req.user = await userService.getUserInfoFromToken(req.cookies.authorization);
    } catch (e) {
        res.render('login');
    }
    next();
}

module.exports = {requestLogger, addUserInfoFromToken, registerUser,
    removeUser};