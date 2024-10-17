let currentInput = '0';
let operator = null;
let previousInput = null;
let shouldResetInput = false;

function updateDisplay() {
    const displayElement = document.getElementById('display');
    const maxLength = 50;
    const minFontSize = 15;
    const maxFontSize = 30;
    const inputLength = currentInput.length;

    const fontSize = Math.max(minFontSize, maxFontSize - (inputLength - 10) * 2); 
    displayElement.style.fontSize = `${fontSize}px`;


    displayElement.innerText = currentInput;
}


function inputDigit(digit) {
    if (currentInput.length >= 38) {
        currentInput += '0';
    } else {
        if (shouldResetInput) {
            currentInput = '' + digit;
            shouldResetInput = false;
        } else {
            currentInput = currentInput === '0' ? '' + digit : currentInput + digit;
        }
    }
    updateDisplay();
}


function inputComma() {
    if (!currentInput.includes(',')) {
        currentInput += ',';
    }
    updateDisplay();
}

function inputOperator(op) {
    if (operator !== null && !shouldResetInput) {
        calculate();
    }
    operator = op;
    previousInput = currentInput.replace(',', '.');
    shouldResetInput = true;
    updateDisplay();
}


function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    shouldResetInput = false;
    updateDisplay();
}


function calculate() {
    if (operator === null) return;

    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput.replace(',', '.'));

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                result = 'Erro';
            } else {
                result = num1 / num2;
            }
            break;
        default:
            return;
    }

    if (Math.abs(result) > 999999999 || Math.abs(result) < 0.000001) {
        currentInput = result.toExponential(2).toString().replace('.', ','); 
    } else {
        currentInput = result.toString().replace('.', ',');
    }

    operator = null;
    previousInput = null;
    shouldResetInput = true;
    updateDisplay();
}