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
    for(let i=0; i < results.length; i++){
        const row = document.createElement("tr");
        const cells = [
            i + 1,
            results[i].a,
            results[i].b,
            results[i].operation,
            results[i].result
        ];
    //
        for(let j = 0; j < cells.length; j++){
            const td = document.createElement("td");
            td.textContent = cells[j];
            row.appendChild(td);
        }
//Add delete button
        const actionTd = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteCalculation(i, results));
        actionTd.appendChild(deleteButton);
        row.appendChild(actionTd);
        table.appendChild(row);
    }
    //Clear the container AND add table
    resultsContainer.replaceChildren(table);
}

function createTableHeaders(results, table) {
    const headerRow = document.createElement("tr");
    //Create table headers from results [0]
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

function deleteCalculation(index, results) {
    results.splice(index, 1);
    displayResultsOnPage(results);
}
