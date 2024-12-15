class Calculate {
   // #result;
    constructor(a, b, operationCallback) {
        this.a = a;
        this.b = b;
        this.operation = operationCallback;
    //    this.#result =  operationCallback(a, b);
        this.result =  operationCallback(a, b);
    }
    static getHeaders() {
        return ["Operand A", "Operand B", "Operation", "Result"];
    }
    // ADDED: Method to check equality
    equals(other) {
        return (
            other instanceof Calculate &&
            this.a === other.a &&
            this.b === other.b &&
            this.operation === other.operation
        );
    }
    // get result() {
    //         return this.#result;
    //     }

}
// const calculator = (a,b,operationCallback)=>{
//     return operationCallback(a,b);
// }
const results = [];
const operations = {
    "+" :(a,b) => a+b,
    "-" :(a,b) => a-b,
    "*" :(a,b) => a*b,
    "/" :(a,b) => (b !== 0 ? a/b: "Division by zero is not allowed")
}
//Function to get operands from the user
const  getNumber = (message, cancelInputMessage) =>{
    while (true) {
    const num = prompt(message);
        if (num === null) {
            throw new Error(cancelInputMessage); // Let the error propagate
        }
        if (isNaN(num) || num.trim() === "") {
            alert("Invalid input. Please enter a valid number.");
        } else {
            return parseFloat(num); // Return the parsed number
        }
    }
};

//Function to get operation from the user
const getOperation = (cancelInputMessage) =>{
     while (true) {
      const operation = prompt("Choose an operation: + (add), - (subtract), * (multiply), / (divide) or Cancel to exit:");
        if (operation === null) {
            throw new Error(cancelInputMessage); // Let the error propagate
        }
        if (!(operation in operations)) {
            alert(`Invalid operation: ${operation}. Please choose one of: +, -, *, /.`);
        } else {
            return operations[operation];
        }
    }
};

// Main function
const runCalculator = () => {
    const cancelInputMessage = "Input cancelled by the user.";
    try { // Centralized try-catch block
        const num1 = getNumber("Enter the first number", cancelInputMessage);
        const num2 = getNumber("Enter the second number", cancelInputMessage);
        const operationCallback = getOperation(cancelInputMessage);
        const calculation = new Calculate(num1, num2, operationCallback);
        if (isUnique(results, calculation)) {
            results.push(calculation);
        }  else {
            alert("This calculation already exists in the history.");
        }
        alert(`The result is: ${calculation.result}`);
    } catch (error) {
        if (error.message === cancelInputMessage) {
            alert(error.message); // Graceful handling of cancellation
        } else {
            alert(`Unexpected error: ${error.message}`); // Catch other unexpected errors
        }
    }
    if (confirm("Do you want to perform another operation?")) {
        runCalculator(); // Recursively start again
    } else {
        displayResultsOnPage(results, Calculate.getHeaders());
    }
};

function isUnique(results,calc) {
   return !results.some(c => c.equals(calc)); // CHANGED: Используем метод equals
}

runCalculator();

