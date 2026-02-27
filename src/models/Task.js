const { v4: uuidv4 } = require('uuid');

class Task {
    constructor(title, employeeName) {
        this.id = uuidv4();
        this.title = title;
        this.employeeName = employeeName || 'Unassigned';
        this.createdAt = new Date();
    }
}

module.exports = Task;
