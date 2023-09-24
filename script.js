const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let totalItemCount = 0;
let uncheckedItemCount = 0;
let todoList = [];

// Функція для оновлення відображення кількості справ
function updateCounts() {
  itemCountSpan.textContent = totalItemCount;
  uncheckedCountSpan.textContent = uncheckedItemCount;
}

// Функція для додавання справи
function newTodo() {
  const todoText = prompt('Введіть текст справи:');
  if (todoText) {
    const todoItem = {
      id: Date.now(),
      text: todoText,
      checked: false,
    };
    todoList.push(todoItem);
    saveTodoListToLocalStorage();
    renderTodoList();
  }
}

// Функція для оновлення відображення списку справ
function renderTodoList() {
  list.innerHTML = '';
  totalItemCount = 0;
  uncheckedItemCount = 0;

  todoList.forEach((todoItem) => {
    const todoItemElement = document.createElement('li');
    todoItemElement.classList.add(classNames.TODO_ITEM);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add(classNames.TODO_CHECKBOX);
    checkbox.checked = todoItem.checked;

    checkbox.addEventListener('change', function () {
      todoItem.checked = checkbox.checked;
      saveTodoListToLocalStorage();
      updateCounts();
    });

    const todoTextElement = document.createElement('span');
    todoTextElement.textContent = todoItem.text;
    todoTextElement.classList.add(classNames.TODO_TEXT);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.classList.add(classNames.TODO_DELETE);

    deleteButton.addEventListener('click', function () {
      const index = todoList.findIndex((item) => item.id === todoItem.id);
      if (index !== -1) {
        todoList.splice(index, 1);
        saveTodoListToLocalStorage();
        renderTodoList();
      }
    });

    todoItemElement.appendChild(checkbox);
    todoItemElement.appendChild(todoTextElement);
    todoItemElement.appendChild(deleteButton);

    list.appendChild(todoItemElement);

    totalItemCount++;
    if (!todoItem.checked) {
      uncheckedItemCount++;
    }
  });

  updateCounts();
}

// Функція для збереження списку справ у Local Storage
function saveTodoListToLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Функція для завантаження списку справ з Local Storage при завантаженні сторінки
function loadTodoListFromLocalStorage() {
  const storedTodoList = localStorage.getItem('todoList');
  if (storedTodoList) {
    todoList = JSON.parse(storedTodoList);
    renderTodoList();
  }
}

// Викликаємо функцію для завантаження списку справ з Local Storage
loadTodoListFromLocalStorage();
