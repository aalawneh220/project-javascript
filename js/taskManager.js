const createTaskHtml = (id, taskName, taskDescription, status) =>
  `<br><br><br>
  <div class="accordion  " id="accordionPanelsStayOpenExample" data-task-id=${id}>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      ${taskName}
    </h2>
        
        <div class="accordion-body">
        ${taskDescription}
        </div>
        <ul class="list-group list-group-flush">
                <li class="list-group-item status-label ${status}">
            Status:
            <span class="status ">${status}</span>
          </li>
        </ul>
   <br>
    <button class="btn btn-success done-button al ${
      status === "DONE" ? "invisible" : "visible"
    }">Done</button>
          <button type="button" class="btn btn-danger delete-button ">Delete</button>

          <button type="button" class="btn btn-primary edit-button" data-toggle="modal" data-target="#createTaskModal"id="editTaskButton">Edit</button>
        </div>
      </div>
    </div>
          
         `;

class TaskManager {
  constructor(currentId = "0") {
    this._tasks = [];
    this._currentId = currentId;
  }
  addTask(taskName, taskDescription, status = "Critical") {
    const newTask = {
      id: this._currentId++,
      taskName: taskName,
      taskDescription: taskDescription,
      status: status,
    };
    this._tasks.push(newTask);
  }

  editTask(editedTask, taskName, taskDescription, status) {
    editedTask.taskName = taskName;
    editedTask.taskDescription = taskDescription;
    editedTask.status = status;
  }

  deleteTask(taskId) {
    const newTasks = [];
    {
      for (let i = 0; i < this._tasks.length; i++) {
        let task = this._tasks[i];
        if (task.id !== taskId) {
          newTasks.push(task);
        }
      }
      this._tasks = newTasks;
    }
  }
  getTaskById(taskId) {
    let foundTask;

    for (let i = 0; i < this._tasks.length; i++) {
      const task = this._tasks[i];
      if (taskId === task.id) {
        foundTask = task;
      }
    }
    return foundTask;
  }

  render() {
    const tasksHtmlList = [];

    for (let i = 0; i < this._tasks.length; i++) {
      const newTask = this._tasks[i];

      const taskHtml = createTaskHtml(
        newTask.id,
        newTask.taskName,
        newTask.taskDescription,
        newTask.status
      );
      tasksHtmlList.push(taskHtml);
    }
    const tasksHtml = tasksHtmlList.join("\n");
    cardContainer.innerHTML = tasksHtml;
  }

  save() {
    let tasksJson = JSON.stringify(this._tasks);
    localStorage.setItem("tasks", tasksJson);
    let currentId = String(this._currentId);
    localStorage.setItem("currentId", currentId);
  }

  load() {
    if (localStorage.getItem("tasks")) {
      const tasksJson = localStorage.getItem("tasks");
      this._tasks = JSON.parse(tasksJson);
    }
    if (localStorage.getItem("currentId")) {
      const currentId = localStorage.getItem("currentId");
      this._currentId = Number(currentId);
    }
  }
}

if (typeof module != "undefined") {
  module.exports = TaskManager;
}

////////////////////////
function ddone() {
  let tasks = localStorage.getItem("tasks");
  let dTasks = JSON.parse(tasks);

  dTasks = dTasks.filter((item) => {
    return "DONE" != item.status;
  });
  localStorage.setItem("tasks", JSON.stringify(dTasks));

  window.location.reload();
}

// document.documentElement.classList = "dark-theme";

const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
  // document.body.classList.toggle("dark");
  if (document.documentElement.classList == "dark-theme") {
    document.documentElement.classList = "light-theme";
  } else {
    document.documentElement.classList = "dark-theme";
  }
});
// document.documentElement.classList = "light-theme";
function logout() {
  window.location.href = "./index.html";
}
