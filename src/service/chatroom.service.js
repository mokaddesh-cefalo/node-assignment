const chatRoomRepository = require('../repository/chatroom.repository');

const createChatRoom = async (req) => {
    let chatroom = null;
    let roomInfo = req.body;
    roomInfo.creator = req.user._id;

    console.log(roomInfo);
    try {
        chatroom = await chatRoomRepository.createChatRoom(roomInfo);
    } catch (error) {
        console.log(error.message);
        throw error;
    }

    return chatroom;
}

const getAllChatRoom = async () => {
    let chatRoom = await chatRoomRepository.getAllChatRoom();
    return chatRoom;
}

const getChatRoomById = async (chatRoom_id, loggedInUser) => {
    let chatRoom = await chatRoomRepository.getChatRoomById(chatRoom_id);
    let user = chatRoom.users.find(user => user._id === loggedInUser._id);

    if(!user) {
        await chatRoomRepository.addUserInChatRoom(chatRoom, {
            _id: loggedInUser._id,
            name: loggedInUser.name,
            type: loggedInUser.type
        });
    }
    return chatRoom;
}

const insertMessage = async (chatRoom_id, loggedInUser, message) => {
    await chatRoomRepository.insertMessage(chatRoom_id, {
        message: message,
        user_id: loggedInUser._id,
        user_name: loggedInUser.name
    });

    return (await chatRoomRepository.getChatRoomById(chatRoom_id));
}

const getAllMessage = async (chatRoom_id) => {
    let chatRoom = await chatRoomRepository.getChatRoomById(chatRoom_id);
    return chatRoom.messages;
}

const getAllUser = async (chatRoom_id) => {
    let chatRoom = await chatRoomRepository.getChatRoomById(chatRoom_id);
    return chatRoom.users;
}

const addLoggedInUserToChatRoom = async (chatRoom_id, loggedInUser) => {
    let chatRoom = await chatRoomRepository.getChatRoomById(chatRoom_id);
    let user = chatRoom.users.find(user => user._id === loggedInUser._id);

    if(!user) {
        await chatRoomRepository.addUserInChatRoom(chatRoom, {
            _id: loggedInUser._id,
            name: loggedInUser.name,
            type: loggedInUser.type
        });
    }
    return chatRoom;
}

module.exports = { createChatRoom, getAllChatRoom, getChatRoomById, 
    insertMessage, getAllMessage, getAllUser,
    addLoggedInUserToChatRoom };