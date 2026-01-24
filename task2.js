// Task Storage Array
let tasks = [];
let currentFilter = 'all';

// Add Task Function
function addTask() {
    const nameInput = document.getElementById('taskName');
    const dateInput = document.getElementById('taskDate');

    if (!nameInput.value || !dateInput.value) {
        alert("Please fill in both fields!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: nameInput.value,
        dueDate: new Date(dateInput.value),
        completed: false
    };

    tasks.push(newTask);
    
    // Sort logic (Objective: Requirement for due date sorting)
    tasks.sort((a, b) => a.dueDate - b.dueDate);
    
    nameInput.value = '';
    dateInput.value = '';
    render();
}

// Toggle Completed Status
function toggleComplete(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    render();
}

// Remove Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
}

// Filter Logic
function setFilter(filterType) {
    currentFilter = filterType;
    document.querySelectorAll('.filter-section button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`filter-${filterType}`).classList.add('active');
    render();
}

// DOM Manipulation: Render the list to the UI
function render() {
    const listContainer = document.getElementById('todoList');
    listContainer.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <div>
                <strong>${task.text}</strong>
                <span class="date-text">Due: ${task.dueDate.toDateString()}</span>
            </div>
            <div>
                <button class="done-btn" onclick="toggleComplete(${task.id})">✔</button>
                <button class="del-btn" onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;
        listContainer.appendChild(li);
    });
}