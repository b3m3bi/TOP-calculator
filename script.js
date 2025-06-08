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
        console.log(clickedValue);

        if (clickedValue === 'AC'){
            resetMemory();
            displayCapture.textContent = '';
            error = false;
        } else if (clickedValue === 'DEL' && !error){
            let updatedValue = displayCapture.textContent.slice(0, -1);
            displayCapture.textContent = updatedValue;

        } else if (operators.includes(clickedValue)  && !error) {

            if (displayCapture.textContent){
                // If there is any number in display...
                if (!operator){
                    // If there is not an operator in memory yet...
                    // Save number in display and operator in memory 
                    operator = clickedValue;
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
                    operator = clickedValue;
                }
            }
        } else if (clickedValue === '='  && !error){
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
            if (displayCapture.textContent.trim().length <= 10){
                displayCapture.textContent = displayCapture.textContent + clickedValue;
            }
        }
    }

})


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
    return result;
}