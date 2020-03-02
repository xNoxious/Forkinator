export class Likes {
    constructor() {
        this.likes = [];
    };

    addLike(id, title, author, img) {
        // ES6 allows to not do : for matching names
        // e.g. id: id but just note it once like this:
        const like = {
            id,
            title,
            author,
            img
        };

        this.likes.push(like);
        // persist data in local storage
        this.persistData();

        return like;
    };

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // persist data in local storage
        this.persistData();
    };

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1; // if no id present, it's -1
    };

    getNumberOfLikes() {
        return this.likes.length;
    };

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    };

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        // restore likes from local storage
        if (storage) {
            this.likes = storage;
        }
    };
}