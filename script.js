function numberButtonListener(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (isEqualsDisabled) {
                enableEqualsButton();
            }
            disableButtons(disable,buttons);
            if (isOperatorDisabled) {
                enableOperatorButtons();
            }
            const key = getDataAttribute(button);
            appendArray(key);
        })
    })
}
function operationButtonListener(operationButtons) {
    operationButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            counter = 0;
            disableEqualsButton();
            operator = getDataAttribute(button);
            number = joinNumArray(); //convert array to number
            process(number, operator);
            arr = [];
            checkDecimalButton();
            displayInput();
        })
    })
}

function process(number,operator) {
    if (first) {
        display(number, operator);
        number2 = number;
        previousOperator = operator;
        first = false;
    } else if (isNaN(number)) {
        const tempNum = number2;
        display(tempNum, operator);
        previousOperator = operator;
    } else if (!first) {
        number1 = number;
        result = operate(number1, number2, previousOperator);
        display(result, operator);
        number2 = result;
        previousOperator = operator;
    }
}

function display(number, operator, keyword) {
    text.style.display = "block";
    if (isNaN(number)) {
        text.style.display = "";
        text1.textContent = "Syntax Error";
        return;
    }
    if (keyword == "equals") {
        number = number.toString();
        text1.textContent = `${number}`
        text.textContent = "";
        return;
    }
    number = number.toString();
    text.textContent = `${number} ${operator}`;
}
function joinNumArray() {
    return parseFloat(arr.join(""));
}
function isNaN(x) {
    return x !== x;
 };

//get the data key
function getDataAttribute(button) {
    return button.getAttribute("data-key"); 
}

//this will append the digits to the array
function appendArray(key) {
    preventDigitOverflow();
    if (key == "-") {
       negativeOrPositive(key);
    } else {
        arr.push(key);
    }
    checkDecimalButton();
    displayInput();
}

//this will toggle negative or positive values 
function negativeOrPositive(key) {
    if (arr.includes("-")) {
        arr.shift();
        counter-=2;
    } else {
        arr.unshift(key);
    }
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

//this is for displaying the num input
function displayInput() {
   const input = arr.join("");
   text1.textContent = input;
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

function restoreButtons() {
    buttons.forEach((button) => button.disabled = false);
    disable = false;
    checkDecimalButton();
}

function disableOperatorButtons() {
    isOperatorDisabled = true;
    operationButtons.forEach((button) => {
        button.disabled = true;
    })
}

function enableOperatorButtons() {
    isOperatorDisabled = false;
    operationButtons.forEach((button) => {
        button.disabled = false;
    })
}

function disableEqualsButton() {
    solveButton.disabled = true;
    isEqualsDisabled = true;
}

function enableEqualsButton() {
    solveButton.disabled = false;
    isEqualsDisabled = false;
}

function clearScreen() {
    text1.textContent = "";
    text.textContent = "";
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

function resetVariables() {
    arr = [];
    result = undefined;
    number = undefined;
    number1 = undefined;
    number2 = undefined;
    previousOperator = undefined;
    operator = undefined;
    first = true;
    disable = false;
    isOperatorDisabled = true;
    isEqualsDisabled = false;
    counter = 0;
    disableOperatorButtons();
}
const buttons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".smaller-button.operation-button")
const deleteButton = document.querySelector("#delete-button");
const decButton = document.querySelector("#decimal-button");
const solveButton = document.querySelector(".biggest-button");
const clearButton = document.querySelector("#clear-button");
const text1 = document.querySelector(".input");
const text = document.querySelector(".partial-result");
let arr = [];
let counter = 0;
let disable = false;
let result, number, number1, number2;
let previousOperator, operator;
let first = true;
isOperatorDisabled = true;
isEqualsDisabled = false;
const maxDigits = 10;
numberButtonListener(buttons);
operationButtonListener(operationButtons);
disableOperatorButtons();
deleteButton.addEventListener('click', () => deleteInput());
solveButton.addEventListener('click', () => {
    if (!first) { 
        number = joinNumArray();
        number1 = number;
        result = operate(number1, number2, previousOperator);
        display(result, operator, "equals");
        resetVariables();
    }
})
clearButton.addEventListener('click', () => {clearScreen(); resetVariables();  restoreButtons();})
    

//fix multiply by 0 and divided by 0