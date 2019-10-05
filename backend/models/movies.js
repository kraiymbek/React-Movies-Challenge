const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    year: {
        type: Number,
    },
    rating: {
        type: Number,
    },
});


const Movies = mongoose.model('Movies', MoviesSchema);

module.exports = Movies;
