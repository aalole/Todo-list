//DOM ELEMENTS
const form = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task");
const clearBtn = document.querySelector("#clear-btn");
// const submitTaskBtn = document.querySelector('.btn');
const filterInput = document.querySelector("#filter");
const collection = document.querySelector(".collection");
// const body = document.querySelector('body')
const link = document.querySelector("collection-item");

// Add addEventListeners to trigger functions
const loadEventListeners = () => {
  form.addEventListener("submit", addTask);
  collection.addEventListener("click", deleteTask);
  clearBtn.addEventListener("click", clearTasks);
  filterInput.addEventListener("keyup", filterTask);
};

// Add todos to list to the UI 
const addTask = (e) => {
  if (taskInput.value === "") {
    alert("Enter new task");
  }
//   1) create list element and add appropriate classes
  const li = document.createElement("li");
  li.className = "collection-item";
  li.innerText = taskInput.value;
  //   2) create anchor element and corresponding delete icon add appropriate classes
  const link = document.createElement("a");
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  link.className = "delete-item secondary-content";
  //   3) Append the newly created elements to the UL element
  li.appendChild(link);
  collection.appendChild(li);
//   4) clear the input value once the action fires
  taskInput.value = "";
  e.preventDefault();
};

// Deleter list items
const deleteTask = (e) => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
};
//  Clear all tasks
const clearTasks = () => {
  while (collection.firstChild) {
    collection.firstChild.remove();
  }
};
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
