export function parseInput(input) {
    if (input === '' || input === null) {
        return 0;
    }
    const number = parseFloat(input);
    if (isNaN(number)) {
        throw new Error('Invalid input. Please enter a number.');
    }

    return number;
}