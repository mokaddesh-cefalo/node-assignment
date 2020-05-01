const express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

const globalMiddleware = require('./controller/global')


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

app.use(globalMiddleware.addUserInfo);

app.use('/', async (req, res) => {
    console.log(req.user);
    res.send({});
});

app.use(async (err, req, res, next) => {
    console.error(err.message);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`App is listening to  ${port}`);
});