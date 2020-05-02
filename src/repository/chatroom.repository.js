const ChatRoomModel = require('../model/ChatRoomModel');

const createChatRoom = async info => {
    try {
        console.log(info);
        let chatRoom = new ChatRoomModel(info);
        chatRoom = (await chatRoom.save());
        return chatRoom;
    } catch(err) {
        console.log(err);
        throw new InValidData(`Could not create chat room, Chat room name should be unique, data: ${info}`);
    }
}

const getChatRoomById = async (_id) => {
    let chatRoom = await ChatRoomModel.findById(_id).lean().exec();
    console.log(chatRoom);
    return !chatRoom ? null : chatRoom;
}

const getAllChatRoom = async () => {
    return (await doFindQuery({}));
}

const addUserInChatRoom = async(_id, user) => {
    let chatRoom = await ChatRoomModel.findById(_id,);
    chatRoom.users.push(user);
    await chatRoom.save();
    console.log(chatRoom);
}

const insertMessage = async(_id, message) => {
    let chatRoom = await ChatRoomModel.findById(_id);
    chatRoom.messages.push(message);
    await chatRoom.save();
    console.log(chatRoom);
}

const doFindQuery = async (options) => {
    let chatRooms = await ChatRoomModel.find(options)
        .sort( { name: 1 } )
        .lean()
        .exec();
    return chatRooms;
}

module.exports = { createChatRoom, getAllChatRoom, getChatRoomById, addUserInChatRoom, insertMessage };