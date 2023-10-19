/**
 * importing all required handlers (functions) to run the app
 */
import {
     renderPreview, 
     updateBookList, 
     themeToggleHandler,
     setThemePreference,
     handleSearchFormSubmission, 
     activeHandle, 
     updateShowMoreButton, 
     handleShowMoreClick,
} from './handlers.js';

/**
 * Modules from props
 * @type {Object<string>} html - an object literal that contains references to all html elements used in the app
 * @type {Function} authorsHtmlOptions - a function that appends authors select options to the DOM 
 * @type {Function} genresHtmlOptions - a function that appends genres select options to the DOM
 */
import {
    html,
    genresHtmlOptions,
    authorsHtmlOptions,
} from './props.js';

import { books } from './data.js';

// Initial Rendering of the application

renderPreview().render(books);
updateShowMoreButton().generateButtonHTML();
authorsHtmlOptions();
genresHtmlOptions();
setThemePreference().setTheme();

/**
 * Event listeners for fire up the handlers for the full functionality of the application
 * 
 */
html.main.button.addEventListener('click', handleShowMoreClick);

html.main.list.addEventListener('click',() => {
    activeHandle().active();
});

html.settings.form.addEventListener('submit', () => {
    themeToggleHandler().changeTheme();
});

html.search.form.addEventListener('submit', () => {
    handleSearchFormSubmission().searchNow()
});

html.active.close.addEventListener('click', () => {
    html.active.overlay.close();
});

html.header.search.addEventListener('click', () => {
    html.search.overlay.showModal();
});

html.search.cancel.addEventListener('click', () => {
    const { search: {overlay, form } } = html;
    overlay.close();
    form.reset();
});

html.header.settings.addEventListener('click', () => {
    html.settings.overlay.showModal();
})

html.settings.cancel.addEventListener('click', () => {
    html.settings.overlay.close();
});

