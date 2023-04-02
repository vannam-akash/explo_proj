class AppError extends Error {
    constructor(message, status) {
        super(); // Calls the constructor of Error class
        this.message = message;
        this.status = status;
    }
}

module.exports = AppError;