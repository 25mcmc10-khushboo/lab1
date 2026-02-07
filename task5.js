let tasks = [];
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDate");

    if (taskInput.value === "" || dueDateInput.value === "") {
        alert("Please enter task and due date");
        return;
    }

    tasks.push({
        text: taskInput.value,
        dueDate: new Date(dueDateInput.value),
        completed: false
    });

    sortTasks();
    displayTasks(tasks);

    taskInput.value = "";
    dueDateInput.value = "";
}

function sortTasks() {
    tasks.sort((a, b) => a.dueDate - b.dueDate);
}

function displayTasks(taskArray) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    taskArray.forEach((task, index) => {
        const li = document.createElement("li");

        const leftDiv = document.createElement("div");
        leftDiv.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleComplete(index);

        const span = document.createElement("span");
        span.textContent = `${task.text} (Due: ${task.dueDate.toDateString()})`;
        if (task.completed) span.classList.add("completed");

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "btn";
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks(tasks);
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks(tasks);
}

function filterTasks(type) {
    if (type === "completed") {
        displayTasks(tasks.filter(task => task.completed));
    } 
    else if (type === "pending") {
        displayTasks(tasks.filter(task => !task.completed));
    } 
    else {
        displayTasks(tasks);
    }
}
