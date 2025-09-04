const tasks = [
  { title: "Design a website", completed: true },
  { title: "Learn JavaScript", completed: false },
  { title: "Build a Todo App", completed: true },
];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");

todoForm.onsubmit = function (e) {
  e.preventDefault();
  const value = todoInput.value.trim();
  console.log(value);
  if (!value) {
    return alert("Vui lòng nhập task");
  }

  tasks.push({
    title: value,
    completed: false,
  });

  renderTasks();

  todoForm.reset();
};

function renderTasks() {
  const html = tasks
    .map((task) => {
      return `<li class="task-item ${task.completed ? "completed" : ""}">
    <span class="task-title">${task.title}</span>
    <div class="task-action">
      <button class="task-btn edit">Edit</button>
      <button class="task-btn done">${
        task.completed ? "Mark as undone" : "Mark as done"
      }</button>
      <button class="task-btn delete">Delete</button>
    </div>
  </li>`;
    })
    .join("");

  taskList.innerHTML = html;
}

renderTasks();
