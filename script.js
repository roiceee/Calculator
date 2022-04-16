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
            counter = 0;
            operator = getDataAttribute(button);
            number = joinNumArray(); //convert array to number
            process(number, operator, "operation");
            arr = [];
        })
    })
}

function process(number,operator, keyword) {
    if (first) {
        display(number, operator);
        number2 = number;
        previousOperator = operator;
        first = false;
    } else if (!number) {
        const tempNum = number2;
        display(tempNum, operator);
        previousOperator = operator;
    } else if (!first) {
        number1 = number;
        result = operate(number1, number2, previousOperator);
        display(result, operator, keyword);
        number2 = result;
        if (keyword == "equals") {
            operator = "";
        }
        previousOperator = operator;
    }
}

function display(number, operator, keyword) {
    const text = document.querySelector(".partial-result");
    text.style.display = "block";
    if (keyword == "equals") {
        const text1 = document.querySelector(".input");
        number = number.toString();
        text1.textContent = `${number}`
        text.style.display = "none";
        return;
    }
    
    number = number.toString();
    text.textContent = `${number} ${operator}`;
}

function joinNumArray() {
    return parseFloat(arr.join(""));
}

//get the data key
function getDataAttribute(button) {
    return button.getAttribute("data-key"); 
}

//this will append the digits to the array
function appendArray(key) {
    preventDigitOverflow();
    arr.push(key);
    checkDecimalButton();
    displayInput();
}


//this is for displaying the num input
function displayInput() {
   const text = document.querySelector(".input");
   const input = arr.join("");
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
function disableButtons(disable,buttons) {
    if (disable) {
        buttons.forEach((button) => button.disabled = true);
        } 
    }

function deleteInput() {
    counter--;
    if (counter >= maxDigits) {
        restoreButtons();
    }
    arr.pop();
    displayInput();
    checkDecimalButton();
    if (counter < 0) {counter = 0;}
    console.log(counter);
}

//used by deleleInput() function
function restoreButtons() {
    buttons.forEach((button) => button.disabled = false);
    disable = false;
    checkDecimalButton();
}

//disables the decimal button when it is pressed
function checkDecimalButton() {
    if (arr.includes(".")) {
        decButton.disabled = true;
    } 
    if (!(arr.includes("."))) {
        decButton.disabled = false;
    }
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+": result = add(num1, num2);
        break;
        case "-": result =  subtract(num1, num2);
        break;
        case "x": result =  multiply(num1, num2);
        break;
        case "/": result =  divide(num1, num2);
        break;
        case "%": result =  modulo(num1, num2);
        break;
    }
    return result;
}

function add(num1, num2) {
    return num2 + num1;
}

function subtract(num1, num2) {
    return num2 - num1;
}

function multiply(num1, num2) {
     return num1 * num2;
    
}

function divide(num1, num2) {
    return num2 / num1;
}

function modulo(num1, num2) {
    return num2 % num1;
}

const buttons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".smaller-button.operation-button")
const deleteButton = document.querySelector("#delete-button");
const decButton = document.querySelector("#decimal-button");
const solveButton = document.querySelector(".biggest-button");
let arr = [];
let arr2 = [];
let counter = 0;
let disable = false;
let result, number, number1, number2;
let previousOperator, operator;
let first = true;
const maxDigits = 10;
numberButtonListener(buttons);
operationButtonListener(operationButtons);
deleteButton.addEventListener('click', () => deleteInput());
solveButton.addEventListener('click', () => {
    if (!first) { 
        process(number, operator, "equals");
    }
    arr = [];
})
    



//join the array to become a number
//when the operator is pressed, the calculator displays the partial result 