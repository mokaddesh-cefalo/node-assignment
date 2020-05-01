const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: { type: String, required: true },
    type: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;