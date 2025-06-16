function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}


let num1 = '';
let num2 = '';
let operator = '';
let error = false;
let displayResult = false;

function operate(operator, num1, num2){
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

const btnsContainer = document.querySelector('.btns-container');
const displayCapture = document.querySelector('#capture');
const displayMemory = document.querySelector('#memory');

const operators = ['+', '*', '-', '/'];

btnsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')){
        let clickedValue = event.target.textContent;
        executeInput(clickedValue);
        
    }
})


function executeInput(inputValue){
    if (inputValue === 'AC'){
        clearAll();
    } else if ((inputValue === 'DEL' || inputValue ==='Backspace' || inputValue === 'Delete') && !error){
        if (displayCapture.textContent !== ''){
            let updatedValue = displayCapture.textContent.slice(0, -1);
            displayCapture.textContent = updatedValue;
        } else {
            clearAll();
        }
    } else if (operators.includes(inputValue)  && !error) {
        if (displayCapture.textContent){
            // If there is any number in display...
            if (!operator){
                // If there is not an operator in memory yet...
                // Save number in display and operator in memory 
                operator = inputValue;
                num1 = displayCapture.textContent.trim();
                displayResult = false;

                displayCapture.textContent = '';
                displayMemory.textContent = `${num1} ${operator}`;
            } else {
                // If there is already an operator in memory...
                if (!displayResult){
                    // If there is a number in display that is not a result
                    // of previous operations, make operation in memory 
                    // using number in display as second number, and display result
                    // Save result and new operator in memory
                    let resultPreviousOperaton = getResultMermoryOperation();
                    displayCapture.textContent = resultPreviousOperaton;
                    displayResult = true
                    
                    num1 = resultPreviousOperaton;
                    operator = inputValue;

                    displayCapture.textContent = '';
                    displayMemory.textContent = `${num1} ${operator}`;
                }  
            }
        } else {
            // If there is not any input update operation in memory
            operator = inputValue;
            displayMemory.textContent = `${num1} ${operator}`;
        }
    } else if (inputValue === '±') {
        let currentDisplay = displayCapture.textContent.trim()
        // If there is a number in display toggle sign...
        if (currentDisplay) {
            if (currentDisplay[0] === '-'){
                console.log('aqui')
                displayCapture.textContent = currentDisplay.slice(1);
            } else {
                displayCapture.textContent = '-' + currentDisplay;
            }
        }
    } else if ((inputValue === '=' || inputValue === 'Enter')  && !error){
        if (operator && displayCapture.textContent && !displayResult){
            // If there was an operator and second number that 
            // is not result of previos operation, operate...
            // Remove numbers and operators form memory...
            let result = getResultMermoryOperation();
            displayCapture.textContent = result;
            displayMemory.textContent = `${num1} ${operator} ${num2}`;

            displayResult = true;
                
            resetMemory();
        }
    } else if (!error) {
        if (operator && num2){
            displayCapture.textContent = '';
            num2 = '';
        } 
        // Number of digits can't be greater than 21 to avoid
        // overflow from display
        let currentDisplay = displayCapture.textContent.trim()
        if (currentDisplay.length <= 22){
            if (inputValue === '.'){
                let numberOfPoints = (currentDisplay.split('').filter(c => c === '.')).length
                if (numberOfPoints < 1){
                    displayCapture.textContent = currentDisplay + inputValue;
                    displayResult = false;
                }
            } else {
                displayCapture.textContent = currentDisplay + inputValue;
                displayResult = false;
            }
        }
    }
}

function clearAll(){
    resetMemory();
    displayCapture.textContent = '';
    displayMemory.textContent = '';
    error = false;
}

function resetMemory(){
    num1 = '';
    num2 = '';
    operator = '';
}

function getResultMermoryOperation(){
    num2 = displayCapture.textContent.trim();
    let result = operate(operator, +num1, +num2);
    if (result === Infinity || result === - Infinity || isNaN(result)){
        error = true;
        return "ERROR";
    }
    return parseFloat(result.toFixed(3));
}

document.addEventListener("keydown", (event) => {
    let keyName = event.key; 
    const validKeyboardValues = ['1','2','3','4','5','6','7','8','9','0','-','+','*','/','.','Enter','Backspace','Delete']
    if (keyName === '/') {
        event.preventDefault();
    }
    if (validKeyboardValues.includes(keyName)){
        executeInput(keyName)
    }
    if (error && (keyName === 'Backspace' || keyName === 'Delete')){
        executeInput('AC');
    }
})


const resizeFont = () => {
    if (displayCapture.textContent.trim().length <= 11 ){
        displayCapture.style.fontSize = '35pt';
    } else {
        displayCapture.style.fontSize = '20pt';
    }
}

const observer = new MutationObserver(resizeFont);

observer.observe(displayCapture, {childList: true});
