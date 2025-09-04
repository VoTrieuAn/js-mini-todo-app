const tasks = [
  { title: "Design a website", completed: true },
  { title: "Learn JavaScript", completed: false },
  { title: "Build a Todo App", completed: true },
];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");

taskList.onclick = function (e) {
  const taskItem = e.target.closest(".task-item");
  const taskIndex = taskItem.getAttribute("task-index");
  const task = tasks[taskIndex];
  if (e.target.closest(".edit")) {
    const newTitle = prompt("Enter new task title:", task.title);
    task.title = newTitle;
    renderTasks();
  } else if (e.target.closest(".done")) {
    console.log("Done");
  } else if (e.target.closest(".delete")) {
    console.log("Delete");
  }
};

todoForm.onsubmit = function (e) {
  e.preventDefault();
  const value = todoInput.value.trim();
  console.log(value);
  if (!value) {
    return alert("Please enter new task");
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
    .map((task, index) => {
      return `<li task-index=${index} class="task-item ${
        task.completed ? "completed" : ""
      }">
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
