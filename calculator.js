
// calculation of factorial with input and output
function calculate() {
    let result; // the result of the calculation
    let resultString; // the output string to be shown
    // get input value
    let inputValue = document.getElementById("n").value;
    // check input value
    if (isNaN(inputValue) || inputValue <= 0 || inputValue >= 170) {
        // calculation impossible
        resultString = "Sorry, calculation is impossible!";
    } else {
        // calculate factorial
        result = factorialOf(inputValue);
        // generate output string
        resultString = "The factorial of " + inputValue + " is " + result;
    }
    // write result to html
    document.getElementById("resultText").innerHTML = resultString;
}
// returns the factorial n! of a given number n
function factorialOf(n) {
    let result = 1;
    // calculate n! = 2*3*4*...*n
    for (let i = 2; i<=n; i++) {
        result = result * i;
    }
    return result;
}