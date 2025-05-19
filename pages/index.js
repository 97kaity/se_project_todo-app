import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
//const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
//const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (item) => {
  const todo = new Todo(item, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

function addTodo({ name, date }) {
  const todoItem = {
    id: uuidv4(),
    name,
    date,
  };
  const todoElement = generateTodo(todoItem);
  section.addItem(todoElement);
}

//const openModal = (modal) => {
//modal.classList.add("popup_visible");
//};

//const closeModal = (modal) => {
//modal.classList.remove("popup_visible");
//};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

//addTodoCloseBtn.addEventListener("click", () => {
//addTodoPopup.close();
//});

//addTodoForm.addEventListener("submit", (evt) => {
// evt.preventDefault();
// const name = evt.target.name.value;
// const dateInput = evt.target.date.value;

// Create a date object and adjust for timezone
// const date = new Date(dateInput);
// date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

// const id = uuidv4();
// const values = { name, date, id };
// const todo = generateTodo(values);
// todosList.append(todo);
// addTodoPopup.close();
// newTodoValidator.resetValidation();
//});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const todoData = {
      name: inputValues.name,
      date: inputValues.date,
    };
    addTodo(todoData);
    addTodoPopup.close();
    addTodoForm.reset();
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
