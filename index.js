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

/* going over the digit buttons making sure they react to key press */
const inputField = document.getElementById("inputField");
let button = document.getElementById("1");
button.addEventListener("click", ()=> {
    console.log(inputField.textContent)
    inputField.value = button.id + inputField.value
})

