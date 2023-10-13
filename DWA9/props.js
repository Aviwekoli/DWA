import {
    genres,
    authors,
} from './data.js';
/**
 * CSS object literal that contains color values for day and night themes
 * @type {Object}
 * @property {Array<string>} day - color values for the day theme
 * @property {Array<string>} night - color value for the night theme
 */
export const css = {
    day: ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20', '255, 255, 255'],
};


/**
 * An object literal that contains references to all the HTML elements
 * referenced through the operation of the app either upon initialisation or
 * while its running (via event listeners). This ensure that all UI elements can
 * be accessed and seen in a structured manner in a single data structure.
 * @type {Object} html - Object that references HTML elements for the entire application
 */
export const html = {
    header: {
        search: document.querySelector('[data-header-search]'),
        settings: document.querySelector('[data-header-settings]'),
    },
    main: {
        mainContainer: document.querySelector('.list'),
        list: document.querySelector('[data-list-items]'),
        message: document.querySelector('[data-list-message]'),
        button: document.querySelector('[data-list-button]'),
    },
    active: {
        overlay: document.querySelector('[data-list-active]'),
        close: document.querySelector('[data-list-close]'),
        image: document.querySelector('[data-list-image]'),
        blurImage: document.querySelector('[data-list-blur]'),
        title: document.querySelector('[data-list-title]'),
        subtitle: document.querySelector('[data-list-subtitle]'),
        summary: document.querySelector('[data-list-description]'),
    },
    search: {
        overlay: document.querySelector('[data-search-overlay]'),
        form: document.querySelector('[data-search-form]'),
        title: document.querySelector('[data-search-title]'),
        genresSelect: document.querySelector('[data-search-genres]'),
        authorsSelect: document.querySelector('[data-search-authors]'),
        cancel: document.querySelector('[data-search-cancel]'),
        save: document.querySelector('[form="search"]'),
    },
    settings: {
        overlay: document.querySelector('[data-settings-overlay]'),
        form:  document.querySelector('[data-settings-form]'),
        cancel: document.querySelector('[data-settings-cancel'),
        save: document.querySelector('[form="settings"]'),
        theme: document.querySelector('[data-settings-theme]'),
    },
};
console.log(html)
/**
 * This function dynamically adds genre <select> options to the HTML DOM
 * the genres are generated from the data.js API converted into an an array,
 * that contains only it's values, not the keys.
 * This enables the user to easily search or filter books by genre.
 * @return {HTMLElement}
 */
export const genresHtmlOptions = () =>{
    const { search : { genresSelect } } = html;
    const genreHtml = document.createDocumentFragment()
    const firstGenreElement = document.createElement('option')
    firstGenreElement.value = 'any'
    firstGenreElement.innerText = 'All Genres'
    genreHtml.appendChild(firstGenreElement)

    for (const [id, name] of Object.entries(genres)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        genreHtml.appendChild(element)
    }

    genresSelect.appendChild(genreHtml)
}

/**
 * This function dynamically adds author <select> options to the HTML DOM
 * the genres are generated from the data.js API converted into an an array,
 * that contains only it's values, not the keys.
 * This enables the user to easily search or filter books by genre.
 * @return {HTMLElement}
 */
export const authorsHtmlOptions = () => {
    const { search: { authorsSelect } } = html;
    const authorsHtml = document.createDocumentFragment()
    const firstAuthorElement = document.createElement('option')
    firstAuthorElement.value = 'any'
    firstAuthorElement.innerText = 'All Authors'
    authorsHtml.appendChild(firstAuthorElement)

    for (const [id, name] of Object.entries(authors)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        authorsHtml.appendChild(element)
    }

    authorsSelect.appendChild(authorsHtml)
};
