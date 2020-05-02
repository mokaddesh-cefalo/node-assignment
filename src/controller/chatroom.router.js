const express = require('express');

const chatRoomController = require('./chatroom.controller');

const router = express.Router();

router.post('/', chatRoomController.createChatroom);
router.get('/', chatRoomController.getAllChatRoom);
router.get('/:_id', chatRoomController.getChatRoomById);
router.post('/:_id', chatRoomController.addUserToChatRoom);
router.post('/:_id/messages', chatRoomController.insertMessage);

module.exports = router;