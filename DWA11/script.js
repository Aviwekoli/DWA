import { createActions } from './actions.js';
import {createReducer} from './reducer.js';
import {createStore} from './store.js';

/**
 * The initial state of the application.
 * @type {Object}
 */
const initialState = {
    count: 0,
    step: 1,
};

/**
 * Actions object with action creator methods.
 * @type {Object}
 */
const actions = createActions();

/**
 * Reducer function for managing state updates.
 * @type {function}
 */
const reducer = createReducer(initialState);

/**
 * Redux-like store to manage the application's state.
 * @type {Object}
 */
const store = createStore(reducer, initialState);

/**
 * Function to log the state  to the console
 */
function logState() {
    console.log('State:', store.getState());
}

/**
 *  Subscribe to store changes and log the state
 */
store.subscribe(logState);

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
const openButton = dialog.nextElementSibling;
const closeButton = dialog.querySelector('sl-button[slot="footer"]');

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
    store.dispatch(actions.setStep(inputStep));
    }
}

/**
 * A function to update the HTML value displayed on the screen
 * This function is called everytimes a user clicks the add or minus button
 */
const updateValue = () => {
    roman.innerHTML = value;
    valueElement.innerHTML = convertToRoman(value)
}

/**
 * Event listeners for the the application
 */
incrementButton.addEventListener('click', (event) => {
    value += step;
    updateValue();
    store.dispatch(actions.increment());
});

decrementButton.addEventListener('click', (event) => {
    value -= step;
    updateValue();
    store.dispatch(actions.decrement());

});

resetButton.addEventListener('click', (event) => {
    if (value !== 0){
        alert('The Counter has been reset!');
    }
    value = 0;
    updateValue(); 
    store.dispatch(actions.reset());

});

closeButton.addEventListener('click', (event) => {
    stepSetUp();
    dialog.hide();

});

// Initialize the UI with the current state
store.dispatch(actions.setStep(1));

openButton.addEventListener('click', (event) => {
    stepInput.value = '';
    dialog.show();
    });
openButtonInfo.addEventListener('click', (event) => dialogInfo.show());
closeButtonInfo.addEventListener('click', (event) => dialogInfo.hide());