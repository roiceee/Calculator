function numberButtonListener(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            disableButtons(disable,buttons);
            const key = getDataAttribute(button);
            appendArray(key);
        })
    })
}
function operationButtonListener(operationButtons) {
    operationButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const operatorValue = getDataAttribute(button);
            joinNumArray();
        })
    })
}

//get the data key
function getDataAttribute(button) {
    return button.getAttribute("data-key"); 
}

function appendArray(key) {
    //this will append the digits to the array
    preventDigitOverflow();
    arr1.push(key);
    checkDecimalButton();
    displayInput();
}


//this is for displaying the num input
function displayInput() {
   const text = document.querySelector(".input");
   const input = arr1.join("");
   text.textContent = input;
}


//max is 8 digits
function preventDigitOverflow() {
    counter++;
    console.log(counter);
    if (counter >= maxDigits) {
        disable = true;
    }
}

//disable button when reach certain digit
function disableButtons(disable,buttons,operationButtons) {
    if (disable) {
        buttons.forEach((button) => button.disabled = true);
        } 
    }

function restoreButtons() {
    buttons.forEach((button) => button.disabled = false);
    disable = false;
    checkDecimalButton();
}

//disables the decimal button when it is pressed
function checkDecimalButton() {
    if (arr1.includes(".")) {
        decButton.disabled = true;
    } 
    if (!(arr1.includes("."))) {
        decButton.disabled = false;
    }
}
function deleteInput() {
    counter--;
    if (counter >= maxDigits) {
        restoreButtons();
    }
    arr1.pop();
    displayInput();
    checkDecimalButton();
    if (counter < 0) {counter = 0;}
    console.log(counter);
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+": add(num1, num2);
        break;
        case "-": subtract(num1, num2);
        break;
        case "*": multiply(num1, num2);
        break;
        case "/": divide(num1, num2);
        break;
        case "%": modulo(num1, num2);
        break;
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function modulo(num1, num2) {
    return num1 % num2;
}

const buttons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".smaller-button.operation-button")
const deleteButton = document.querySelector("#delete-button");
const decButton = document.querySelector("#decimal-button");
let arr1 = [];
let counter = 0;
let disable = false;
const maxDigits = 10;
numberButtonListener(buttons);
operationButtonListener(operationButtons);
deleteButton.addEventListener('click', () => deleteInput());


//enter numbers
//store the number in an array (not including operator).
//when user presses operator, the array of numbers will be joined and shown to the screen
//when the user presses another operator (while another operator is present), it changes the operator