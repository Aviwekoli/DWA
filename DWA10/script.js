/**
 * References to all HTML elements used in the application
 */
const incrementButton = document.querySelector('#increment');
const decrementButton = document.querySelector('#decrement');
const resetButton = document.querySelector('#reset');
const valueElement = document.querySelector('#value');
const roman = document.querySelector('.roman');

const dialog = document.querySelector('.dialog-focus');
const input = dialog.querySelector('input');
const settingsOpenButton = dialog.nextElementSibling;
const settingsApplyButton = dialog.querySelector('sl-button[slot="footer"]');

const dialogInfo = document.querySelector('.dialog-overview');
const openButtonInfo = dialogInfo.nextElementSibling;
const closeButtonInfo = dialogInfo.querySelector('sl-button[slot="footer"]');

/**
 * global variables used in the application
 * @type {Number} step - the step value used to calculate the counter value
 * @type {Number} value - value that represents the counter value
 */
let step = 1;
let value = 0;

/**
 * A function to convert the counter value to a roman figure
 * @param {Number} num - the counter value to be converted
 * @returns {String} roman string value
*/
const convertToRoman = (num) => {
    if (isNaN(num)){
        return NaN;
    } else {
    let digits = String(num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
    }
}

/**
 * A function to update the step value should a user changes the step value while using the app
 * @param {Event}
 */
const stepSetUp = (event) => {
    const inputStep = parseInt(stepInput.value, 10);
    if (!isNaN(inputStep)) {
    step = inputStep;
    }
}

/**
 * A function to increment the counter value based on the step amount
 * @param {Event}
 */
const increment = (event) => {
    value += step;
    updateValue();    
}

/**
 * A function to decrement the counter value based on the step amount
 * @param {Event}
 */
const decrement = (event) => {
    value -= step;
    updateValue();
}

/**
 * A function to reset the counter value to zero
 * @param {Event}
 */
const reset = (event) => {
    if (value !== 0){
        alert ('The counter has been reset!');
    }
    value = 0;
    step = 1;
    updateValue();
}

/**
 * A function to update the HTML value displayed on the screen
 * This function is called everytimes a user clicks the add or minus button
 * @param {Event}
 */
const updateValue = (event) => {
    valueElement.innerHTML = value;
    roman.innerHTML = convertToRoman(value)
}

/**
 * Event listeners for the the application
 */
incrementButton.addEventListener('click', () => increment());

decrementButton.addEventListener('click', () => decrement());

resetButton.addEventListener('click', (event) => reset());

openButtonInfo.addEventListener('click', (event) => dialogInfo.show());

closeButtonInfo.addEventListener('click', (event) => dialogInfo.hide());

settingsOpenButton.addEventListener('click', (event) => {
stepInput.value = '';
dialog.show();
});

settingsApplyButton.addEventListener('click', (event) => {
    stepSetUp();
    dialog.hide();
});
