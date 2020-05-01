const express = require('express');

const globalMiddleware = require('./controller/global')

const app = express();
const port = process.env.PORT || 3000;

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