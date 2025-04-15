// Import the calculate function from the external module
import { calculate } from './perform-calculations.js';

// Define the calculator object to store the state of the calculator
const calculator = {
  displayValue: '0', // Current value displayed on the screen
  firstOperand: null, // First operand for the calculation
  waitingForSecondOperand: false, // Flag to indicate if the second operand is awaited
  operator: null, // Current operator
};

// Function to handle digit input
const inputDigit = (digit) => {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand) {
    calculator.displayValue = digit; // Replace display value if waiting for the second operand
    calculator.waitingForSecondOperand = false;
  } else {
    // Append the digit to the current display value or replace '0'
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
};

// Function to handle decimal input
const inputDecimal = (dot) => {
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = '0.'; // Start a new number with a decimal
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot; // Append the decimal point if not already present
  }
};

// Function to handle operator input
const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator; // Update the operator if waiting for the second operand
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue; // Set the first operand
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = calculate(currentValue, inputValue, operator); // Perform the calculation

    calculator.displayValue = String(result); // Update the display with the result
    calculator.firstOperand = result; // Store the result as the first operand
  }

  calculator.waitingForSecondOperand = true; // Set the flag to wait for the second operand
  calculator.operator = nextOperator; // Update the operator
};

// Function to reset the calculator to its initial state
const resetCalculator = () => {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
};

// Function to update the calculator display
const updateDisplay = () => {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue; // Update the screen with the current display value
};

// Initialize the display
updateDisplay();

// Add event listener to handle button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;

  if (!target.matches('button')) {
    return; // Ignore clicks that are not on buttons
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value); // Handle operator buttons
    updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value); // Handle decimal button
    updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    resetCalculator(); // Handle all-clear button
    updateDisplay();
    return;
  }

  inputDigit(target.value); // Handle digit buttons
  updateDisplay();
});