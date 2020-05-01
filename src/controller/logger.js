const requestLogger = (req, res, next) => {
    console.log(`Received a ${req.method} request from ${req.hostname}`);
    next();
}   

module.exports = {requestLogger};