const API_URL = '/api';

async function fetchData(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        if (response.status === 204) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching:', error);
        return null;
    }
}

// BACKLOG
async function addTask() {
    const title = document.getElementById('taskTitle').value;
    const employeeName = document.getElementById('employeeName').value;
    
    if (!title) return alert('El título es requerido');
    
    const result = await fetchData('/backlog/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, employeeName })
    });

    if (result) {
        document.getElementById('taskTitle').value = '';
        document.getElementById('employeeName').value = '';
        refreshUI();
    }
}

async function deleteTask(id) {
    await fetchData(`/backlog/tasks/${id}`, { method: 'DELETE' });
    refreshUI();
}

// QUEUE
async function addToQueue(id) {
    await fetchData('/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });
    refreshUI();
}

async function processNext() {
    await fetchData('/queue', { method: 'DELETE' });
    refreshUI();
}

// UNDO
async function undoAction() {
    await fetchData('/undo', { method: 'DELETE' });
    refreshUI();
}

// REFRESH UI
async function refreshUI() {
    // 1. Get Backlog (Linked List)
    const tasks = await fetchData('/backlog/tasks');
    const backlogList = document.getElementById('backlogList');
    backlogList.innerHTML = tasks.length ? '' : '<p>No hay tareas en el backlog.</p>';
    
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.innerHTML = `
            <div class="task-info">
                <strong>${task.title}</strong>
                <span>Asignado a: ${task.employeeName}</span>
            </div>
            <div class="task-actions">
                <button class="btn-queue" onclick="addToQueue('${task.id}')">Encolar</button>
                <button class="btn-delete" onclick="deleteTask('${task.id}')">X</button>
            </div>
        `;
        backlogList.appendChild(div);
    });

    // 2. Get Last Action (Undo - Stack)
    const lastAction = await fetchData('/undo/peek');
    const lastActionText = document.getElementById('lastActionText');
    const undoBtn = document.getElementById('undoBtn');
    
    if (lastAction && lastAction.message) {
        lastActionText.innerText = `Última acción: ${lastAction.message}`;
        undoBtn.disabled = false;
    } else {
        lastActionText.innerText = 'Sin acciones recientes';
        undoBtn.disabled = true;
    }

    // 3. Get Next in Queue (Queue)
    const nextTask = await fetchData('/queue/next');
    const queueList = document.getElementById('queueList');
    const processBtn = document.getElementById('processBtn');
    
    if (nextTask && nextTask.title) {
        queueList.innerHTML = `
            <div class="task-item" style="border-left: 5px solid var(--success)">
                <div class="task-info">
                    <strong>${nextTask.title}</strong>
                    <span>En espera para: ${nextTask.employeeName}</span>
                </div>
            </div>
        `;
        processBtn.disabled = false;
    } else {
        queueList.innerHTML = '<p>La cola está vacía.</p>';
        processBtn.disabled = true;
    }
}

// Init
refreshUI();
setInterval(refreshUI, 10000); // Auto-refresh cada 10s
