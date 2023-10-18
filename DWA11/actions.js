/**
 * Action creators for the applications
 * @returns {Object} an object containing action creator functions
 */
export const createActions = () => {
    return {
        /**
         * @typedef {Object} increment - action creator for incrementing the counter.
         * @returns {Object} an action object with a type of 'INCREMENT'.
         */
        increment: () => ({ type: 'INCREMENT' }),

        /**
         * @typedef {Object} decrement - an action creator for decrementing the counter.
         * @returns {Object} an action object with a type of 'DECREMENT'.
         */
        decrement: () => ({ type: 'DECREMENT' }),

        /**
         * @typedef {Object} reset - an action creator for resetting the counter.
         * @returns {Object} An action object with a type of 'RESET'.
         */
        reset: () => ({ type: 'RESET' }),

        /**
         * @typedef {Object} setStep - an action creator for setting the step value.
         * @param {number} step - The new step value.
         * @returns {Object} an action object with a type of 'SET_STEP' and the new step value.
         */
        setStep: (step) => ({ type: 'SET_STEP', step }),
    };
}