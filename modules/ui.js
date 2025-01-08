export function getInputValue() {
    const inputElement = document.getElementById('input');
    return inputElement.value;
}

export function clearInput() {
    const inputElement = document.getElementById('input');
    inputElement.value = '';
}


export function updateDisplay(value) {
    const inputElement = document.getElementById('input');
    inputElement.value = value;
}