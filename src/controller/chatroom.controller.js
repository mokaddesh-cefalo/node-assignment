const chatRoomService = require('../service/chatroom.service');

const createChatroom = async (req, res) => {
    try {
        console.log(req.body);
        let chatRoom =  await chatRoomService.createChatRoom(req.body.name, req.user._id);
        
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
            'chatroom': chatRoom
        });
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

const addUserToChatRoom = async (req, res) => {
    try {
        let chatRoom =  await chatRoomService.getChatRoomById(req.params._id, req.user); 
        res.send(chatRoom);
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

const insertMessage = async (req, res) => {
    try {
        let chatRoom =  await chatRoomService.insertMessage(req.params._id, req.user, req.body.message);
        
        res.render('chatroom', { 
            'chatroom': chatRoom
        });
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

module.exports = { createChatroom, getAllChatRoom, getChatRoomById, insertMessage, addUserToChatRoom };