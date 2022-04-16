function numberButtonListener() {
    const buttons = document.querySelectorAll(".number-button");
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
           const numValue = getDataAttribute(button);
        })
    })
}

function getDataAttribute(button) {
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
    counter++;
}

function displayInput(newInput) {
   const text = document.querySelector(".input");
   text.textContent = newInput;
}

numberButtonListener();

let arr1 = [];
let arr2 = [];
let arr3 = [];
let counter = 0;
const decimalDisabled = false;