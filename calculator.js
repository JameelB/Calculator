var evaluated = false; // Used to determine if the display screen needs to be cleared. Initialize to false as equation has not been evaluated yet.
var displayScreen = document.getElementById("displayScreen");

/**
 * Checks if the number already has a decimal point
 */
function numberHasDecimal() {
  var displayScreenValue = displayScreen.value;
  var number = displayScreenValue;
  
  for (var i = displayScreenValue.length; i > -1; i--) {
    if (isOperator(displayScreenValue[i])) {
      number = displayScreenValue.slice(i + 1, displayScreenValue.length);
      break;
    }
  }

  if (number.indexOf(".") == -1) {
    return false;
  }

  return true;
}

/**
 * Adds a number to the equation and displays it in the display screen
 * @param {string} number 
 */
function addNumberToInput(number) {
  /**
   * When the equation has just been evaluated, clear the display screen before adding
   * a new number
   */
  if (evaluated == true) {
    displayScreen.value = "";
    evaluated = false;
  }

  // Add number to the display screen. If the number already is a decimal, ignore adding another '.' to ensure that is a valid number 
  if (number != "." || (number == "." && !numberHasDecimal())) {
    displayScreen.value += number;
  }
}

/**
 * Resets the display screen to an empty string
 */
function clearDisplayScreen() {
  displayScreen.value = "";
  evaluated = false;
}

/**
 * Adds an operator to the equation and displays it in the display screen
 * @param {string} operator 
 */
function operatorInput(operator) {
  /**
   * Reset the evaluated variable to false when a new operator is added.
   * In this case, the display screen should not be cleared and a new equation should be created with the previous
   * number displayed (answer from the previous equation)
   */
  if (evaluated == true) {
    evaluated = false;
  }

  // Ensure that we don't add another operator if the last value in the equation is already an operator to ensure a valid equation.
  if (!isOperator(getLastValue())) {
    displayScreen.value += operator;
  }
}

function calculate() {
  // Ensure that the equation doesn't evaluate if the last value of the equation is an operator to ensure a valid equation is evaluated.
  if (!isOperator(getLastValue())) {
    evaluated = true;
    displayScreen.value = eval(displayScreen.value);
  }
}

/**
 * Checks if the value is an operator
 * @param {string} operator 
 */
function isOperator(operator) {
  var operators = ['+', '-', '/', '*']

  for (var i = 0; i < operators.length; i++) {
    if (operator == operators[i]) {
      return true;
    }
  }
}

/**
 * Gets the last value of the equation
 */
function getLastValue() {
  return displayScreen.value.slice(-1);
}