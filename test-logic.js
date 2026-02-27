const taskService = require('./src/services/TaskService');

try {
    console.log('Probando creación de tarea...');
    const task = taskService.createTask('Test Task', 'Employee 1');
    console.log('Tarea creada:', task);
    
    console.log('Probando backlog...');
    const backlog = taskService.getBacklog();
    console.log('Backlog size:', backlog.length);
    
    console.log('¡Prueba exitosa!');
} catch (err) {
    console.error('Error en la lógica:', err);
    process.exit(1);
}
