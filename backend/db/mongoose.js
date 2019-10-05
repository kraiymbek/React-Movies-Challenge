const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/moviesCollectionDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
