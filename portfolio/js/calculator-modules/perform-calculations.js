// Function to perform basic arithmetic calculations
export const calculate = (firstOperand, secondOperand, operator) => {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return secondOperand !== 0 ? firstOperand / secondOperand : 'Error: Division by zero';
    default:
      return secondOperand; // Default case if the operator is not recognized
  }
};