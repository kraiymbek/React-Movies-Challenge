const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    uid: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});


const Movies = mongoose.model('Movies', MoviesSchema);

module.exports = Movies;
