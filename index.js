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
            return subtract(a,b)
        case '*':
            return multiply(a,b)
        case '/':
            return divide (a,b)
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
  and "+" sorted on the stack, there is input in the fields 
  and an operator button is being pressed AGAIN, force to 
  evaluate operation that is stored on the stack, push the 
  result in the newly emptied stack as well as the operator, 
  and clear the input field. 

  For the clear input field, the value going up the stack
  has to be considered zero.

*/

/* going over the digit buttons making sure they react to key press */
const inputField = document.getElementById("inputField");
const stackTrace = document.getElementById("stackTrace");
const stack = []

function logStack(){
    console.log(`Stack depth: ${stack.length} ${stack[0]} ${stack[1]} ${stack[2]}`)
}

function inputFieldClear (){
    inputField.value = '0';
}

function inputDigit (digit){
    //console.log(`${inputField.value !== '0'}`)
    if (inputField.value != 0)
    {
        inputField.value = digit + inputField.value;
    } else {
        inputField.value = digit
    }
}

function updateStackTrace() {
    for (let i=stack.length; i>0; i--)
        stackTrace.textContent = stack[i] + stackTrace.textContent
}

function clearStack () {
    stack.length = 0;
}

function inputOperation (operation){
    if (stack.length > 0){        
        stack.push(inputField.value);
        stack.push(operation);
        logStack();
        clearStack();
    } else {
        stack.push(inputField.value);
        stack.push(operation);
        inputFieldClear();
        logStack();
    }
}


let button1 = document.getElementById("1");
button1.addEventListener("click", ()=> {
    inputDigit(button1.id)
})

let buttonC = document.getElementById("clear");
buttonC.addEventListener("click", ()=>{
    inputFieldClear();
})

let buttonAdd = document.getElementById("add");
buttonAdd.addEventListener("click", () =>{
    inputOperation(buttonAdd.textContent)
})
