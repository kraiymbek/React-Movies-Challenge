const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const movieListRouter = require('./routers/moviesList');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(movieListRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

const MoviesList = require('./models/moviesList');

const main = async () => {
    // const task = await Task.findById('5c2e505a3253e18a43e612e6')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('5c2e4dcb5eac678a23725b5b')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
};

main();
