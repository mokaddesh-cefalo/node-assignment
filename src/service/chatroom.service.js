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

const getAllChatRoom = async (req) => {
    let chatRooms = await chatRoomRepository.getAllChatRoom();
    chatRooms = chatRooms.map(room => {
        let joined = room.users.find(user => user._id === req.user._id);
        room.joined = (joined) ? true : false;
        return room;
    });
    return chatRooms;
}

const getChatRoomById = async (chatRoom_id, loggedInUser) => {
    let chatRoom = (await chatRoomRepository.getChatRoomById(chatRoom_id));
    giveAccessForQuestion(chatRoom, loggedInUser);
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

const addQuestion = async req => {
    let question = {
        statement: req.body.statement,
        creator_id: req.user._id,
        creator_name: req.user._id,
    }
    
    let chatRoom = await chatRoomRepository.addQuestion(req.params._id, question);
    return chatRoom;
}

const insertAnswer = async (chatRoom_id, loggedInUser, message) => {
    await chatRoomRepository.insertAnswer(chatRoom_id, {
        message: message,
        user_id: loggedInUser._id,
        user_name: loggedInUser.name
    });

    return (await chatRoomRepository.getChatRoomById(chatRoom_id));
}

const getAllAnswer = async (chatRoom_id) => {
    let chatRoom = await chatRoomRepository.getChatRoomById(chatRoom_id);
    return chatRoom.answers;
}

function giveAccessForQuestion(chatRoom, loggedInUser) {
    if (chatRoom.question) {
        if (loggedInUser.type === 'interviewer' && chatRoom.question.creator_id === loggedInUser._id) {
            chatRoom.question.access = 'update';
        }
        else {
            chatRoom.question.access = 'disabled';
            chatRoom.question.answer = (loggedInUser.type !== 'interviewer');
        }
    }
    else if (loggedInUser.type === 'interviewer') {
        chatRoom.question = {};
        chatRoom.question.access = 'create';
    }
}

module.exports = { createChatRoom, getAllChatRoom, getChatRoomById, 
    insertMessage, getAllMessage, getAllUser,
    addLoggedInUserToChatRoom, addQuestion, insertAnswer,
    getAllAnswer };