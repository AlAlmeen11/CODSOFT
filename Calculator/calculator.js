document.addEventListener('DOMContentLoaded', function() {
    const currentValueElement = document.getElementById('current-value');
    const expressionElement = document.getElementById('expression');
    const buttons = document.querySelectorAll('.btn');
    
    let currentExpression = '';
    let currentValue = '0';
    let lastOperator = '';
    let resetInput = false;
    
    function updateDisplay() {
        currentValueElement.textContent = currentValue;
        expressionElement.textContent = currentExpression;
    }
    
    function clear() {
        currentValue = '0';
        currentExpression = '';
        lastOperator = '';
        resetInput = false;
        updateDisplay();
    }
    
    function handleNumber(number) {
        if (currentValue === '0' || resetInput) {
            currentValue = number;
            resetInput = false;
        } else {
            currentValue += number;
        }
        updateDisplay();
    }
    
    function handleOperator(op) {
        const displayOp = op === '×' ? '*' : op === '÷' ? '/' : op;
        
        if (resetInput && lastOperator) {
            currentExpression = currentExpression.slice(0, -1) + displayOp;
        } else {
            currentExpression += currentValue + displayOp;
            lastOperator = displayOp;
        }
        resetInput = true;
        updateDisplay();
    }
    
    function calculate() {
        try {
            const finalExpression = currentExpression + currentValue;
            const jsExpression = finalExpression.replace(/×/g, '*').replace(/÷/g, '/');
            const result = eval(jsExpression);
            
            currentValue = isFinite(result) ? result.toString() : 'Error';
            currentExpression = '';
            resetInput = true;
        } catch {
            currentValue = 'Error';
            currentExpression = '';
            resetInput = true;
        }
        updateDisplay();
    }
    
    function handleDecimal() {
        if (resetInput) {
            currentValue = '0';
            resetInput = false;
        }
        if (!currentValue.includes('.')) {
            currentValue += '.';
        }
        updateDisplay();
    }
    
    function handleBackspace() {
        if (currentValue !== '0' && !resetInput) {
            currentValue = currentValue.length === 1 || (currentValue.length === 2 && currentValue.startsWith('-')) ? '0' : currentValue.slice(0, -1);
        }
        updateDisplay();
    }
    
    function handlePercent() {
        try {
            currentValue = (parseFloat(currentValue) / 100).toString();
        } catch {
            currentValue = 'Error';
        }
        updateDisplay();
    }
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const id = button.id;
            if (id === 'clear') {
                clear();
            } else if (id === 'backspace') {
                handleBackspace();
            } else if (id === 'equal' && currentExpression) {
                calculate();
            } else if (id === 'decimal') {
                handleDecimal();
            } else if (id === 'add') {
                handleOperator('+');
            } else if (id === 'subtract') {
                handleOperator('-');
            } else if (id === 'multiply') {
                handleOperator('×');
            } else if (id === 'divide') {
                handleOperator('÷');
            } else if (id === 'percent') {
                handlePercent();
            } else {
                handleNumber(button.textContent);
            }
        });
    });
    
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (!isNaN(key)) {
            handleNumber(key);
        } else if (key === '.') {
            handleDecimal();
        } else if (key === '+') {
            handleOperator('+');
        } else if (key === '-') {
            handleOperator('-');
        } else if (key === '*') {
            handleOperator('×');
        } else if (key === '/') {
            event.preventDefault();
            handleOperator('÷');
        } else if (key === '%') {
            handlePercent();
        } else if (key === 'Enter' || key === '=') {
            if (currentExpression) {
                calculate();
            }
        } else if (key === 'Backspace') {
            handleBackspace();
        } else if (key === 'Escape') {
            clear();
        }
    });
    
    updateDisplay();
});
