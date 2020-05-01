class InValidToken extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = 401;
    }
}

class InValidData extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.code = 422;
    }
}

module.exports = { InValidToken, InValidData };