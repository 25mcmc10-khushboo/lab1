var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "PENDING";
    TaskStatus["COMPLETED"] = "COMPLETED";
})(TaskStatus || (TaskStatus = {}));

var Task = /** @class */ (function () {
    function Task(id, text, dueDate) {
        this.id = id;
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.PENDING;
        this.meta = [id, new Date().toDateString()];
    }
    Task.prototype.toggleStatus = function () {
        this.status =
            this.status === TaskStatus.PENDING
                ? TaskStatus.COMPLETED
                : TaskStatus.PENDING;
    };
    Task.prototype.isCompleted = function () {
        return this.status === TaskStatus.COMPLETED;
    };
    return Task;
}());

var tasks = [];
var taskId = 1;
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var dueDateInput = document.getElementById("dueDate");
    if (!taskInput || !dueDateInput || !taskInput.value || !dueDateInput.value) {
        alert("Please enter task and due date");
        return;
    }
    var newTask = new Task(taskId++, taskInput.value, new Date(dueDateInput.value));
    tasks.push(newTask);
    sortTasks();
    displayTasks(tasks);
    taskInput.value = "";
    dueDateInput.value = "";
}

function sortTasks() {
    tasks.sort(function (a, b) { return a.dueDate.getTime() - b.dueDate.getTime(); });
}

function displayTasks(taskArray) {
    var taskList = document.getElementById("taskList");
    if (!taskList)
        return;
    taskList.innerHTML = "";
    taskArray.forEach(function (task) {
        var li = document.createElement("li");
        var leftDiv = document.createElement("div");
        leftDiv.className = "task-left";
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.isCompleted();
        checkbox.onchange = function () { return toggleComplete(task.id); };
        var span = document.createElement("span");
        span.textContent = "".concat(task.text, " (Due: ").concat(task.dueDate.toDateString(), ")");
        if (task.isCompleted()) {
            span.classList.add("completed");
        }
        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = function () { return deleteTask(task.id); };
        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].toggleStatus();
            break;
        }
    }
    displayTasks(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    displayTasks(tasks);
}

function filterTasks(type) {
    if (type === "completed") {
        displayTasks(tasks.filter(function (task) { return task.isCompleted(); }));
    }
    else if (type === "pending") {
        displayTasks(tasks.filter(function (task) { return !task.isCompleted(); }));
    }
    else {
        displayTasks(tasks);
    }
}
