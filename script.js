let calculation = JSON.parse(localStorage.getItem('calculation')) || '';

// Function to update the display
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = calculation || '';
    document.querySelector('.js-calculation-result').textContent = calculation 
        ? 'Result is being calculated...' 
        : 'Please enter some values';
}

// Function to append a number or decimal point
function appendValue(value) {
    calculation += value;
    updateDisplay();
}

// Function to append an operator
function appendOperator(operator) {
    if (calculation && !isNaN(calculation[calculation.length - 1])) {
        calculation += ` ${operator} `;
        updateDisplay();
    }
}

// Function to calculate the result
function calculateResult() {
    try {
        calculation = eval(calculation).toString(); // Use a safer approach in production
        document.querySelector('.js-calculation-result').textContent = `Result is ${calculation}`;
        const display = document.getElementById('display');
        display.value = calculation
    } catch (error) {
        alert('Invalid calculation');
        clearCalculation();
    }
    localStorage.setItem('calculation', JSON.stringify(calculation));
}

// Function to clear the calculation
function clearCalculation() {
    calculation = '';
    localStorage.setItem('calculation', JSON.stringify(calculation));
    updateDisplay();
}
