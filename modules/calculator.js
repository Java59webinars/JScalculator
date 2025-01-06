export  class Calculator {
    constructor() {
        this.currentValue = 0;
        this.actions = [
                { label: '+', operation: 'add' },
                { label: '-', operation: 'subtract' },
                { label: '*', operation: 'multiply' },
                { label: '/', operation: 'divide' },
                { label: '=', operation: 'calculate' },  // Кнопка = добавлена
                { label: 'C', operation: 'reset' }
            ];
    }

    /**
     * Return actions
     */

    getActions() {
        return this.actions;
    }

    setCurrentValue(newValue) {
        this.currentValue = newValue;
    }

    add(value) {
        this.currentValue += value;
    }

   subtract(value) {
        this.currentValue -= value;
    }

    multiply(value) {
        this.currentValue *= value;
    }

    divide(value) {
        if (value === 0) {
            throw new Error('Value must be not zero');
        }
        this.currentValue /= value;
    }

    reset() {
        this.currentValue = 0;
    }

    getResult() {
        return this.currentValue;
    }

}