const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTask");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.style.textDecoration = task.done ? "line-through" : "none";

        li.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑️";
        delBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
        });

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;
    tasks.push({ text: input.value, done: false });
    input.value = "";
    saveTasks();
});

renderTasks();
