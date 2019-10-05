const mongoose = require('mongoose');

const moviesListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    averageRating: {
        type: Number,
    },
    movies: {
        type: [String],
    },
});


const MoviesLists = mongoose.model('MoviesLists', moviesListSchema);

module.exports = MoviesLists;
