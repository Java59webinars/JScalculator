const calculator = (a,b,operationCallback)=>{
    return operationCallback(a,b);
}
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
            return operation; // Return the valid operation
        }
    }
};

// Main function
const runCalculator = () => {
    const cancelInputMessage = "Input cancelled by the user.";
    try { // Centralized try-catch block
        const num1 = getNumber("Enter the first number", cancelInputMessage);
        const num2 = getNumber("Enter the second number", cancelInputMessage);
        const operation = getOperation(cancelInputMessage);
        const result = calculator(num1, num2, operations[operation]);
        if (isUnique(results, num1, num2, operations[operation])) {
            results.push({
                a: num1,
                b: num2,
                operation: operations[operation],
                result: result
            });
        } else {
            alert("This calculation already exists in the history.");
        }
        alert(`The result is: ${result}`);
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
        displayResultsOnPage(results);
    }
};

function isUnique(results, num1, num2, operation) {
    for (let i = 0; i < results.length; i++) {
        const item = results[i];
        if (item.a === num1 && item.b === num2 && item.operation === operation) {
            return false; // not unique
        }
    }
    return true; // unique
}
runCalculator();

