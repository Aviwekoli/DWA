/**
 * Creates a reducer function for managing state updates in the counter app.
 * @param {Object} initialState - The initial state of the reducer.
 * @returns {function} A reducer function that takes the current state and an action and returns a new state.
 */
export const createReducer = (initialState) => {
    return function counterReducer (state = initialState, action) {
        switch (action.type) {
            case 'INCREMENT':
                return { ...state, count: state.count + state.step };
            case 'DECREMENT':
                return { ...state, count: state.count - state.step };
            case 'RESET':
                return { ...state, count: 0 };
            case 'SET_STEP':
                return { ...state, step: action.step };
            default:
                return state;
        }
    };
}