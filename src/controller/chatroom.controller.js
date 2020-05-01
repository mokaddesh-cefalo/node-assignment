const chatRoomService = require('../service/chatroom.service');

const createChatroom = async (req, res) => {
    try {
        console.log(req.body);
        let chatRoom =  await chatRoomService.createChatRoom(req.body.name, req.user._id);
        console.log(chatRoom);
        res.send(chatRoom);
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

const getAllChatRoom = async (req, res) => {
    try {
        let chatRooms =  await chatRoomService.getAllChatRoom();
        res.send(chatRooms);
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

const getChatRoomById = async (req, res) => {
    try {
        let chatRoom =  await chatRoomService.getChatRoomById(req.params._id, req.user);
        
        res.render('chatroom', { 
            'chatroom': chatRoom,
            'token': req.headers.authorization
        });
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

module.exports = { createChatroom, getAllChatRoom, getChatRoomById };