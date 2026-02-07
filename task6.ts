enum TaskStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED"
}

type TaskMeta = [number, string];

class Task {
    id: number;
    text: string;
    dueDate: Date;
    status: TaskStatus;
    meta: TaskMeta;

    constructor(id: number, text: string, dueDate: Date) {
        this.id = id;
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.PENDING;
        this.meta = [id, new Date().toDateString()];
    }

    toggleStatus(): void {
        this.status =
            this.status === TaskStatus.PENDING
                ? TaskStatus.COMPLETED
                : TaskStatus.PENDING;
    }

    isCompleted(): boolean {
        return this.status === TaskStatus.COMPLETED;
    }
}

let tasks: Task[] = [];
let taskId: number = 1;

// Add task
function addTask(): void {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    const dueDateInput = document.getElementById("dueDate") as HTMLInputElement;

    if (!taskInput || !dueDateInput || !taskInput.value || !dueDateInput.value) {
        alert("Please enter task and due date");
        return;
    }

    const newTask = new Task(
        taskId++,
        taskInput.value,
        new Date(dueDateInput.value)
    );

    tasks.push(newTask);
    sortTasks();
    displayTasks(tasks);

    taskInput.value = "";
    dueDateInput.value = "";
}

function sortTasks(): void {
    tasks.sort((a: Task, b: Task) => a.dueDate.getTime() - b.dueDate.getTime());
}

// Display tasks
function displayTasks(taskArray: Task[]): void {
    const taskList = document.getElementById("taskList") as HTMLUListElement;
    if (!taskList) return;
    
    taskList.innerHTML = "";

    taskArray.forEach((task: Task) => {
        const li = document.createElement("li");

        const leftDiv = document.createElement("div");
        leftDiv.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.isCompleted();
        checkbox.onchange = () => toggleComplete(task.id);

        const span = document.createElement("span");
        span.textContent = `${task.text} (Due: ${task.dueDate.toDateString()})`;

        if (task.isCompleted()) {
            span.classList.add("completed");
        }

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function toggleComplete(id: number): void {
    
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].toggleStatus();
            break;
        }
    }
    displayTasks(tasks);
}
function deleteTask(id: number): void {
    tasks = tasks.filter((task: Task) => task.id !== id);
    displayTasks(tasks);
}

function filterTasks(type: string): void {
    if (type === "completed") {
        displayTasks(tasks.filter(task => task.isCompleted()));
    } else if (type === "pending") {
        displayTasks(tasks.filter(task => !task.isCompleted()));
    } else {
        displayTasks(tasks);
    }
}