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
 * Module for creating the book preview instance(s)
 */
import { BookPreview } from './bookPreview.js';

/**
 * Modules from props file
 * @type {Object<Array>} css - an object literal that contains color value for day and night
 * @type {Object<string>} html - an object literal that contains references to all html elements used in the app
 */
import {
    css,
    html,
} from './props.js';

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
 * A function that renders books on the page 
 * @prop {object} booksToShow
 * @returns {HTMLElement} 
 */
export const renderPreview = () => { 
    return {
        render: (booksToShow) => {
            if (!booksToShow){
                throw new Error('Books are not valid')
            }
            const { main : { list }} = html
            const fragment = document.createDocumentFragment();
        
            for (const book of books.slice((page -1) * BOOKS_PER_PAGE, (page) * BOOKS_PER_PAGE)) {
                /**
                 * Creating instance of BookPreview
                 */
                const BookToShow = new BookPreview(book)
                //BookToShow.previewBook = book; 
                fragment.appendChild(BookToShow);
            }
            list.appendChild(fragment);
        }
    }
}


/**
 * Function that matches the theme of the web app with that of the device
 * @prop {Object} html - html object that references the html
 * @prop {Object} html.settings - the settings objects
 * @prop {HTMLElement} theme - the theme HTML element that reperesents the theme value.
 */
export const setThemePreference = () => {
    const { settings: { theme } } = html
    return {
        setTheme: () => {
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
    }
}

/**
 * Function that allows the user to toggle between light and dark mode
 * @prop {Event} event - The event object.
 */
export const themeToggleHandler = () => {
    event.preventDefault();
    const { settings: { overlay, theme }} = html;
    return {
        changeTheme: (event) => {
            if (theme.value === 'night') {
                document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
                document.documentElement.style.setProperty('--color-light', '10, 10, 20');
            } else {
                document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
                document.documentElement.style.setProperty('--color-light', '255, 255, 255');
            }
        
            overlay.open = false
        }
    }
}


/**
 * A functions that updates the book list data based on the filter results
 * @prop {Array<Book>} result - an array of books that represents the search results
 */
export const updateBookList = () => {
    const { main: { list, message },
            search: { overlay, form } } = html;
    page = 1;    
    list.innerHTML = '';
    
    return {
        updateBookListFactory: (result) => {
            if (!result){
                throw new Error("Searched books is invalid.")
            }
            matches = result;
            if (result.length < 1) {
                message.classList.add('list__message_show');
            } else {
                message.classList.remove('list__message_show');
            }
        
            const fragment = document.createDocumentFragment();
        
            for (const book of result.slice(0, BOOKS_PER_PAGE)) {
                const element = new BookPreview(book)
                fragment.appendChild(element);
            }
        
            list.appendChild(fragment);

            updateShowMoreButton().generateButtonHTML();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            form.reset();
            overlay.open = false;
        }
    }
}

/**
 * Function that handles the submission of the form and updates the book list base on the search criteria
 * @prop {Event} event - the event object
 */
export const handleSearchFormSubmission = () => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    return {
        searchNow: (event) => {
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
        
            updateBookList().updateBookListFactory(result);
        }
    }
}

/**
 * This handler fires when the user clicks on the clicks on a specific book,
 * the function gets the book element using its class name and 
 * searches in bookArray to retrive book information
 * A dialog overlay is show which contains information about the book
 * and if a close button is closed, the overlay will close;
 * @prop {Event} event 
 */
export const activeHandle = () => {
    const { active: {overlay, close, image, blurImage, title, subtitle, summary }} = html;
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null
    
    return {
        active: (event) => {         
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
        }
    }      
}

/**
 * A function that handles the click more button
 * @param {Object} html 
 * @param {Object} html.main - the main object
 * @param {HTMLElement} button - the "show more" button element
 */
export const updateShowMoreButton = ({main: { button } } = html) => {
    return {
        generateButtonHTML: () => {
            const remainingBooks = matches.length - (page* BOOKS_PER_PAGE);
            button.disabled = remainingBooks <= 0;
            button.innerHTML = /* html */`
                <span>Show more</span>
                <span class="list__remaining">${remainingBooks > 0 ? remainingBooks: 0}</span>`;
        }
    }
}

/**
 * This function handles what happens the user wants to display more books
 * The page is increamented by 1 everytime the user clicks on the button
 * and the function calls the renderPreview function and the updateShowMoreButton functions
 */
export const handleShowMoreClick = () => {
    page = page + 1;
    renderPreview().render((books.slice(((page -1) *BOOKS_PER_PAGE), (page*BOOKS_PER_PAGE))));
    updateShowMoreButton().generateButtonHTML();
}


  