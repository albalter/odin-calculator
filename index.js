function add (a, b) {
	return a + b;
};

function subtract (a, b) {
	return b-a
};

function multiply (a, b) {
    return a*b
};

function divide (a, b) {
    if (a !== 0) 
        return b/a
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
//stack[3] expression w. equailty symbol
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
        //inputField.value = digit + inputField.value;        
        inputField.value = inputField.value + digit;
    }
}

function updateStackTrace() {
    stackTrace.textContent = ""
    //console.log(stack.length)
    switch (stack.length) {
        case 2:
            stackTrace.textContent = `${stack[0]} ${stack[1]}`
            break;
        case 3:
            stackTrace.textContent = `${stack[0]} ${stack[1]} ${stack[2]}`
            break;
        case 4:
            stackTrace.textContent = `${stack[0]} ${stack[1]} ${stack[2]} ${stack[3]}`
            break;
    }       
}

function clearStack () {
    stack.length = 0;
}

function inputOperation (operation){
    if (operation !== '=') {
        if (stack.length == 0) {
            if (!numberInputOverwriteToggle ||
                inputField.value == "0"
            ){
                console.log(stack)
                numberInputOverwriteToggle = true;
                stack[0]=inputField.value;
                stack[1]=operation;
                updateStackTrace()
            }
        } else if (stack.length == 2 ) {
            if (!numberInputOverwriteToggle){
                numberInputOverwriteToggle = true;
                stack[1]=operation;
                computeCurrentStack();        
                updateStackTrace()
            }
        } else if (stack.length == 4) {
            if (!numberInputOverwriteToggle){
                numberInputOverwriteToggle = true;
                stack[1]=operation;
                computeCurrentStack();
                updateStackTrace();
            } else {
                stack[0]=inputField.value;
                stack[1]=operation;
                stack.length = 2;
                updateStackTrace();
            }
        }
    } else if (stack.length ==0) {
        if (!numberInputOverwriteToggle){
            numberInputOverwriteToggle = true;
            stack[0]=inputField.value;
            stack[1]=operation;
            updateStackTrace()
        }
    } else if (stack.length == 2 ) {
        if (!numberInputOverwriteToggle){
            numberInputOverwriteToggle = true;            
            stack[2]=inputField.value;
            stack[3]=operation;//equality
            computeCurrentStack();
            updateStackTrace()
        }    
    } else if (stack.length == 4 ) {
        if (!numberInputOverwriteToggle) {
            numberInputOverwriteToggle = false;
            computeCurrentStack();
            updateStackTrace()
        } else {
            stack[0] = inputField.value;
            computeCurrentStack();
            updateStackTrace()
        }
    }
 }


function updateInputField(val){
    inputField.value = val; 

}
function computeCurrentStack(){
    if (stack.length === 2)
    {   
        logStack();
        stack[0] = operate(Number(inputField.value), Number(stack[0]), stack[1])
        updateInputField(stack[0])
        numberInputOverwriteToggle = true;
    } else if (stack.length === 4)
    {   
        logStack();
        //stack[0] = inputField.value
        let result = operate(Number(stack[2]), Number(stack[0]), stack[1])
        updateInputField(result)
        numberInputOverwriteToggle = true;
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

let button2 = document.getElementById("2");
button2.addEventListener("click", ()=> {
    inputDigit(button2.id)
})

let button3 = document.getElementById("3");
button3.addEventListener("click", ()=> {
    inputDigit(button3.id)
})

let button4 = document.getElementById("4");
button4.addEventListener("click", ()=> {
    inputDigit(button4.id)
})

let button5 = document.getElementById("5");
button5.addEventListener("click", ()=> {
    inputDigit(button5.id)
})

let button6 = document.getElementById("6");
button6.addEventListener("click", ()=> {
    inputDigit(button6.id)
})

let button7 = document.getElementById("7");
button7.addEventListener("click", ()=> {
    inputDigit(button7.id)
})

let button8 = document.getElementById("8");
button8.addEventListener("click", ()=> {
    inputDigit(button8.id)
})

let button9 = document.getElementById("9");
button9.addEventListener("click", ()=> {
    inputDigit(button9.id)
})

let button0 = document.getElementById("0");
button0.addEventListener("click", ()=> {
    if (inputField.value !== "0"){
        inputDigit(button0.id)
    }    
})

let buttonC = document.getElementById("clear");
buttonC.addEventListener("click", ()=>{
    clearInputField();
    numberInputOverwriteToggle=true;
})
let ButtonCE = document.getElementById("clearStack");
ButtonCE.addEventListener("click", ()=> {
    clearInputField();
    clearStackMemory();
    numberInputOverwriteToggle=true;
})

let buttonAdd = document.getElementById("add");
buttonAdd.addEventListener("click", () =>{
    inputOperation(buttonAdd.textContent)
})

let buttonSubtract = document.getElementById("subtract");
buttonSubtract.addEventListener("click", () =>{
    inputOperation(buttonSubtract.textContent)
})

let buttonMultiply = document.getElementById("multiply");
buttonMultiply.addEventListener("click", () =>{
    inputOperation(buttonMultiply.textContent)
})

let buttonDivide = document.getElementById("divide");
buttonDivide.addEventListener("click", () =>{
    inputOperation(buttonDivide.textContent)
})

let buttonEquals = document.getElementById("evaluate");
buttonEquals.addEventListener("click", () => {
    inputOperation(buttonEquals.textContent)
})

