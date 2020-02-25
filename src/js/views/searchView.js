import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
};

export const clearInput = () => {
    elements.searchInput.value = ''; // if it was on same line it does implicit return which we don't want.
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(el => renderRecipe(el)); // can also simply put: ...forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resultsPerPage);
};

/* 'Pasta with tomato and spinach'
 * Example is with limit of 17
 * accumulator 0: accumulator + current.length = 0 + 5 => newTitle = ['Pasta']
 * accumulator 5: accumulator + current.length = 5 + 4 = 9 => newTitle = ['Pasta', 'with']
 * accumulator 9: accumulator + current.length = 9 + 6 = 15 => newTitle = ['Pasta', 'with', 'tomato']
 * accumulator 15: accumulator + current.length = 15 + 3 = 18 => newTitle = ['Pasta', 'with', 'tomato'] // doesn't pass test => not added
 * accumulator 18: accumulator + current.length = 18 + 7 = 25 => newTitle = ['Pasta', 'with', 'tomato'] // doesn't pass test => not added
 * FInal array: ['Pasta', 'with', 'tomato']
 */
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []; // arrays can be const because we are not mutating its structure
    if (title.length > limit) {
        title.split(' ').reduce((accumulator, current) => {
            if (accumulator + current.length <= limit) {
                newTitle.push(current);
            }

            return accumulator + current.length;

        }, 0);
        // return result
        return `${newTitle.join(' ')}...`; // adds space between elements in array
    }
    return title;
};

const renderRecipe = (recipe) => {
    const markup =
        `
            <li>
                <a class="results__link" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
        `;
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

// type: 'prev' or 'next'
const createButton = (pageNumber, type) =>
    `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? pageNumber - 1 : pageNumber + 1}>
        <span>Page ${type === 'prev' ? pageNumber - 1 : pageNumber + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>               
    `;

const renderButtons = (page, numberOfResults, resultsPerPage) => {
    const pages = Math.ceil(numberOfResults / resultsPerPage);
    let button;

    if (page === 1 && pages > 1) {
        // button 'next'
        button = createButton(page, 'next');
    } else if (page < pages) {
        // buttons 'previous' and 'next'
        button =
            `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `
    } else if (page === pages && pages > 1) {
        // button 'previous'
        button = createButton(page, 'prev');

    }

    elements.searchResultPages.insertAdjacentHTML("afterbegin", button);
};