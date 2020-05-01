const chatRoomService = require('../service/chatroom.service');

const createChatroom = async (req, res, next) => {
    chatRoomService.createChatroom(req.body.name, req.user._id);
    next();
}