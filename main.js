import {Calculator}  from "./modules/calculator.js";
import {createButtons} from "./modules/buttons.js";

const calculator = new Calculator();
const calculationsSet = new Set(); //Set of results of calculations
let currentValue = 0;
let pendingOperation = null;


//Initialising
document.addEventListener("DOMContentLoaded", () => {
    console.log(calculator.getActions());
    createButtons('button-container', calculator.getActions(), null)

})
