let calculation = JSON.parse(localStorage.getItem('calculation')) || '';
let history = JSON.parse(localStorage.getItem('history')) || [];
let memory = 0;

function updateDisplay() {
    document.getElementById('display').value = calculation || '';
    document.querySelector('.js-calculation-result').textContent = calculation 
        ? 'Result is being calculated...' 
        : 'Enter values to calculate';

}

function appendValue(value) {
    calculation += value;
    updateDisplay();
}

function appendOperator(operator) {
    if (calculation && !isNaN(calculation[calculation.length - 1])) {
        calculation += ` ${operator} `;
        updateDisplay();
    }
}

function calculateResult() {
    try {
        let result = Function(`return ${calculation}`)().toString();
        history.push(`${calculation} = ${result}`);
        if (history.length > 10) history.shift();
        localStorage.setItem('history', JSON.stringify(history));
        updateHistory();
        calculation = result;
        document.querySelector('.js-calculation-result').textContent = `Result is ${calculation};`;
        updateDisplay();
    } catch (error) {
        alert('Invalid calculation');
        clearCalculation();
    }
    localStorage.setItem('calculation', JSON.stringify(calculation));
    document.querySelector('.js-calculation-result').textContent = `Result is: ${calculation}`;

}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = history.map(entry => `<li>${entry}</li>`).join('');
    
}

function deleteLast() {
    calculation = calculation.slice(0, -1);
    updateDisplay();
}

function clearCalculation() {
    calculation = '';
    localStorage.setItem('calculation', JSON.stringify(calculation));
    updateDisplay();
}

function memorySave() {
    memory = parseFloat(calculation) || 0;
    alert(`Memory Saved: ${memory}`);
}

function memoryRecall() {
    calculation = memory.toString();
    updateDisplay();
}
function squareRoot() {
if (calculation) {
    calculation = Math.sqrt(eval(calculation)).toString();
    updateDisplay();
    }
    document.querySelector('.js-calculation-result').textContent = `Result is: ${calculation}`;
}

function square() {
if (calculation) {
    calculation = (eval(calculation) ** 2).toString();
    updateDisplay();
    document.querySelector('.js-calculation-result').textContent = `Result is: ${calculation}`;
}
}

function power() {
    calculation += " ** ";
    updateDisplay();

}

function factorial() {
    let num = parseInt(calculation);
    if (num < 0) {
        alert("Factorial is not defined for negative numbers.");
        return;
    }
    let fact = 1;
    for (let i = 1; i <= num; i++) {
        fact *= i;
    }
    calculation = fact.toString();
    updateDisplay();
    document.querySelector('.js-calculation-result').textContent = `Result is: ${calculation}`;

}

updateHistory();
function clearHistory() {
history = []; 
localStorage.removeItem('history'); 
updateHistory(); 
}