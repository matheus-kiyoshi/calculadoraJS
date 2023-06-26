const currentOperationText = document.querySelector('#current-operation');
const previousOperationText = document.querySelector('#previous-operation');
const buttons = document.querySelectorAll(".calculator-pad button");

class calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = '';
  }

  addDigit(digit) {
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateDisplay();

  }

    processOperation(operation) {
      if (this.currentOperationText.innerText === "" && operation !== "RESET") {
      
        if (this.previousOperationText.innerText !== "") {
          this.changeOperation(operation);
        }
        return;
      }
  
      let operationValue;
      let previous = +this.previousOperationText.innerText.split(" ")[0];
      let current = +this.currentOperationText.innerText;
  
      switch (operation) {
  
        case "+":
          operationValue = previous + current;
          this.updateDisplay(operationValue, operation, current, previous);
          break;

        case "-":
          operationValue = previous - current;
          this.updateDisplay(operationValue, operation, current, previous);
          break;

        case "*":
          operationValue = previous * current;
          this.updateDisplay(operationValue, operation, current, previous);
          break;

        case "/":
          operationValue = previous / current;
          this.updateDisplay(operationValue, operation, current, previous);
          break;

        case "DEL":
          this.processDeleteOperator();
          break;

        case "RESET":
          this.processClearOperator();

        case "=":
          this.processEqualOperator();
          break;

        default:
          return;
      }
    }
  
    updateDisplay(
      operationValue = null,
      operation = null,
      current = null,
      previous = null
    ) {
      if (operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation;
      } else {
        if (previous === 0) {
          operationValue = current;
        }
      
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
      }
    }
  
    changeOperation(operation) {
      const operadores = ["*", "-", "+", "/"];
  
      if (!operadores.includes(operation)) {
        return;
      }
  
      this.previousOperationText.innerText =
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }
  
    
    processDeleteOperator() {
      this.currentOperationText.innerText =
        this.currentOperationText.innerText.slice(0, -1);
    }
  
    processClearOperator() {
      this.currentOperationText.innerText = "";
      this.previousOperationText.innerText = "";
    }
  
    processEqualOperator() {
      let operation = this.previousOperationText.innerText.split(" ")[1];
  
      this.processOperation(operation);
    }
}

const calculadora = new calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === '.') {
      calculadora.addDigit(value);
    } else {
      calculadora.processOperation(value);
    }
  })
})