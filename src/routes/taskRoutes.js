const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

// Backlog (Linked List)
router.post('/backlog/tasks', taskController.createTask);
router.get('/backlog/tasks', taskController.listBacklog);
router.get('/backlog/tasks/:id', taskController.getTask);
router.delete('/backlog/tasks/:id', taskController.deleteTask);

// Undo (Stack)
router.post('/undo', taskController.pushUndo);
router.get('/undo/peek', taskController.peekUndo);
router.delete('/undo', taskController.popUndo);

// Queue (Queue)
router.post('/queue', taskController.enqueue);
router.get('/queue/next', taskController.peekQueue);
router.delete('/queue', taskController.dequeue);

module.exports = router;
