import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            // commented out because calling code already handles it within a try/catch block 
            // but showing how it can be used for calls from other places.
            //alert('Something went wrong with getting the recipe ;(');
        }
    }

    calculateTime() {
        // assuming that preparation takes 15 mins per every 3 ingredients
        const numberOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numberOfIngredients / 3);
        this.time = periods * 15;
    };

    calculateServings() {
        this.servings = 4;
    };

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'ounce', 'ounces', 'ozs', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz', 'oz', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        const newIngredients = this.ingredients.map(el => {
            // uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, unitsShort[index]);
            });

            // remove parentheses using RegExp 
            ingredient = ingredient.replace(/\s*\(.*?\)\s*/g, ' ');

            // parse ingredients into count, unit and ingredient
            const arrayIngredient = ingredient.split(' ');
            const unitIndex = arrayIngredient.findIndex(element2 => units.includes(element2));

            let objectIngredient;
            if (unitIndex > -1) {
                // unit is present
                // E.g. 4 1/2 cups, arrayCount is [4, 1/2] => eval(4+1/2) = 4.5
                // E.g. 4 cups, arrayCount is [4]
                const arrayCount = arrayIngredient.slice(0, unitIndex);

                let count;
                if (arrayCount.length === 1) {
                    if (arrayCount[0] === "") {
                        count = 1;
                    } else {
                        // some recipes show 4-1/2 for example, hence replace and eval are needed.
                        count = eval(arrayIngredient[0].replace('-', '+'));
                    }
                } else {
                    count = eval(arrayIngredient.slice(0, unitIndex).join('+'));
                }
                objectIngredient = {
                    count: count,
                    unit: arrayIngredient[unitIndex],
                    ingredient: arrayIngredient.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrayIngredient[0], 10)) {
                // no unit but 1st element is number (e.g. 1 bread, not 1 tbsp bread)
                objectIngredient = {
                    count: (parseInt(arrayIngredient[0], 10)),
                    unit: '',
                    // all but the 0th element which is the count
                    ingredient: arrayIngredient.slice(1).join(' ')
                }
            }
            else if (unitIndex === -1) {
                // no unit is present
                objectIngredient = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                }
            }
            return objectIngredient;
        });

        this.ingredients = newIngredients;
    };

    updateServings(type) {
        // servings
        var newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    };
}