class Action {
    constructor(type, message) {
        this.type = type; // e.g., 'CREATE', 'DELETE', 'ENQUEUE'
        this.message = message;
        this.timestamp = new Date();
    }
}

module.exports = Action;
