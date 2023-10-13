import { books } from './data.js';

class ActiveOverlay extends HTMLElement {

    constructor() {
        super();
        this.attachShadow( { mode: 'open'});
        this.activeBook = null;
    }

    connectedCallback() {
        this.render();
    }
    
    set setBook() {
        return {
            for (const node of pathArray) {
                if (active) break
        
                if (node?.dataset?.preview) {
                    let result = null
            
                    for (const singleBook of books) {
                        if (result) break;
                        if (singleBook.id === node?.dataset?.preview) result = singleBook
                    } 
                
                    active = result
                }
            }        
        }
    }

    get getBook ()
    

    render() {
        this.shadowRoot.innerHTML = `
            <style>
            </style>
            
            <dialog class="overlay" data-list-active>
            <div class="overlay__preview"><img class="overlay__blur" data-list-blur src=""/><img class="overlay__image" data-list-image src=""/></div>
            <div class="overlay__content">
            <h3 class="overlay__title" data-list-title></h3>
            <div class="overlay__data" data-list-subtitle></div>
            <p class="overlay__data overlay__data_secondary" data-list-description></p>
            </div>

            <div class="overlay__row">
            <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
            </div>
        </dialog>
        `;
    }

}