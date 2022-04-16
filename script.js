function numberButtonListener(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            disableButtons(disable,buttons, operationButtons);
            const numValue = getDataAttribute(button);
        })
    })
}
function operationButtonListener(operationButtons) {
    operationButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            disableButtons(disable,buttons, operationButtons);
            const operatorValue = getDataAttribute(button);
        })
    })
}

function getDataAttribute(button) {
    counter++;
    console.log(counter);
    if (counter >= 20) {
        disable = true;
    }
    const key = button.getAttribute("data-key");
    if (key == ".") {
        button.disabled = true;
    }
    console.log(key);
    console.log(typeof(key));
    appendInput(key);
}

function appendInput(key) {
    arr1.push(key);
    const newInput = arr1.join("");
    displayInput(newInput);
}

function displayInput(newInput) {
   const text = document.querySelector(".input");
   text.textContent = newInput;
}

function disableButtons(disable,buttons,operationButtons) {
    if (disable) {
        buttons.forEach((button) => button.disabled = true);
        operationButtons.forEach((button) => button.disabled = true);
        } 
    }

function restoreButtons() {
    buttons.forEach((button) => button.disabled = false);
    operationButtons.forEach((button) => button.disabled = false);
    disable = false;
}

function deleteInput() {
    counter--;
    if (counter >= 20) {
        restoreButtons();
    }
    arr1.pop();
    const text = document.querySelector(".input");
    const newInput = arr1.join("");
    text.textContent = newInput;

    if (!(arr1.includes("."))) {
        const button = document.querySelector("#decimal-button");
        button.disabled = false;
    }
    if (counter < 0) {counter = 0;}
    console.log(counter);
}

const buttons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".smaller-button.operation-button")
const deleteButton = document.querySelector("#delete-button");

let arr1 = [];
let arr2 = [];
let counter = 0;
let disable = false;
numberButtonListener(buttons);
operationButtonListener(operationButtons);
deleteButton.addEventListener('click', () => deleteInput());
