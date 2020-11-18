// The first four functions are one for each calculator operation: add, subtract, multiply and divide.

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}


// The operate function takes an operator and 2 numbers and then calls one of the above functions on the numbers.

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return add(parseFloat(firstOperand), parseFloat(secondOperand));
        case '-':
            return subtract(parseFloat(firstOperand), parseFloat(secondOperand));
        case '*':
            return multiply(parseFloat(firstOperand), parseFloat(secondOperand));
        case '/':
            return divide(parseFloat(firstOperand), parseFloat(secondOperand));
        default:
            return secondOperand;
    }
}


function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}
  

// Functions to populate the numbers in the display.
// Objetc to keep track of the numbers and the operator
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operation: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  
    console.log(calculator);
}
  
  
function inputDecimal(dot) {

    if (calculator.waitingForSecondOperand === true) {
  
        calculator.displayValue = '0.'
  
      calculator.waitingForSecondOperand = false;
  
      return
  
    }
  
  
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
}
  

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
  
    if (operator && calculator.waitingForSecondOperand)  {
  
      calculator.operator = nextOperator;
  
      console.log(calculator);
  
      return;
  
    }
  
  
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }
  
  
  

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
  
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'all-clear':
        resetCalculator();
        break;
      default:
        // check if the key is an integer
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }
  
    updateDisplay();
  });
  