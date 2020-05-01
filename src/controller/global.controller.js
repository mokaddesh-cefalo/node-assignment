const userService = require('../service/user.service');

const requestLogger = async (req, res, next) => {
    console.log(`Received a ${req.method} request from ${req.hostname} to ${req.url}`);
    next();
}

const registerUser = async (req, res, next) => {
    if(req.headers.authorization) { next(); }
    else if(req.body.name && req.body.type) {
        req.headers.authorization = await userService.createUser({ name: req.body.name, type: req.body.type });
        next()
    }
    else { res.render('login'); }
}

const addUserInfoFromToken = async (req, res, next) => {
    try {
        req.user = await userService.getUserInfoFromToken(req.headers.authorization);
        console.log(`Added user ${req.user}`);
    } catch (e) {
       res.status(e.code);
       res.send({ reason: e.message });
    }
    next();
}

module.exports = {requestLogger, addUserInfoFromToken, registerUser};