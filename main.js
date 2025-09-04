const tasks = [];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");

function handleTaskActions(e) {
  const taskItem = e.target.closest(".task-item");
  const taskIndex = +taskItem.getAttribute("task-index");
  const task = tasks[taskIndex];
  if (e.target.closest(".edit")) {
    let newTitle = prompt("Enter new task title:", task.title);
    if (newTitle === null) return;

    newTitle = newTitle.trim();

    if (!newTitle) {
      return alert("Please enter new task not empty");
    }

    const hasTask = isDuplicate({
      value: task.title,
      tasks,
      index: taskIndex,
    });

    if (hasTask) {
      alert(`Task "${task.title}" already exists!`);
      return;
    }

    task.title = newTitle;

    renderTasks();
  } else if (e.target.closest(".done")) {
    task.completed = !task.completed;
    renderTasks();
  } else if (e.target.closest(".delete")) {
    const isConfirm = confirm(`Are you sure delete "${task.title}" task ?`);

    if (isConfirm) {
      tasks.splice(taskIndex, 1);
      renderTasks();
    }
  }
}

function addTask(e) {
  e.preventDefault();
  const value = todoInput.value.trim();

  if (!value) {
    return alert("Please enter new task");
  }

  const hasTask = isDuplicate({ value, tasks });

  if (hasTask) {
    alert(`Task "${value}" already exists!`);
    return;
  }

  tasks.push({
    title: value,
    completed: false,
  });

  renderTasks();

  todoForm.reset();
}

function renderTasks() {
  if (!tasks.length) {
    taskList.innerHTML = `<li class="empty-message">No task available</li>`;

    return;
  }
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

function isDuplicate({ value, tasks, index = -1 }) {
  return tasks.some(
    (task, idx) =>
      task.title.toLowerCase() === value.toLowerCase() && index !== idx
  );
}

renderTasks();

todoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskActions);
