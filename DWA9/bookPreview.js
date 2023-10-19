/**
 * Modules for managing books and related data
 * @type {Array<book>} books - an array that contains information about the books
 * @type {Object<string>} authors - an object that contains information about the book authors
 */
import {
    books,
    authors,
} from './data.js';

/**
 * Custom element which represents a book preview.
 * @extends HTMLElement
 */
export class BookPreview extends HTMLElement {
      /**
     * This creates an instance of BookPreview.
     * @param {Object} book - The book preview bject.
     * @param {string} book.id - The book's unique ID.
     * @param {string} book.title - The book's title.
     * @param {string} book.image - The URL of the book's cover image.
     * @param {string} book.author - The author's name or ID.
     */
    constructor({id, title, image, author}) {
        super();
        this.attachShadow({ mode: 'open' });
        this.id = id;
        this.title = title;
        this.image = image;
        this.author = author;
    }

     /**
     * Lifecycle callback that is called when the element is connected to the DOM.
     */
    connectedCallback() {
      this.render();
    }

    /**
    * This renders the book preview component.
    */
    render(){
        this.shadowRoot.innerHTML = `
            <style>
            .preview {
                border-width: 0;
                width: 100%;
                font-family: Roboto, sans-serif;
                padding: 0.5rem 1rem;
                display: flex;
                align-items: center;
                cursor: pointer;
                text-align: left;
                border-radius: 8px;
                border: 1px solid rgba(var(--color-dark), 0.15);
                background: rgba(var(--color-light), 1);
              }
              
              @media (min-width: 60rem) {
                .preview {
                  padding: 1rem;
                }
              }
              
              .preview_hidden {
                display: none;
              }
              
              .preview:hover {
                background: rgba(var(--color-blue), 0.05);
              }
              
              .preview__image {
                width: 48px;
                height: 70px;
                object-fit: cover;
                background: grey;
                border-radius: 2px;
                box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
              }
              
              .preview__info {
                padding: 1rem;
              }
              
              .preview__title {
                margin: 0 0 0.5rem;
                font-weight: bold;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;  
                overflow: hidden;
                color: rgba(var(--color-dark), 0.8)
              }
              
              .preview__author {
                color: rgba(var(--color-dark), 0.4);
              }
            </style>
            <button class="preview" data-preview="${this.id}">
                <img class="preview__image" src="${this.image}" />
                <div class="preview__info">
                    <h3 class="preview__title">${this.title}</h3>
                    <div class="preview__author">${authors[this.author]}</div>
                </div>
            </button>`;
    }
}
customElements.define('book-preview', BookPreview);