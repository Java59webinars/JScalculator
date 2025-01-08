import {Calculator}  from "./modules/calculator.js";
import {createButtons} from "./modules/buttons.js";
import { TABLE_HEADER } from './modules/constants.js';
import {createTable, clearTable, updateTable} from './modules/table.js';
import {parseInput} from "./modules/utils.js";
import {getInputValue, updateDisplay, clearInput} from "./modules/ui.js";

const calculator = new Calculator();
const calculationsSet = new Set(); //Set of results of calculations
let currentValue = 0;
let pendingOperation = null;

function executeOperation() {
    if (!pendingOperation) {
        return;
    }
    try{
        calculator.setCurrentValue(currentValue);
        const secondValue = parseInput(getInputValue());
        calculator[pendingOperation](secondValue);
        const result = calculator.getResult();
        const calculatedElement = [pendingOperation, `${currentValue}, ${secondValue}`, result];
        const elementKey = JSON.stringify(calculatedElement);
        if(!calculationsSet.has(elementKey)) {
            calculationsSet.add(elementKey);
            updateTable(calculatedElement);
        }

        currentValue = result;
        pendingOperation = null;
        updateDisplay(result)
    } catch(e){
        alert(e.message);
        clearInput();
    }
}

function processOperation(operation) {
    if (pendingOperation){
        executeOperation();
    }
    pendingOperation = operation;
    currentValue = parseInput(getInputValue) || currentValue;
}

/**
 *
 * @param {string} operation - name of operation
 */
function handleOperation(operation) {
    if (operation=== 'calculate'){
        executeOperation();
    } else if (operation==='reset') {
        calculator.reset();
        currentValue = 0;
        pendingOperation = null;
        clearTable();
        clearInput();
        calculationsSet.clear();
    } else {
        processOperation(operation);
    }
}

//Initialising
document.addEventListener("DOMContentLoaded", () => {
    console.log(calculator.getActions());
    createButtons('button-container', calculator.getActions(), (operation) => {
        handleOperation(operation);
    })
    createTable('output-container', TABLE_HEADER);
})
