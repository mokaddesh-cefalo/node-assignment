const chatRoomService = require('../service/chatroom.service');

const createChatroom = async (req, res) => {
    try {
        let chatRoom =  await chatRoomService.createChatRoom(req);
        
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
        let messages = chatRoom.messages;
        res.render('message', { 
            messages,
            layout: false
        });
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

const getAllMessage = async (req, res) => {
    try {
        let messages =  await chatRoomService.getAllMessage(req.params._id, req.user); 

        res.render('message', { messages });
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

const getAllUser = async (req, res) => {
    try {
        let users =  await chatRoomService.getAllUser(req.params._id, req.user); 

        res.render('user', { 
            users,
            layout: false 
        });
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

const addLoggedInUserToChatRoom = async (req, res) => {
    try {
        let chatRoom =  await chatRoomService.addLoggedInUserToChatRoom(req.params._id, req.user); 
        res.send(chatRoom);
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

const addQuestion =  async (req, res) => {
    try {
        let chatRoom =  await chatRoomService.addQuestion(req); 
        res.send(chatRoom);
    } catch(e) {

    }
}

const insertAnswer = async (req, res) => {
    try {
        let answers =  (await chatRoomService.insertAnswer(req.params._id, req.user, req.body.message)).answers;

        return res.render('answer', { 
            answers,
            layout: false 
        });
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

const getAllAnswer = async (req, res) => {
    try {
        let answers =  await chatRoomService.getAllAnswer(req.params._id, req.user); 

        return res.render('answer', { 
            answers,
            layout: false 
        });
    }  catch(e) {
        console.log(e);
        res.status(e.code);
        res.send({ reason: e.message });
    }
}

module.exports = { createChatroom, getAllChatRoom, getChatRoomById, 
    insertMessage, addUserToChatRoom, getAllMessage, getAllUser,
    addLoggedInUserToChatRoom, addQuestion, insertAnswer,
    getAllAnswer };