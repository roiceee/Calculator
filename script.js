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
    if (counter > 20) {
        disable = true;
    }
    counter++;
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


const buttons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".smaller-button.operation-button")
let arr1 = [];
let arr2 = [];
let arr3 = [];
let counter = 0;
let disable = false;
numberButtonListener(buttons);
operationButtonListener(operationButtons);
