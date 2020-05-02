const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');


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
    extname: 'handlebars',

    helpers: {
        chatRoomUser: function(user) {
            return `<p>${user.name}(${user.type})</p>`;
        },
        chatRoomLogIn: function(chatRoom) {
            let button = !chatRoom.joined ? `<button onclick=joinRoom('${ chatRoom._id }')> Join </button>` :
            `<button onclick=enterRoom('${ chatRoom._id }')> Enter </button>`;
            let name = `<h1>${chatRoom.name}</h1>`;
            let description = `<h4>${chatRoom.description}</h4>`;
            let creationTime = `<h6>${chatRoom.createdDate}</h6>`;
        
            return `${name} ${description} ${creationTime} ${button}`
        },
        chatRoomMessage: function(value, options) {
            let out = "<ul>";

            for(let i = 0; i < value.length; i++) {
                out = out + "<li>" + 
                options.fn({ 
                    user_name: `${value[i].user_name}`, 
                    message: `${value[i].message} <br />` 
                }) + "</li>";
            }
            return out + "</ul>"; 
        }
    }
});

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
    let chatRooms = await chatRoomService.getAllChatRoom();

    chatRooms = chatRooms.map(room => {
        let joined = room.users.find(user => user._id === req.user._id);
        room.joined = (joined) ? true : false;
        return room;
    });

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