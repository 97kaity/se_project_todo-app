import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (item) => {
  const todo = new Todo(
    item,
    "#todo-template",
    handleCheck,
    todoCounter.updateTotal
  );
  const todoElement = todo.getView();

  return todoElement;
};

function addTodo({ name, date }) {
  const todoItem = {
    id: uuidv4(),
    name,
    date,
    completed: false,
  };
  const todoElement = renderTodo();
  section.addItem(todoElement);
  todoCounter.updateTotal(true);
}

function handleCheck(isChecked) {
  todoCounter.updateCompleted(isChecked);
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

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
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
