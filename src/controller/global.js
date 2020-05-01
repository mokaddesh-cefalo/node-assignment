const userService = require('../service/user.service');

const requestLogger = async (req, res, next) => {
    console.log(`Received a ${req.method} request from ${req.hostname}`);
    next();
}

const registerUser = async (req, res, next) => {
    if(req.headers.authorization) { next(); }
    else if(req.query.name && req.query.type) {
        req.headers.authorization = await userService.createUser({ name: req.query.name, type: req.query.type });
        next()
    }
    else { res.render('login'); }
}

const addUserInfoFromToken = async (req, res, next) => {
    try {
        req.user = await userService.getUserInfoFromToken(req.headers.authorization);
    } catch (e) {
       res.status(e.code);
       res.send({ reason: e.message });
    }
    next();
}

module.exports = {requestLogger, addUserInfoFromToken, registerUser};