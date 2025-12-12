const input = document.querySelector("#input");
const addElement = document.querySelector("#add");
const tasksContainer = document.querySelector("#task-container");
const emptyMessage = document.querySelector("#empty-message");
const buttonContainer = document.querySelector("#buttonContainer");
const filterButtons = document.getElementsByClassName("filter-btn");
const taskCounter = document.querySelector("#taskCounter");

let tasks = [];
let taskId = 1;
let todoFilter = "all";

const add = () => {
  const todoText = input.value.trim();

  if (todoText === "") {
    return;
  }

  const task = {
    id: taskId,
    text: todoText,
    isComplete: false,
  };
  tasks.push(task);
  taskId++;
  clearInput();
  renderTasks();
  updateCounter();
  isAddedTasks();
};

const renderTasks = () => {
  const filteredTasks = filteredTodotasks();

  if (filteredTasks.length === 0) {
    tasksContainer.innerHTML = "";
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  let taskElementsHTML = "";
  filteredTasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskElementsHTML += taskElement;
  });

  tasksContainer.innerHTML = taskElementsHTML;
};

const createTaskElement = (task) => {
  return `
              <div class="scrollBox">
                <div class="task">
                  <div class="task__inner-box">
                    <input type="checkbox" name="checkbox" onclick="toggleCheckbox(${
                      task.id
                    })" class="task__checkbox" ${
    task.isComplete ? "checked" : ""
  } />
                    <p class="task__text ${
                      task.isComplete ? "complete" : ""
                    }">${task.text}</p>
                  </div>
                  <button class="task__delete" onclick="deleteTask(${
                    task.id
                  })">delete</button>
                </div>
              </div>`;
};

const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
  updateCounter();
  isAddedTasks();
};

const clearInput = () => {
  input.value = "";
};

const toggleCheckbox = (taskId) => {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        isComplete: !task.isComplete,
      };
    }
    return task;
  });
  renderTasks();
  updateCounter();
};

const filterTodos = (filter) => {
  for (let i = 0; i < filterButtons.length; i++) {
    const filterBtn = filterButtons[i];

    if (filterBtn.className.includes(filter)) {
      filterBtn.classList.add("toggleClass");
    } else {
      filterBtn.classList.remove("toggleClass");
    }
  }

  todoFilter = filter;
  renderTasks();
};

const filteredTodotasks = () => {
  if (todoFilter === "all") {
    return tasks;
  } else if (todoFilter === "active") {
    return tasks.filter((task) => !task.isComplete);
  } else if (todoFilter === "completed") {
    return tasks.filter((task) => task.isComplete);
  }
  return tasks;
};

const updateCounter = () => {
  const completedCount = tasks.filter((task) => task.isComplete).length;
  const totalCount = tasks.length;
  taskCounter.textContent = `${completedCount} of ${totalCount} tasks completed`;
};

const clearCompleted = () => {
  tasks = tasks.filter((task) => !task.isComplete);
  renderTasks();
  updateCounter();
};

addElement.addEventListener("click", add);

renderTasks();
updateCounter();

const isAddedTasks = () => {
  const informationCounter = document.getElementById("informationCounter");
  if (tasks.length > 0) {
    informationCounter.classList.add("inactiveInformation-active");
  } else {
    informationCounter.classList.remove("inactiveInformation-active");
  }
};

// active
// const boldId = 1;

// const persons = [
//   {
//     id: 1,
//     name: "bold",
//     isAdult: true,
//   },
//   { id: 2, name: "bold", isAdult: false },
// ];

// console.log(persons);

// const newPersons = persons.map((person) => {
//   // personii id ni boldId tai tentsuu bol isAdultiig false bolgoy
//   if (person.id === boldId) {
//     const newPerson = {
//       id: person.id,
//       name: person.name,
//       isAdult: person.isAdult === true ? false : true,
//     };

//     return newPerson;
//   } else {
//     return person;
//   }
//   // busad ni heveeree uldene
// });

// console.log(newPersons);
