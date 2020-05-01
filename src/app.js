const express = require('express');

const logger = require('./controller/logger')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logger.requestLogger);

app.use('/', (req, res) => {
    res.send({message: "All I know are sad song"});
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`App is listening to  ${port}`);
});