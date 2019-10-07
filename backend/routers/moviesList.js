const express = require('express');
const MoviesList = require('../models/moviesList');
const Movies = require('../models/movies');
const router = new express.Router();
const axios = require('axios');
const uuidv4 = require('uuid/v4')

router.post('/moviesList/create', async (req, res) => {

    if (req.body.movies) {
        req.body['averageRating'] = req.body.movies.reduce((a,b) => a + b.rating, 0)/req.body.movies.length;
    } else {
        req.body['averageRating'] = 0;
    }


    const task = new MoviesList({
        name: req.body.name,
        movies: req.body.movies ? req.body.  movies : [],
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/moviesList', async (req, res) => {
    const moviesListCollection = await MoviesList.find({});

    for (const MoviesCollectionDetail of moviesListCollection) {
        let averageRating = 0;
        if (MoviesCollectionDetail.movies.length) {
            const movies = await Movies.find({
                'uid': {
                    $in: MoviesCollectionDetail.movies
                    }
                });

                let countRating = 0;

                movies.forEach(item => {
                    countRating += item.rating;
                });

                averageRating = countRating/movies.length;
            }

            MoviesCollectionDetail['averageRating'] = averageRating
        }

        res.status(200).send(moviesListCollection);

});

router.get('/moviesList/:id', async (req, res) => {
    MoviesList.findById(req.params.id, (err, MoviesList) => {
        if (err) return res.status(500).send(err);

        if (MoviesList) {
            return res.status(200).send(MoviesList);
        } else {
            return res.status(404).send({error: 404});
        }
    });
});

router.post('/moviesList/:id/edit', async (req, res) => {
    MoviesList.findByIdAndUpdate(req.params.id, req.body,(err, MoviesList) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(MoviesList);
    });
});

router.delete('/moviesList/:id/delete', async (req, res) => {
    MoviesList.findByIdAndRemove(req.params.id, (err, MoviesList) => {
        if (err) return res.status(500).send(err);

        const response = {
            message: "Movie List successfully deleted",
            id: MoviesList.uid
        };
        return res.status(200).send(response);
    });
});

router.get('/imdb/list', async (req, res) => {
    const query = req.query;
    const queryParams = {};
    const url = 'http://www.omdbapi.com/';

    if (query['s']) {
        queryParams['s'] = query['s'];
    }

    if (query['page']) {
        queryParams['page'] = query['page'];
    }

    queryParams['apikey'] = '3ce31cd';


    axios.get(url, {
        params: queryParams
    })
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(err => {
             res.status(500).send(err);
        })
});

//-----------------movies api-------------------------------

router.post('/movie/list', async (req, res) => {
    const toFind = req.body.movies ? {
            'uid': {
                $in: req.body.movies
            }
        } : {};

    Movies.find(toFind, (err, MoviesLists) => {
        if (MoviesLists) {
            res.send(MoviesLists);
            return;
        }
        res.status(500).send()
    });
});

router.post('/movie/add', async (req, res) => {

    const task = new Movies({
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        rating: req.body.rating ? req.body.rating : 0,
        uid: req.body.uid ? req.body.uid : uuidv4(),
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/movie/:id/delete', async (req, res) => {
    Movies.findOneAndRemove({"uid": req.params.id}, (err, MoviesList) => {
        if (err) return res.status(500).send(err);

        const response = {
            message: "Movie List successfully deleted",
            id: MoviesList._id
        };
        return res.status(200).send(response);
    });
});

router.post('/movie/:id/edit', async (req, res) => {
    Movies.findOneAndUpdate({"uid": req.params.id}, req.body, (err, MoviesList) => {
        console.log(MoviesList)
        if (err) return res.status(500).send(err);
        return res.status(200).send(MoviesList);
    });
});


module.exports = router;
