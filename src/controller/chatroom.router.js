const express = require('express');

const chatRoomController = require('./chatroom.controller');

const router = express.Router();

router.post('/', chatRoomController.createChatroom);
router.get('/', chatRoomController.getAllChatRoom);

router.get('/:_id', chatRoomController.getChatRoomById);

router.post('/:_id/messages', chatRoomController.insertMessage);
router.get('/:_id/messages', chatRoomController.getAllMessage);

router.post('/:_id/users', chatRoomController.addLoggedInUserToChatRoom);
router.get('/:_id/users', chatRoomController.getAllUser);

module.exports = router;