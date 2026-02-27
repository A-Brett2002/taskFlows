const taskRepository = require('../repositories/TaskRepository');
const Task = require('../models/Task');
const Action = require('../models/Action');

class TaskService {
    // BACKLOG
    createTask(title, employeeName) {
        const newTask = new Task(title, employeeName);
        taskRepository.addTask(newTask);
        taskRepository.pushAction(new Action('CREATE', `Tarea '${title}' creada para ${employeeName}`));
        return newTask;
    }

    getBacklog() {
        return taskRepository.getAllTasks();
    }

    getTaskById(id) {
        return taskRepository.findTask(id);
    }

    deleteTask(id) {
        const removed = taskRepository.removeTask(id);
        if (removed) {
            taskRepository.pushAction(new Action('DELETE', `Tarea '${removed.title}' eliminada`));
        }
        return removed;
    }

    // UNDO
    registerManualAction(type, message) {
        const action = new Action(type, message);
        taskRepository.pushAction(action);
        return action;
    }

    getLastAction() {
        return taskRepository.peekAction();
    }

    undoLastAction() {
        return taskRepository.popAction();
    }

    // QUEUE
    enqueueFromBacklog(taskId) {
        const task = taskRepository.findTask(taskId);
        if (!task) throw new Error('Task not found');
        
        taskRepository.enqueueTask(task);
        taskRepository.pushAction(new Action('ENQUEUE', `Tarea '${task.title}' enviada a cola`));
        return task;
    }

    processNextTask() {
        const task = taskRepository.dequeueTask();
        if (task) {
            taskRepository.pushAction(new Action('DEQUEUE', `Tarea '${task.title}' procesada`));
        }
        return task;
    }

    getQueueNext() {
        return taskRepository.peekQueue();
    }
}

module.exports = new TaskService();
