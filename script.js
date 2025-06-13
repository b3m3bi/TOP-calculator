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
const operators = ['+', '*', '-', '/'];

btnsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')){
        let clickedValue = event.target.textContent;
        detectAndExecuteInput(clickedValue);
        
    }
})


function detectAndExecuteInput(inputValue){
    if (inputValue === 'AC'){
            resetMemory();
            displayCapture.textContent = '';
            error = false;
        } else if ((inputValue === 'DEL' || inputValue ==='Backspace') && !error){
            let updatedValue = displayCapture.textContent.slice(0, -1);
            displayCapture.textContent = updatedValue;

        } else if (operators.includes(inputValue)  && !error) {

            if (displayCapture.textContent){
                // If there is any number in display...
                if (!operator){
                    // If there is not an operator in memory yet...
                    // Save number in display and operator in memory 
                    operator = inputValue;
                    num1 = displayCapture.textContent.trim();

                    displayCapture.textContent = '';
                } else {
                    // If there is already an operator in memory...
                    // Make operation in memory using number in display
                    // as second number, and display result
                    // Save result and new operator in memory
                    let resultPreviousOperaton = getResultMermoryOperation();
                    displayCapture.textContent = resultPreviousOperaton;

                    num1 = resultPreviousOperaton;
                    operator = inputValue;
                }
            } else if (inputValue === '-'){
                // If there is not any input and minus is entered the number is negativa
                displayCapture.textContent = inputValue;

            }
        } else if ((inputValue === '=' || inputValue === 'Enter')  && !error){
            if (operator && displayCapture.textContent){
                // If there was an operator and second number, operate...
                // Remove numbers and operators form memory...
                let result = getResultMermoryOperation();
                displayCapture.textContent = result;
                
                resetMemory();
    
            }
        } else if (!error) {
            if (operator && num2){
                displayCapture.textContent = '';
            } 
            // Number of digits can't be greater than 13 to avoid
            // overflow from display
            let currentDisplay = displayCapture.textContent.trim()
            if (currentDisplay.length <= 10){
                if (inputValue === '.'){
                    let numberOfPoints = (currentDisplay.split('').filter(c => c === '.')).length
                    if (numberOfPoints < 1){
                        displayCapture.textContent = currentDisplay + inputValue;
                    }
                } else {
                    displayCapture.textContent = currentDisplay + inputValue;
                }
            }
        }
}


function resetMemory(){
    num1 = '';
    num2 = '';
    operator = '';
}

function getResultMermoryOperation(){
    num2 = displayCapture.textContent.trim();
    let result = operate(operator, +num1, +num2);
    if (result === Infinity || !result){
        result = "ERROR";
        error = true;
    }
    return parseFloat(result.toFixed(3));
}

document.addEventListener("keydown", (event) => {
    let keyName = event.key; 
    const validKeyboardValues = ['1','2','3','4','5','6','7','8','9','0','-','+','*','/','.','Enter','Backspace']
    if (keyName === '/') {
        event.preventDefault();
    }
    if (validKeyboardValues.includes(keyName)){
        detectAndExecuteInput(keyName)
    }
})