const express = require('express');
const MoviesList = require('../models/moviesList');
const Movies = require('../models/movies');
const router = new express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

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
    MoviesList.find({}, (err, MoviesLists) => {
        if (err) return res.status(500).send(err);
        if (MoviesLists) {
            MoviesLists.forEach(item => {
                const movies = item.movies.map(item => mongoose.Types.ObjectId(item));

                Movies.find({
                    '_id': {
                        $in: movies
                    }
                }, (err, Movies) => {
                    const aveRating = Movies.reduce((a, b) => a + b.rating, 0);
                    item['averageRating'] = aveRating/item.movies.length;
                    console.log(item)
                });
            });

            console.log(MoviesLists)
            return res.status(200).send(MoviesLists);
        }
    });
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
    MoviesList.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, MoviesList) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(MoviesList);
    });
});

router.delete('/moviesList/:id/delete', async (req, res) => {
    MoviesList.findByIdAndRemove(req.params.id, (err, MoviesList) => {
        if (err) return res.status(500).send(err);

        const response = {
            message: "Movie List successfully deleted",
            id: MoviesList._id
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

router.post('/movie/list', async (req, res) => {
    const movies = req.body.movies.map(item => mongoose.Types.ObjectId(item));
    Movies.find({
        '_id': {
            $in: movies
        }
    }, (err, MoviesLists) => {
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
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/movie/:id/delete', async (req, res) => {
    Movies.findByIdAndRemove(req.params.id, (err, MoviesList) => {
        if (err) return res.status(500).send(err);

        const response = {
            message: "Movie List successfully deleted",
            id: MoviesList._id
        };
        return res.status(200).send(response);
    });
});

router.post('/movie/:id/edit', async (req, res) => {
    Movies.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, MoviesList) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(MoviesList);
    });
});


module.exports = router;
