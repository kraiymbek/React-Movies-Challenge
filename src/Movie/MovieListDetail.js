import React, {Component} from 'react';

import MaterialTable from 'material-table';
import Grid from "@material-ui/core/Grid";
import {getMoviesByIds, addMovie, updateMoviesList, updateMovieById, deleteMovie} from "../helpers/movieListHelper";
import {Rating} from "@material-ui/lab";




export default class MovieListDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Title', field: 'title' },
                { title: 'Year', field: 'year', type: 'numeric' },
                {
                    title: 'Genre',
                    field: 'genre',
                },
                { title: 'Rating',
                    field: 'rating',
                    type: 'numeric',
                    editComponent: props => (
                        <Rating
                            name="simple-controlled"
                            value={+props.value}
                            onChange={e => props.onChange(e.target.value)}
                        />
                    ),
                    render: rowData => <Rating
                        disabled
                        name="simple-controlled"
                        value={+rowData.rating}
                    />
                },
            ],
            data: [],
        };

        this.getMovies(this.props.currentMovielist.movies);
    }

    componentWillReceiveProps(nextProps) {
        this.getMovies(nextProps.currentMovielist.movies);
        this.setState({currentMovielist: nextProps.currentMovielist});
    }

    getMovies(moviesIds) {
        getMoviesByIds({movies: moviesIds})
            .then(res => {
                this.setState({
                    data: res.data,
                });
            })
            .catch(err => console.log(err));
    }

    getAverageRatingData() {
        return String(this.state.data.reduce((a,b) => a + b.rating,0)/this.state.data.length);
    }

    render()
    {
        return (
                <Grid item xs={7} sm={7}>
                                <MaterialTable
                                    title={this.props.currentMovielist.name}
                                    columns={this.state.columns}
                                    data={this.state.data}
                                    editable={{
                                        onRowAdd: newData =>
                                            new Promise(resolve => {
                                                setTimeout(() => {
                                                    resolve();
                                                    const movieBody = {
                                                        genre: newData.genre,
                                                        year: +newData.year,
                                                        title: newData.title,
                                                        rating: +newData.rating,
                                                    };

                                                    const existingMovies = this.props.currentMovielist.movies;
                                                    addMovie(movieBody)
                                                        .then(res => {
                                                            existingMovies.push(res.data.uid);
                                                            return updateMoviesList(this.props.currentMovielist._id, {movies: existingMovies})
                                                        })
                                                        .then(res => {
                                                            this.props.tableUpdate();
                                                            const data = [...this.state.data];
                                                            data.push(newData);
                                                            this.setState({ ...this.state, data });
                                                        })
                                                        .catch(err => console.log(err));
                                                }, 600);
                                            }),
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise(resolve => {
                                                setTimeout(() => {
                                                    resolve();

                                                    updateMovieById(newData.uid, {
                                                        genre: newData.genre,
                                                        year: +newData.year,
                                                        title: newData.title,
                                                        rating: +newData.rating,
                                                    })
                                                        .then(res => {
                                                            this.props.tableUpdate();
                                                            const data = [...this.state.data];
                                                            data[data.indexOf(oldData)] = newData;
                                                            this.setState({ ...this.state, data });
                                                        })
                                                        .catch(err => console.log(err))
                                                }, 600);
                                            }),
                                        onRowDelete: oldData =>
                                            new Promise(resolve => {
                                                setTimeout(() => {
                                                    resolve();
                                                    const existingMovies = this.props.currentMovielist.movies;
                                                    const index = existingMovies.indexOf(oldData.uid);
                                                    if (index > -1) {
                                                        existingMovies.splice(index, 1)
                                                    }

                                                    updateMoviesList(this.props.currentMovielist._id, {movies: existingMovies})
                                                        .then(res => {
                                                            this.props.tableUpdate();
                                                            const data = [...this.state.data];
                                                            data.splice(data.indexOf(oldData), 1);
                                                            this.setState({ ...this.state, data });
                                                        })
                                                        .catch(err => console.log(err));

                                                }, 600);
                                            }),
                                    }}
                                />
                                <hr/>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div className="rate-wrapper">
                                        <span className="title">Average Rate: </span>
                                        <b className="value">{this.getAverageRatingData()}</b>
                                    </div>
                                </div>

                </Grid>
        );
    }
}
