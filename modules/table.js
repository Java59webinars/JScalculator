export function createTable(containerId, header) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    /**
     *
     *  Create parts of table
     */
    const table = document.createElement('table');
    table.id = 'results-table';
    table.classList.add('results-table');

    const thead = document.createElement('thead');
    thead.classList.add('results-header');
    thead.appendChild(createRow(header, 'th'));

    const tbody = document.createElement('tbody');
    tbody.classList.add('results-body');

    /**
     *  Assemble the table
     */
    table.append(thead, tbody);
    container.appendChild(table);
}

export function clearTable() {
    const table = document.getElementById('results-table');
    const newTbody = document.createElement('tbody');
    table.replaceChild(newTbody, table.querySelector('tbody'));
}

export function updateTable(rowItems) {
    const table = document.getElementById('results-table');
    if (!table) {
        console.log('Table not found');
        return;
    }
    const thead = table.querySelector('thead');
    const headerCount = thead.querySelectorAll('th').length;
    if (rowItems.length !== headerCount) {
        console.log('Row items does not match table header.');
        return;
    }
    const row = createRow(rowItems);
    table.appendChild(row);
}

function createRow(items, cellType = 'td') {
    const row = document.createElement('tr');
    items.forEach(item => {
        const cell = document.createElement(cellType);
        cell.textContent = item;
        row.appendChild(cell);
    });
    return row;
}