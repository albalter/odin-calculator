function add (a, b) {
	return a + b;
};

function subtract (a, b) {
	return a - b
};

function multiply (a, b) {
    return a*b
};

function divide (a, b) {
    if (b !== 0) 
        return a/b
}

function operate (a, b, operator) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide (a,b);
        case '=':
            return a;
    }
}

/*
Pseudocode
  store operands and operators on the calculator stack memory
  and pull them up or push them in as it is necessary
  i.e. 
  if there are no values on the stack and an operator
  button is being pushed, store current value on display in 
  the stack together with the current arithmethic operator.
  if the stack is not empty, i.e. there are values like "11" 
  and "+" stored on the stack, there is input in the fields 
  and an operator button is being pressed AGAIN, do nothing
  .If and only if the = sign is pressed, evaluate the operation 
  with values being stored on the stack, and keep the stack 
  populated. in case = is being pressed again, add current operand
  value to the accumulator (stack[0]) and display the sum in the 
  inputField.
  

  For the clear input field, the value going up the stack
  has to be considered zero.

*/

/* going over the digit buttons making sure they react to key press */
const inputField = document.getElementById("inputField");
const stackTrace = document.getElementById("stackTrace");
//stack[0] accumulator
//stack[1] operation
//stack[2] operand
const stack = []
//on TRUE -- overwrite
//on FALSE -- append
numberInputOverwriteToggle = true; 

function logStack(){
    console.log(`Stack depth: ${stack.length} ${stack[0]} ${stack[1]} ${stack[2]}`)
}

function clearInputField (){
    inputField.value = '0';
}

function inputDigit (digit){
    //console.log(`${inputField.value !== '0'}`)
    if (numberInputOverwriteToggle)
    {
        inputField.value = digit
        numberInputOverwriteToggle = false        
    } else {
        inputField.value = digit + inputField.value;        
    }
}

function updateStackTrace() {
    stackTrace.textContent = ""
    for (let i=stack.length; i>0; i--)
        stackTrace.textContent = String(stack[i])+" "+ stackTrace.textContent
}

function clearStack () {
    stack.length = 0;
}

function inputOperation (operation){
    numberInputOverwriteToggle = true;
    stack.push(inputField.value);
    stack.push(operation);
    updateStackTrace()
    /*
    if (stack.length == 1){                
        stack.push(operation);
        stack.push(inputField.value);
        logStack();
        computeStack();
        clearInputField();
    } else if (stack.length == 0) {
        stack.push(inputField.value);
        stack.push(operation);
        clearInputField();
        logStack();
    }
    */
function updateInputField(val){
    inputField.value = val; 
}

}
function computeCurrentStack(){
    if (stack.length === 2)
    {
        stack[0] = operate(stack[2], stack[0], stack[1])
        stack[1] = stack[1]
        stack[2] = stack[2]
        updateStackTrace();
        updateInputField(stack[0])
    }
}

function clearStackMemory(){
    stack.length = 0;
    stackTrace.textContent = "";    
}

let button1 = document.getElementById("1");
button1.addEventListener("click", ()=> {
    inputDigit(button1.id)
})

let buttonC = document.getElementById("clear");
buttonC.addEventListener("click", ()=>{
    clearInputField();
})
let ButtonCE = document.getElementById("clearStack");
ButtonCE.addEventListener("click", ()=> {
    clearInputField();
    clearStackMemory();
})

let buttonAdd = document.getElementById("add");
buttonAdd.addEventListener("click", () =>{
    inputOperation(buttonAdd.textContent)
})

let buttonEquals = document.getElementById("evaluate");
buttonEquals.addEventListener("click", () => {
    inputOperation(buttonEquals.textContent)
    computeCurrentStack();
})

