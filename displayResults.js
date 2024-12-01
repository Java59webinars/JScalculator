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