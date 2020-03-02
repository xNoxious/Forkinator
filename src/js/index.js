import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the application
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
window.state = state;

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

        // highlight selected search item
        if (state.search) {
            searchView.highlightSelected(recipeId);
        }

        // create new recipe object
        state.recipe = new Recipe(recipeId);

        try {
            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
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

/*
 * Shopping List Controller
 */
const controlShoppingList = () => {
    // create new list if there isn't one
    if (!state.shoppingList) {
        state.shoppingList = new ShoppingList();
    }

    // add each ingredient to list
    state.recipe.ingredients.forEach(el => {
        const item = state.shoppingList.addItem(el.count, el.unit, el.ingredient);
        shoppingListView.renderItem(item);
    });
};

// Handle delete and update of items in list
elements.shoppingList.addEventListener('change', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid; //we named it so in view: data-itemid

    // handle delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.shoppingList.deleteItem(id);

        // delete from UI
        shoppingListView.deleteItem(id);

        // handle count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        if (val >= 0) {
            state.shoppingList.updateCount(id, val);
        }
    }
});

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// Below is a nice way to add a bunch of events to the same event listener instead of separate line for each
// 'load' solves the issue where someone bookmarks and hash doesn't actually change
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// handling recipe amount button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) // button or any child
    {
        if (state.recipe.servings > 1) {
            // decrease button is clicked 
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlShoppingList();
    }
});