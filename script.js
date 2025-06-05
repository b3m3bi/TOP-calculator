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


const a = 2
const b = 6

console.log(add(a, b))
console.log(subtract(a, b))
console.log(multiply(a, b))
console.log(divide(a, b))

let num1;
let num2;
let operator;

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

console.log(operate("+", a, b))
console.log(operate("-", a, b))
console.log(operate("*", a, b))
console.log(operate("/", a, b))