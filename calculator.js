const calculator = (a,b,operationCallback)=>{
    return operationCallback(a,b);
}
const add = (a,b) => a+b;
const multiply = (a,b) => a*b;
const divide = (a,b) => (b !== 0 ? a/b: "Division by zero is not allowed");
const subtract = (a,b) => a-b;

//Function to get operands from the user
const  getNumber = (message) =>{
    let num;
    do {
        num = prompt(message);
    } while (isNaN(num) || num === null || num.trim() === "");
    return parseFloat(num);
}

//Function to get operation from the user
const getOperation = () =>{
    let operation;
    const validOperations =["+", "-", "*", "/"];
    do {
        operation = prompt("Choose an operation: + (add) - (subst) * (multi) / (division):");
        if (!isInArray(validOperations, operation)) {
            alert(`Invalid operation ${operation}`);
        }
    }while (!isInArray(validOperations, operation));
    return operation;
}

//Is operation valid?
const isInArray = (array, value) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true
        }
    } return false;
};

//Main function
const runCalculator = () => {
    const num1 = getNumber("Enter the first number");
    const num2 = getNumber("Enter the second number");
    const operation = getOperation();
    let result;
    switch (operation) {
        case "+":
            result = calculator(num1, num2,add);
            break;
        case "-":
            result = calculator(num1, num2,subtract);
            break;
        case "*":
            result = calculator(num1, num2,multiply);
            break;
        case "/":
            result = calculator(num1, num2,divide);
            break;
    }
    alert(`The result is: ${result}`);
    if(confirm("Do you want to perform another operation?")){
        runCalculator();//Recursively start again
    }else{
        alert(`Thank you for using calculator`);
    }
};
runCalculator();
