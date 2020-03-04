import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            console.log(error);
            // commented out because calling code already handles it within a try/catch block 
            // but showing how it can be used for calls from other places.
            // alert("There is a problem with getting recipes for your request. Try using something popular like 'pizza' or 'pasta'");
        }
    };
}