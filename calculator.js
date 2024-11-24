const calculator = (a,b,operationCallback)=>{
    return operationCallback(a,b);
}
const operations = {
    "+" : (a,b) => a+b,
    "-" :(a,b) => a-b,
    "*" :(a,b) => a*b,
    "/" :(a,b) => (b !== 0 ? a/b: "Division by zero is not allowed")
}
//Function to get operands from the user
const  getNumber = (message) =>{
    let num;
    while (getNumber.status !== null && (isNaN(num) || num.trim() === "")) {
        num = prompt(message);
        getNumber.status = num;
        }
    return parseFloat(num);
}

//Function to get operation from the user
const getOperation = () =>{
    let operation;
   // const validOperations =["+", "-", "*", "/", null];
    do {
        operation = prompt("Choose an operation: + (add) - (subst) * (multi) / (division) or Cancel:");
        if (operation === null){
            return operation;
        }
        if (!(operation in operations)) {
            alert(`Invalid operation ${operation}`);
        }
    }while (!(operation in operations));
    return operation;
}


//Main function
const runCalculator = () => {
    getNumber.status = undefined;
    const num1 = getNumber("Enter the first number");
    const num2 = getNumber("Enter the second number");
    const operation = getNumber.status === null? null : getOperation();
    const result = operation !== null? calculator(num1, num2, operations[operation]) :" The operation was cancelled.";

    alert(`The result is: ${result}`);
    if(confirm("Do you want to perform another operation?")){
        runCalculator();//Recursively start again
    }else{
        alert(`Thank you for using calculator`);
    }
};
runCalculator();