// Calculator App
// Created using TOP 
// Michael Schroeder

// object to help us keep track of these values
const calculator = {
  displayValue: '0', // holds a string value that represents the input of the user or the result 
  firstOperand: null,
  waitingForSecondOperand: false, // essentially serves as a way to check if both the first operand and the operator have been inputted
  operator: null,
};

function updateDisplay() {
  // select the element with class of `calculator-screen`
  const display = document.querySelector('.calculator-screen');
  // update the value of the element with the contents of `displayValue`
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if(!target.matches('button')) {
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
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }
  updateDisplay();
});

function inputDigit(digit){
  const {displayValue, waitingForSecondOperand} = calculator;

  if (waitingForSecondOperand == true){
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue == '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand == true){
    calculator.displayValue = 0;
    calculator.waitingForSecondOperand = false;
    return;
  }
  // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }


  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator){
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator == '+'){
    return firstOperand + secondOperand;
  } else if (operator == '-'){
    return firstOperand - secondOperand;
  } else if (operator == '*'){
    return firstOperand * secondOperand;
  } else if (operator == '/'){
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}