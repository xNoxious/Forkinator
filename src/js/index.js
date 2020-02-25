import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the application
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/*
 * Search Controller
 */
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

        try {
            // search for recipes
            await state.search.getResults();

            // render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            console.log(error);
            alert('Something went wrong with the search :(');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault(); // prevents page from reloading
    controlSearch();
});

elements.searchResultPages.addEventListener("click", e => {
    // target gets what we've clicked on, closests gets closests class that we specify 
    //(so that clickin either button, its text or its other nested elements will work).
    const button = e.target.closest('.btn-inline');

    if (button) {
        // redirect to page
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }

});

/*
 * Recipe Controller
 */
const controlRecipe = async () => {
    // get recipe ID from URL
    const recipeId = window.location.hash.replace('#', '');
    if (recipeId) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // create new recipe object
        state.recipe = new Recipe(recipeId);

        try {
            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe);
            state.recipe.parseIngredients();

            // calculate servings
            state.recipe.calculateServings();
            state.recipe.calculateTime();

            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            console.log(error);
            alert('Error processing recipe');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// Below is a nice way to add a bunch of events to the same event listener instead of separate line for each
// 'load' solves issue where someone bookmarks and hash doesn't actually change
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
