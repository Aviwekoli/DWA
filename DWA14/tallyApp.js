import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class TallyApp extends LitElement {
    static styles = css`
    :host {
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        gap: 5rem;
      }

      h1 {
        text-align: center;
      }

      .buttons_container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    
      }

      #value {
        font-size: 170px;
      }
      button {
        background-color: rgb(10, 4, 4);
        background-color: grey;
        color: bisque;
        height: 5rem;
        width: 5rem;
        font-size: 3rem;
        border: 0.2rem solid bisque;
        border-radius: 50%;
        cursor: pointer;
      }
      .minimum, 
      .maximum {
        background-color: red;
        opacity: 0.2;
      }
    `;

    constructor(){
        super();

        /**
         * State object which contains the initial count value and countState
         * @type {Object}
         */
        this.state = {
            count: 0,
            countState: 'normal',
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this)
    }

    /**
     * This function is called when properties have been updated
     * @param {Map} changedProperties - this is map of properties that have been changed
     */
    updated(changedProperties) {
        if (changedProperties.has('state')) {
          const { count } = this.state;
          this.state.countState =
            count === -10 ? 'minimum' :
            count === 10 ? 'maximum' :
            'normal';
        }
    }

    /**
     * A getter function which indicates when the increment (add) button should be disabled
     * @type {boolean}
     */
    get incrementDisabled() { 
        return this.state.countState === 'maximum';
    }

    /**
     * A getter function which indicates when the decrement (minus) button should be disabled
     * @type {boolean}
     */
    get decrementDisabled() {
        return this.state.countState === 'minimum';
    }

    increment() {
        if (this.state.countState !== 'maximum'){
            this.state.count += 1;
            this.requestUpdate('state');
        }
    }
    
    decrement() {
        if(this.state.countState !== 'minimum'){
            this.state.count -= 1;
            this.requestUpdate('state');
        }
    }

    /**
     * Function that renders the tallyApp component
     * @returns {TemplateResult}
     */
    render() {
        return html`
            <h1>Tally App</h1>
            <div id="container">
                <span id="value">${this.state.count}</span>        
                <div class="buttons_container">
                    <button @click='${this.decrement}'
                        ?disabled=${this.decrementDisabled}
                        class="${this.state.count === -10 ? 'minimum' : '' }"> - </button> 

                    <button @click='${this.increment}'
                        ?disabled=${this.incrementDisabled}
                        class="${this.state.count === 10 ? 'maximum' : '' }"> + </button>   
                </div>
            </div>
        `;
    }
}

customElements.define('tally-app', TallyApp);