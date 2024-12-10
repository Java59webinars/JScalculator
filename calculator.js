const calculator = (a,b,operationCallback)=>{
    return operationCallback(a,b);
}
const results = [];
const operations = {
    "+" : (a,b) => a+b,
    "-" :(a,b) => a-b,
    "*" :(a,b) => a*b,
    "/" :(a,b) => (b !== 0 ? a/b: "Division by zero is not allowed")
}
//Function to get operands from the user
const  getNumber = (message) =>{
    let num;
    const cancelInputMessage =  "Input cancelled by the user."
    const invalidInput = "Invalid input. Please enter a valid number."
    while (true) { // *** Start of loop with try-catch
        try {
            num = prompt(message);
            if (num === null) {
                throw new Error(cancelInputMessage); //added e.message
            }
            if (isNaN(num) || num.trim() === "") {
                throw new Error(invalidInput); //added e.message
            }
            return parseFloat(num); // Return the parsed number
        } catch (error) {
            alert(error.message); // Notify the user of the error
            if (error.message === cancelInputMessage) return null;
        }
    }
}

//Function to get operation from the user
const getOperation = () =>{
    let operation;
   // const validOperations =["+", "-", "*", "/", null];
    const cancelInputMessage =  "Input cancelled by the user.";
        while (true) { // *** Start of loop with try-catch ***
            try {
                operation = prompt("Choose an operation: + (add), - (subtract), * (multiply), / (divide) or Cancel to exit:");
                if (operation === null) {
                    throw new Error(cancelInputMessage); //added  e.message
                }
                if (!(operation in operations)) {
                    throw new Error(`Invalid operation: ${operation}. Please choose one of: +, -, *, /.`); //added  e.message
                }
                return operation; // Return the valid operation
            } catch (error) {
                alert(error.message); // Notify the user of the error
                if (error.message === cancelInputMessage) return null;
            }

    }
    };

//Main function
const runCalculator = () => {
    let result;
    getNumber.status = undefined;
    const num1 = getNumber("Enter the first number");
    const num2 = getNumber("Enter the second number");
    const operation = getNumber.status === null? null : getOperation();
    if (operation){
         result = calculator(num1, num2, operations[operation]);
         if(isUnique(results, num1, num2, operations[operation])){
             results.push({
                 a: num1,
                 b: num2,
                 operation: operations[operation],
                 result: result
             });
         }
         else {
                 alert("This calculation already exists in the history.");
             }
         } else {
        result = " The operation was cancelled.";
    }
    alert(`The result is: ${result}`);
    if(confirm("Do you want to perform another operation?")){
        runCalculator();//Recursively start again
    }else{
    //    alert(`Thank you for using calculator`);
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

//NOT OPTIMAL
// function isUnique(results, num1, num2, operation) {
//     const duplicates = results.filter(
//         (item) => item.a === num1 && item.b === num2 && item.operation === operation
//     );
//     return duplicates.length === 0; // Если нет совпадений, операция уникальна
// }
//NOT OPTIMAL 2
// function isUnique(results, num1, num2, operation) {
//     let isUnique = true;
//     results.forEach((item) => {
//         if (item.a === num1 && item.b === num2 && item.operation === operation) {
//             isUnique = false; // Найден дубликат
//         }
//     });
//     return isUnique;
// }

runCalculator();

