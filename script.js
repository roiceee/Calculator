function numberButtonListener(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (!(e.target.id == decId) && !(e.target.id == negId)) {
                if (isEqualsDisabled) {
                    enableEqualsButton();
                }
                if (isOperatorDisabled) {
                    enableOperatorButtons();
                }
            }
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
            disableEqualsButton();
            operator = getDataAttribute(button);
            number = joinNumArray(); 
            process(number, operator);
            if (!stopOperations) {
                arr = [];
                checkDecimalButton();
                displayInput();
            }      
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
        checkForNan(result);
        checkForInfinity(result);
        if (!stopOperations) {
            display(result, operator);
            number2 = result;
            previousOperator = operator;
        }
    }
}

function display(number, operator, keyword) {
    text.style.display = "block";
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
 function isInfinity(x) {
     return x === Infinity;
 }

 function checkForNan(result) {
    if (isNaN(result)) {
        disableAllButtons();
        text.textContent = ""
        text1.textContent = "Syntax Error"
        decButton.disabled = true;
        stopOperations = true;
    }
 }

 function checkForInfinity(result) {
    if (isInfinity(result)) {
        disableAllButtons();
        text.textContent = ""
        text1.textContent = "Undefined"
        decButton.disabled = true;
        stopOperations = true;
    }
 }

function getDataAttribute(button) {
    return button.getAttribute("data-key"); 
}

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

function negativeOrPositive(key) {
    if (arr.includes("-")) {
        arr.shift();
        counter-=2;
    } else {
        arr.unshift(key);
    }
}

function checkDecimalButton() {
    if (arr.includes(".")) {
        decButton.disabled = true;
    } 
    if (!(arr.includes("."))) {
        decButton.disabled = false;
    }
}

function displayInput() {
   const input = arr.join("");
   text1.textContent = input;
}


function preventDigitOverflow() {
    counter++;
    if (counter >= maxDigits) {
        disable = true;
    }
}

function disableButtons(disable,buttons) {
    if (disable) {
        buttons.forEach((button) => button.disabled = true);
        } 
    }

function restoreButtons() {
    deleteButton.disabled = false;
    enableEqualsButton();
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

function disableAllButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.disabled = true;
        if (button.id == "clear-button") {
            button.disabled = false;
        }
    })
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
    stopOperations = false;
    disableOperatorButtons();
}
const buttons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".smaller-button.operation-button")
const deleteButton = document.querySelector("#delete-button");
const negativeButton = document.querySelector("#negative-button");
const decButton = document.querySelector("#decimal-button");
const solveButton = document.querySelector(".biggest-button");
const clearButton = document.querySelector("#clear-button");
const text = document.querySelector(".partial-result");
const text1 = document.querySelector(".input");
let arr = [];
let counter = 0;
let disable = false;
let result, number, number1, number2;
let previousOperator, operator;
let first = true;
isOperatorDisabled = true;
isEqualsDisabled = false;
let stopOperations = false;
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
        arr = [];
        checkDecimalButton();
        checkForNan(result);
        checkForInfinity(result);
        if (!stopOperations) {
            display(result, operator, "equals");
            resetVariables();
        }
    }
})
clearButton.addEventListener('click', () => {clearScreen(); resetVariables();  restoreButtons();})
const decId = decButton.getAttribute("id");
const negId = negativeButton.getAttribute("id");