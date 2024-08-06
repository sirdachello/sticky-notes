"use strict";

let addButton = document.getElementById(`add-note`);

addButton.addEventListener(`click`, createNote);


(function buildTable() {
  let notesList = localStorage.getItem(`notes`);

  let notes = [];

  if (notesList === null) {
    localStorage.setItem(`notes`, JSON.stringify(notes));
  } else {
    let array = JSON.parse(localStorage.getItem(`notes`));
    array.forEach((obj, index) => {
      let note = document.createElement(`li`);
      note.classList.add(`note-item`);

      let textarea = document.createElement(`textarea`);
      textarea.setAttribute(`id`, index);
      textarea.textContent = obj.content;

      textarea.addEventListener(`input`, editElemLocalStorage);

      let removeButton = createRemoveButton();
      removeButton.addEventListener(`click`, removeElemRedactLocalStorage);

      appendChildren(note, [textarea, removeButton]);
    });
  }
})();



function createNote() {
  let note = document.createElement(`li`);
  note.classList.add(`note-item`);

  let textarea = createTextarea();
  textarea.addEventListener(`input`, editElemLocalStorage);

  let removeButton = createRemoveButton();
  removeButton.addEventListener(`click`, removeElemRedactLocalStorage);

  appendChildren(note, [textarea, removeButton]);

  handleLocalStorage();
}


// Helper Functions

function appendChildren(parent, children) {
  children.forEach((child) => parent.appendChild(child));

  document.querySelector(`.add-note`).parentElement.insertAdjacentElement("beforebegin", parent);
}

function handleLocalStorage() {
  let currentLocalStorage = JSON.parse(localStorage.getItem(`notes`));
  let newEntry = {
    id: JSON.parse(localStorage.getItem(`notes`)).length,
    content: ``,
  };
  currentLocalStorage.push(newEntry);
  localStorage.setItem(`notes`, JSON.stringify(currentLocalStorage));
}

function createTextarea() {
  let textarea = document.createElement(`textarea`);
  textarea.setAttribute(`id`, JSON.parse(localStorage.getItem(`notes`)).length);
  return textarea;
}

function editElemLocalStorage() {
  let content = this.value;
  let array = JSON.parse(localStorage.getItem(`notes`));
  let object = array[this.getAttribute(`id`)];
  object.content = content;
  localStorage.setItem(`notes`, JSON.stringify(array));
}

function createRemoveButton() {
  let removeButton = document.createElement(`button`);
  removeButton.classList.add(`remove-note`);
  removeButton.classList.add(`button`);
  removeButton.setAttribute(`type`, `button`);
  removeButton.textContent = `X`;
  return removeButton;
}

function removeElemRedactLocalStorage() {
  // remove localStorage Entry
  let index = this.previousElementSibling.getAttribute(`id`);
  let arr = JSON.parse(localStorage.getItem(`notes`));
  arr.splice(index, 1);
  // adjust ID is localStorage
  arr.forEach((obj, index) => (obj.id = index));
  localStorage.setItem(`notes`, JSON.stringify(arr));

  // remove parent
  this.parentElement.remove();

  // adjust ID is HTML
  let elements = document.querySelectorAll(`.note-item>textarea`);
  elements.forEach((textarea, index) => textarea.setAttribute(`id`, index));
}

// visual for rotation
addButton.addEventListener('click', () => {
    addButton.classList.add(`rotating`);
    setTimeout(() => {
        addButton.classList.remove(`rotating`);
    }, 300);
});