// A class to hold all the DOM elements at one place

export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector('.search__field'),
    searchResults: document.querySelector('.results'),
    searchResultList: document.querySelector('.results__list'),
    searchResultPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
};

export const renderLoader = (parent) => {
    const loader = ` 
    <div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    // can't just use the .lodader element directly because by the time this runs, 
    // searchResults is not yet on the page (it gets on page once we press search)
    const loaderElement = document.querySelector(".loader");
    if (loaderElement) {
        loaderElement.parentElement.removeChild(loaderElement);
    }
};