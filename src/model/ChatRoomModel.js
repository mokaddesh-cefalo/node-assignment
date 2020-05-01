const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema ({
    name: { type: String, required: true },
    creator: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

const ChatRoomModel = mongoose.model('chatroom', chatRoomSchema);
module.exports = ChatRoomModel;