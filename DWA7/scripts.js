/**
 * Modules for managing books and related data
 * @type {Array<book>} books - an array that contains information about the books
 * @type {Object<string>} authors - an object that contains information about the book authors
 * @type {Array<string>} genres - an object that contains information about the book genres
 * @type {number} BOOK_PER_PAGE - a value that specifies number of books per page
 */
import {
    books,
    genres,
    authors,
    BOOKS_PER_PAGE,
} from './data.js';

/**
 * CSS object literal that contains color values for day and night themes
 * @type {Object}
 * @property {Array<string>} day - color values for the day theme
 * @property {Array<string>} night - color value for the night theme
 */
const css = {
    day: ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20', '255, 255, 255'],
};

/**
 * The current page number for pagination
 * @type {number} 
 */

let page = 1;

/**
 * The array of books that is used for displaying or filtering books on the page.
 * @type {Array}
 */
let matches = books;

/**
 * An object literal that contains references to all the HTML elements
 * referenced through the operation of the app either upon initialisation or
 * while its running (via event listeners). This ensure that all UI elements can
 * be accessed and seen in a structured manner in a single data structure.
 * @type {Object} html - Object that references HTML elements for the entire application
 */
const html = {
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

/**
 * This function dynamically adds genre <select> options to the HTML DOM
 * the genres are generated from the data.js API converted into an an array,
 * that contains only it's values, not the keys.
 * This enables the user to easily search or filter books by genre.
 * @return {HTMLElement}
 */
const genresHtmlOptions = () => { 
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
const authorsHtmlOptions = () => {
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

/**
 * A function that takes a book object and creates an HTML element that only 
 * contains title, author, id, image.
 * This is used when rendering the books to be added in HTML DOM
 * @param {object} book - The book data
 * @param {string} book.id - The unique ID of the book
 * @param {string} book.title - The title of the book
 * @param {string} book.author - The author of the book
 * @param {string} book.image - The URL the book's image
 * @returns {HTMLElement} - The create preview button element
 */
const createBookPreview = ({ id, title, author, image}) => {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    return element;
}

/**
 * A function that renders books on the page 
 * @param {object} booksToShow
 * @returns {HTMLElement} 
 */
const renderPreview = (booksToShow) => {
    const { main : { list }} = html;
    const fragment = document.createDocumentFragment();

    for (const book of books.slice((page -1) * BOOKS_PER_PAGE, (page) * BOOKS_PER_PAGE)) {
        const element = createBookPreview(book);
        fragment.appendChild(element);
    }

    list.appendChild(fragment);
};

/**
 * Function that matches the theme of the web app with that of the device
 * @param {Object} html - html object that references the html
 * @param {Object} html.settings - the settings objects
 * @param {HTMLElement} theme - the theme HTML element that reperesents the theme value.
 */
const setThemePreference = ({ settings: { theme } } = html) => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.value = 'night'
        document.documentElement.style.setProperty('--color-dark', css.night[1]);
        document.documentElement.style.setProperty('--color-light', css.night[0]);
    } else {
        theme.value = 'day'
        document.documentElement.style.setProperty('--color-dark', css.day[1]);
        document.documentElement.style.setProperty('--color-light', css.day[0]);
    }
}

/**
 * Function that allows the user to toggle between light and dark mode
 * @param {Event} event - The event object.
 */
const themeToggleHandler = (event) =>{
    event.preventDefault();
    const { settings: { overlay, theme }} = html;

    if (theme.value === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

    overlay.open = false
}

/**
 * A functions that updates the book list data based on the filter results
 * @param {Array<Book>} result - an array of books that represents the search results
 */
const updateBookList = (result) => {
    const { main: { list, message },
            search: { overlay, form } } = html;
    page = 1;
    matches = result;
    
    list.innerHTML = '';

    if (result.length < 1) {
        message.classList.add('list__message_show');
    } else {
        message.classList.remove('list__message_show');
    }

    const fragment = document.createDocumentFragment();

    for (const book of result.slice(0, BOOKS_PER_PAGE)) {
        const element = createBookPreview(book);
        fragment.appendChild(element);
    }

    list.appendChild(fragment);

    updateShowMoreButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    form.reset();
    overlay.open = false;
}

/**
 * Function that handles the submission of the form and updates the book list base on the search criteria
 * @param {Event} event - the event object
 */
const handleSearchFormSubmission = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) {
                genreMatch = true;
            }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book);
        }
    }

    updateBookList(result);
}

/**
 * This handler fires when the user clicks on the clicks on a specific book,
 * the function gets the book element using its class name and 
 * searches in bookArray to retrive book information
 * A dialog overlay is show which contains information about the book
 * and if a close button is closed, the overlay will close;
 * @param {Event} event 
 */
const activeHandle = (event) =>{
    const { active: {overlay, close, image, blurImage, title, subtitle, summary }} = html;
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

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
    
    if (active) {
        overlay.open = true
        image.src = active.image
        blurImage.src = active.image
        title.innerText = active.title
        subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        summary.innerText = active.description
    }
    close.addEventListener('click', () => {
        overlay.open = false;
    });
}

/**
 * A function that handles the click more button
 * @param {Object} html 
 * @param {Object} html.main - the main object
 * @param {HTMLElement} button - the "show more" button element
 */
const updateShowMoreButton = ({main: { button } } = html) => {
    const remainingBooks = matches.length - (page* BOOKS_PER_PAGE);
    button.disabled = remainingBooks <= 0;
    button.innerHTML = /* html */`
        <span>Show more</span>
        <span class="list__remaining">${remainingBooks > 0 ? remainingBooks: 0}</span>`;
}

/**
 * This function handles what happens the user wants to display more books
 * The page is increamented by 1 everytime the user clicks on the button
 * and the function calls the renderPreview function and the updateShowMoreButton functions
 */
const handleShowMoreClick = () =>{
    page = page +1;
    renderPreview(books.slice(((page -1) *BOOKS_PER_PAGE), (page*BOOKS_PER_PAGE)));
    updateShowMoreButton();
}

// Initial Rendering
renderPreview(matches, page);
updateShowMoreButton();
authorsHtmlOptions();
genresHtmlOptions();
setThemePreference();

/**
 * Event listeners for fire up the handlers for the full functionality of the application
 * 
 */

/**
 * This handler fires when the user clicks on the clicks on the settings button,
 * a dialog overlay will show that consists of theme options a user can choose from
 * A cancel button is availiable if the user decides to not change the settings
 * @param {Event} event 
 */
function handlerSettings(event){
    const {settings: {overlay, cancel}} = html;
    overlay.show();
  
    cancel.addEventListener('click', function(){
        overlay.close();
    })
} 

/**
 * This handler fires when a user clicks on the seach button 
 * A dialog overlay is shown to allow the user to search a book,
 * either by title, author or genres
 * the cancel button is used to close the overlay and resets the dialog or form.
 * @param {Event} event
 */
const handlerSearch = (event) => {
    const {search: {overlay, form, cancel}} = html;
    overlay.show();
    cancel.addEventListener('click', function(){
        overlay.close();
        form.reset();
    })
}
html.main.button.addEventListener('click', handleShowMoreClick)

html.main.list.addEventListener('click', activeHandle);

html.header.settings.addEventListener('click', handlerSettings);

html.settings.form.addEventListener('submit', themeToggleHandler);

html.header.search.addEventListener('click', handlerSearch);

html.search.form.addEventListener('submit', handleSearchFormSubmission);