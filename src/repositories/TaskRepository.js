const LinkedList = require('../utils/LinkedList');
const Stack = require('../utils/Stack');
const Queue = require('../utils/Queue');

class TaskRepository {
    constructor() {
        this.backlog = new LinkedList();
        this.undoStack = new Stack();
        this.processingQueue = new Queue();
    }

    // Backlog (LinkedList)
    addTask(task) {
        this.backlog.add(task);
    }

    getAllTasks() {
        return this.backlog.getAll();
    }

    findTask(id) {
        return this.backlog.findById(id);
    }

    removeTask(id) {
        return this.backlog.removeById(id);
    }

    // Undo (Stack)
    pushAction(action) {
        this.undoStack.push(action);
    }

    popAction() {
        return this.undoStack.pop();
    }

    peekAction() {
        return this.undoStack.peek();
    }

    // Processing (Queue)
    enqueueTask(task) {
        this.processingQueue.enqueue(task);
    }

    dequeueTask() {
        return this.processingQueue.dequeue();
    }

    peekQueue() {
        return this.processingQueue.front();
    }
}

module.exports = new TaskRepository();
