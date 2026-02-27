const taskService = require('../services/TaskService');

class TaskController {
    // BACKLOG
    createTask(req, res) {
        const { title, employeeName } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const newTask = taskService.createTask(title, employeeName);
        res.status(201).json(newTask);
    }

    listBacklog(req, res) {
        const tasks = taskService.getBacklog();
        res.status(200).json(tasks);
    }

    getTask(req, res) {
        const { id } = req.params;
        const task = taskService.getTaskById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    }

    deleteTask(req, res) {
        const { id } = req.params;
        const removed = taskService.deleteTask(id);
        if (!removed) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    }

    // UNDO
    pushUndo(req, res) {
        const { type, message } = req.body;
        if (!type || !message) {
            return res.status(400).json({ error: 'Type and message are required' });
        }
        const action = taskService.registerManualAction(type, message);
        res.status(201).json(action);
    }

    peekUndo(req, res) {
        const action = taskService.getLastAction();
        if (!action) {
            return res.status(404).json({ message: 'No actions recorded' });
        }
        res.status(200).json(action);
    }

    popUndo(req, res) {
        const action = taskService.undoLastAction();
        if (!action) {
            return res.status(404).json({ message: 'Nothing to undo' });
        }
        res.status(200).json(action);
    }

    // QUEUE
    enqueue(req, res) {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Task ID is required' });
        }
        try {
            const task = taskService.enqueueFromBacklog(id);
            res.status(201).json(task);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    peekQueue(req, res) {
        const next = taskService.getQueueNext();
        if (!next) {
            return res.status(404).json({ message: 'Queue is empty' });
        }
        res.status(200).json(next);
    }

    dequeue(req, res) {
        const task = taskService.processNextTask();
        if (!task) {
            return res.status(404).json({ message: 'Queue is empty' });
        }
        res.status(200).json(task);
    }
}

module.exports = new TaskController();
