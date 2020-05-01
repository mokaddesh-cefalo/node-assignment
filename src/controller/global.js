const jwt = require('../util/jwt');

const requestLogger = async (req, res, next) => {
    console.log(`Received a ${req.method} request from ${req.hostname}`);
    next();
}

const registerUser = async (req, res, next) => {
    if(req.query.name && req.query.type) {
        req.headers.authorization = await jwt.createToken(req.query.name, req.query.type);
    }

    if(req.headers.authorization) next();
    else { res.render('login'); }
}

 // token = await jwt.jwtSign({ foo: 'bar' }, process.env.privatekey);
const addUserInfo = async (req, res, next) => {
    try {
        req.user = await jwt.extractUserTokenFromAuthToken(req.headers.authorization);
    } catch (e) {
       res.status(e.code);
       res.send({ reason: e.message });
    }
    next();
}

module.exports = {requestLogger, addUserInfo, registerUser};