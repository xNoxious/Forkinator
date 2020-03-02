export class Likes {
    constructor() {
        this.likes = [];
    };

    addLike(id, title, author, image) {
        // ES6 allows to not do : for matching names
        // e.g. id: id but just note it once like this:
        const like = {
            id,
            title,
            author,
            image
        };

        this.likes.push(like);
        return like;
    };

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1; // if no id present, it's -1
    }

    getNumberOfLikes() {
        return this.likes.length;
    }
}