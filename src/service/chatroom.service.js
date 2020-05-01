const chatRoomRepository = require('../repository/chatroom.repository');

const createChatRoom = async (chatRoomName, creatorId) => {
    let chatroom = null;

    try {
        chatroom = await chatRoomRepository.createChatRoom({
            name: chatRoomName,
            creator: creatorId
        });
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

const getChatRoomById = async (chatroom_id, loggedInUser) => {
    let chatRoom = await chatRoomRepository.getChatRoomById(chatroom_id);
    console.log(chatRoom);
    
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

module.exports = { createChatRoom, getAllChatRoom, getChatRoomById };