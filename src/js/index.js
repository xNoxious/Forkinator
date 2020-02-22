import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the application
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();

    if (query) {
        // new Search object and add to state
        state.search = new Search(query);

        // prepare UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchResults);

        // search for recipes
        await state.search.getResults();

        // render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault(); // prevents page from reloading
    controlSearch();
});