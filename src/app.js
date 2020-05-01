const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');


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
const hbs = exphbs.create({
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: 'handlebars'
});


app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(globalMiddleware.requestLogger);

app.use(globalMiddleware.registerUser);

app.use(globalMiddleware.addUserInfoFromToken);


app.use('/chatrooms', chatRoomRouter);

app.use('/', async (req, res) => {
    let chatRooms = await chatRoomService.getAllChatRoom();
    let token = req.headers.authorization;

    res.setHeader('authorization', req.headers.authorization);
    res.render('home', { token, chatRooms });
});

app.use(async (err, req, res, next) => {
    console.error(err.message);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`App is listening to  ${port}`);
});