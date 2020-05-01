const jwt = require('../util/jwt');
const userRepository = require('../repository/user.repository');

const createUser = async (userInfo) => {
    let user = null, userToken = null;

    try {
        user = await userRepository.createNewUser(userInfo);
        userToken = await jwt.createToken(user);
        console.log(`created token: ${userToken} \n ${user}`);
    } catch(err) {
        console.error(err);
        throw err;
    }

    return userToken;
}

const getUserInfoFromToken = async (token) => {
    let userInfo = null;

    try {
        userInfo = await jwt.extractInfoFromToken(token);
    } catch(err) {
        console.log("Got error while extracting token information");
        throw err;
    }

    return userInfo.data;
}


module.exports = { createUser, getUserInfoFromToken };