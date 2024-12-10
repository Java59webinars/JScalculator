function displayResultsOnPage(results){
    //Get the container where the table will be added
    const resultsContainer = document.getElementById("results");

    if (results.length === 0) {
        resultsContainer.textContent = "No results to display.";
        return;
    }

    //Create the table
    const table = document.createElement("table");
    createTableHeaders(results, table);

    //Populate the table
    results.forEach((result, index) => {
        const row = document.createElement("tr");
        rowNumerator(index, row); //add indices to the row
        cellsPopulator(result, row);// Add the data cells
        addDeleteButtonToRow(results, index, row);//Add delete button
        table.appendChild(row);
    });
    //Clear the container AND add table
    resultsContainer.replaceChildren(table);
    resultsContainer.appendChild(addButtonsBlock());
}

//Create table headers dynamically based on the first object in the array
function createTableHeaders(results, table) {
    const headerRow = document.createElement("tr");
    const headers = Object.keys(results[0]).concat(["Actions"]);
    headers.unshift("#");
    //const headers = ["#"].concat(Object.keys(results[0]), ["Actions"]);

    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    //Add the header to the table
    table.appendChild(headerRow);
}
// Add row number
function rowNumerator(index, row) {
    const indexCell = document.createElement("td");
    indexCell.textContent = index + 1;
    row.appendChild(indexCell);
}
//Populate data from result to cells
function cellsPopulator(result, row) {
    Object.values(result).forEach(value => {
        const td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
    });
}

//Add delete button
function addDeleteButtonToRow(results, index, row) {
    const actionTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteRowAndElementfromResults(results, index));
    actionTd.appendChild(deleteButton);
    row.appendChild(actionTd);
}

function deleteRowAndElementfromResults(results, index) {
    return () => {
        results.splice(index, 1); // Remove the item from the array
        displayResultsOnPage(results); // Re-render the table
    };
}

function addButtonsBlock() {
    const calculatorContainer = document.createElement("div");
    const addButton = document.createElement("button");
    addButton.id = "add-calculation";
    addButton.textContent = "Add Calculation";

    const cancelButton = document.createElement("button");
    cancelButton.id = "cancel";
    cancelButton.textContent = "Cancel";

    calculatorContainer.appendChild(addButton);
    calculatorContainer.appendChild(cancelButton);

    addButton.addEventListener("click", () => {
        runCalculator();
    });

    cancelButton.addEventListener("click", () => {
        alert("Thank you for using the calculator!");
        const resultsContainer = document.getElementById("results");
        resultsContainer.replaceChildren("Goodbye!")  ;
    });


    return calculatorContainer;
}