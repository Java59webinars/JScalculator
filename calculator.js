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
        operation = prompt("Choose an operation: + (add) - (subst) * (multi) / (division) or Cancel to exit:");
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
        alert(`Thank you for using calculator`);
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
function displayResultsOnPage(results){
    //Get the container where the table will be added
    const resultsContainer = document.getElementById("results");

    //Create the table
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    //Create table headers
    const headers = ["#", "Operand A", "Operand B", "Operation", "Result"];
    for(i=0; i < headers.length; i++){
        const th = document.createElement("th");
        th.textContent = headers[i];
        headerRow.appendChild(th);
    }

    //Add the header to the table
    table.appendChild(headerRow);

    //Populate the table
    for(i=0; i < results.length; i++){
        const row = document.createElement("tr");
        const cells = [
            i + 1,
            results[i].a,
            results[i].b,
            results[i].operation,
            results[i].result
        ];

        for(j = 0; j < cells.length; j++){
            const td = document.createElement("td");
            td.textContent = cells[j];
            row.appendChild(td);
        }

        table.appendChild(row);
    }
    //Clear the container AND add table
    resultsContainer.replaceChildren(table);
}