const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


const hbs = require('./util/custom.handlebars')(__dirname);
const globalMiddleware = require('./controller/global.controller')
const chatRoomRouter = require('./controller/chatroom.router');
const chatRoomService = require('./service/chatroom.service');


mongoose.connect('mongodb://localhost/tintin', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', function(err) {
    console.error(err);
});

db.once('open', function() {
    console.log('Connected to mongoose');
});

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(globalMiddleware.requestLogger);

app.use('/logout', globalMiddleware.removeUser);

app.use(globalMiddleware.registerUser);

app.use(globalMiddleware.addUserInfoFromToken);

app.use('/chatrooms', chatRoomRouter);

app.use('/', async (req, res) => {
    let chatRooms = await chatRoomService.getAllChatRoom(req);

    res.cookie('authorization', req.cookies.authorization, { maxAge: 356 * 60 * 60 * 1000, httpOnly: true });
    res.render('home', { chatRooms });
});

app.use(async (err, req, res, next) => {
    console.error(err.message);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`App is listening to  ${port}`);
});