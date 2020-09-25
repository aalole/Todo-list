//DOM ELEMENTS
const form = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task");
const clearBtn = document.querySelector("#clear-btn");
const filterInput = document.querySelector("#filter");
const collection = document.querySelector(".collection");
const link = document.querySelector("collection-item");

// Add addEventListeners to trigger functions
const loadEventListeners = () => {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  collection.addEventListener("click", deleteTask);
  clearBtn.addEventListener("click", clearTasks);
  filterInput.addEventListener("keyup", filterTask);
};

// get tasks from LS
const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    //   2) create anchor element and corresponding delete icon add appropriate classes
    const link = document.createElement("a");
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    link.className = "delete-item secondary-content";
    //   3) Append the newly created elements to the UL element
    li.appendChild(link);
    collection.appendChild(li);
  });
};

// Add todos to list to the UI
const addTask = (e) => {
  if (taskInput.value === "") {
    alert("Enter new task");
  }
  //   1) create list element and add appropriate classes
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));
  //   2) create anchor element and corresponding delete icon add appropriate classes
  const link = document.createElement("a");
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  link.className = "delete-item secondary-content";
  //   3) Append the newly created elements to the UL element
  li.appendChild(link);
  collection.appendChild(li);
  //   4) store the input value into localStorage
  storeTasksInLocalStorage(taskInput.value);
  //   5) clear the input value once the action fires
  taskInput.value = "";
  e.preventDefault();
};

// Get tasks from localStorage
const storeTasksInLocalStorage = (task) => {
  // step1) check if there is no task in localStorage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// DOM ELEMENT CREATOR FUNCTIONS
// const domElemCreator = () => {
//   const li = document.createElement("li");
//   li.className = "collection-item";
//   li.appendChild(document.createTextNode(task));
//   //   2) create anchor element and corresponding delete icon add appropriate classes
//   const link = document.createElement("a");
//   link.innerHTML = `<i class="fa fa-remove"></i>`;
//   link.className = "delete-item secondary-content";
//   //   3) Append the newly created elements to the UL element
//   li.appendChild(link);
//   collection.appendChild(li);
// };

// remove tasks from localStorage
const removeTaskFromLocStorage = (taskItem) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// Deleter list items
const deleteTask = (e) => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocStorage(e.target.parentElement.parentElement);
    }
  }
};
//  Clear  task while tasks 
// Clear all tasks while tasks 
const clearTasks = () => {
  while (collection.firstChild) {
    collection.firstChild.remove();
  }
  clearAllFromLstorage();
};
//Clear all  task from LS
const clearAllFromLstorage = () => localStorage.clear();
//  Filter tasks
const filterTask = (e) => {
  const text = e.target.value.toLowerCase();
  const availableTasks = document.querySelectorAll(".collection-item");
  availableTasks.forEach(function (taskItem) {
    const item = taskItem.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
};

loadEventListeners();
