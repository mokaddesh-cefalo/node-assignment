const UserModel = require('../model/UserModel');
const { InvalidUserException } = require('../exceptions/custom.exception');

const createUser = async info => {
    try {
        let user = new UserModel(info);
        user = (await user.save());
        return user;
    } catch(err) {
        console.log(err);
        throw new InValidData(`Could not create user, data: ${info}`);
    }
}

module.exports = { createNewUser: createUser };