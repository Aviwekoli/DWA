/**
 * A Redux-like store for managing the application state.
 * @param {function} reducer - a function that takes the current state and an action, and returns a new state.
 * @param {Object} initialState - the initial state of the store.
 * @returns {Object} an object with methods to access and update the store.
 */
export const createStore = (reducer, initialState) => {
    let state = initialState;
    const subscribers = [];

     /**
     * Gets the current state of the store.
     * @returns {Object} the current state of the store.
     */
    const getState = () => {
        return state;
    }

     /**
     * Dispatches an action to update the store's state.
     * @param {Object} action - an action object that describes the state update.
     */
    const dispatch = (action) => {
        state = reducer(state, action);
        notifySubscribers();
    }

    /**
     * Subscribe to store changes and provide a callback function to be called when the state changes.
     * @param {function} subscriber - a callback function to be invoked when the state changes.
     */
    const subscribe = (subscriber) => {
        subscribers.push(subscriber);
    }
 
    /**
     * Notify all subscribers that the state has changed.
     */
    const notifySubscribers = () => {
        subscribers.forEach(subscriber => subscriber());
    }

    return { getState, dispatch, subscribe };
}
