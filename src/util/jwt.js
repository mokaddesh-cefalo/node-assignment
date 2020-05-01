const jwt = require('jsonwebtoken');
const util = require('util');

const exceptions = require('../exceptions/custom.exception')

const jwtVerify = util.promisify(jwt.verify);
const jwtSign = util.promisify(jwt.sign);

const extractUserTokenFromAuthToken = async (authorization) => {
    let tokenInfo = null;

    if (authorization) {
        try {
            tokenInfo = await jwtVerify(authorization.slice(7), process.env.privatekey);
        } catch (err) {
            throw new exceptions.InValidToken("Not valid token");
        }
    }

    return tokenInfo;
}

const createToken = async (name, type) => {
    let token = await jwtSign({ name:name, type:type }, process.env.privatekey);
    return `Bearer ${token}`;
}

module.exports = {extractUserTokenFromAuthToken, createToken};