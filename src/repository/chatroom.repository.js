const ChatRoomModel = require('../model/ChatRoomModel');

const createUser = async info => {
    try {
        let user = new UserModel(info);
        user = (await user.save());
        return user;
    } catch(err) {
        console.log(err);
        throw new InvalidUserException(`Could not create user, data: ${info}`);
    }
}

module.exports = { createNewUser: createUser };