import React, {Component} from 'react';
import { Container } from "@material-ui/core";
import MaterialTable from "material-table";
import {addMovie, getImdbList, getMoviesLists, updateMoviesList, getMoviesByIds, updateMovieById} from "../helpers/movieListHelper";
import CustomizedDialogs from "./imdb-dialog";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';


export default class Imdb extends Component {

    constructor(props){
        super(props);


        getMoviesLists()
            .then(resp => {
                if (resp) {
                    this.setState({moviesLists: resp.data});
                }
            })
            .catch(err => console.log(err));

        this.state = {
            columns: [
                { title: 'Title', field: 'title', editable: 'never' },
                { title: 'Year', field: 'year', type: 'numeric', editable: 'never' },
                {
                    title: 'Genre',
                    field: 'genre',
                },
                { title: 'Movie Rating', field: 'rating', type: 'numeric', editable: 'never' },
            ],
            data: [],
            currentRow: {},
            moviesLists: [],
            isDialogOpen: false,
            globalSearch: 'hungry',
            allMovieIds: [],
            ratingDictionary: {},
            imdbData: [],
            tableLoading: true,
        };

        getMoviesByIds({})
            .then(resp => {
                if (resp) {
                    this.setState({allMovieIds: resp.data.map(item => item.uid)});
                }
            })
            .catch(err => console.log(err))
            .finally(res => {
                this.getImdbData(this.state.globalSearch);
            });
    }

    getImdbData(quickSearch) {
        this.setState({tableLoading: true});
        getImdbList({s: quickSearch})
            .then(resp => {
                const hasRatingMovies = [];
                if (resp && resp.data.Search && resp.data.Search.length) {
                    resp.data.Search.forEach(movie => {
                        if (this.state.allMovieIds.includes(movie.imdbID)) {
                            const foundMovieId = this.state.allMovieIds.find(movieId => movieId === movie.imdbID);
                            hasRatingMovies.push(foundMovieId);
                        }
                    });

                    this.setState({imdbData: resp.data.Search});
                    return getMoviesByIds({movies: hasRatingMovies})
                }

                return new Promise(resolve => resolve(null));
            })
            .then(resp => {
                this.setState({tableLoading: false});
                const ratingDictionary = {};

                if (resp && resp.data) {
                    resp.data.forEach(item => {
                        ratingDictionary[item.uid] = item.rating;
                    });
                }

                this.setState({data: this.state.imdbData.map(item => {
                        return {
                            title: item.Title,
                            year: item.Year.slice(0,4),
                            genre: item.Type,
                            rating: ratingDictionary[item.imdbID] ? ratingDictionary[item.imdbID] : 0,
                            uid: item.imdbID,
                        }
                    }),
                });

            })
            .catch(err => console.log(err));
    }

    render(){
        return(
            <Container maxWidth="lg">
                <form noValidate autoComplete="off">
                    <TextField
                        id="outlined-search"
                        label="Global Imdb search"
                        type="search"
                        margin="normal"
                        variant="outlined"
                        value={this.state.globalSearch}
                        onChange={this.handleGlobalSearch.bind(this)}
                    />
                </form>

                {
                    this.state.tableLoading ?
                        <CircularProgress />
                        : <MaterialTable
                            title='Imdb title'
                            columns={this.state.columns}
                            data={this.state.data}
                            actions={[
                                {
                                    icon: 'save',
                                    tooltip: 'Add to User collection',
                                    onClick: (event, rowData) => this.setState({currentRow: rowData, isDialogOpen: true})
                                },
                            ]}
                            options={{
                                actionsColumnIndex: -1
                            }}
                        />
                }



                {this.state.isDialogOpen ? <CustomizedDialogs
                    selectedRow={this.state.currentRow}
                    isDialogOpen={this.state.isDialogOpen}
                    moviesList={this.state.moviesLists}
                    dialogClosed={this.closeDialog.bind(this)}
                    dialogSubmited = {this.handleDialog.bind(this)}
                /> : null}

            </Container>
        );
    }

    closeDialog (){
        this.setState({isDialogOpen: false});
    }

    handleGlobalSearch(e) {
        this.setState({globalSearch: e.target.value});
        this.getImdbData(e.target.value);
    }

    handleDialog(e) {
        const movieBody = {
            title: this.state.currentRow.title,
            year: +this.state.currentRow.year,
            genre: this.state.currentRow.genre,
            rating: +e.movieRating,
            uid: this.state.currentRow.uid,
        };

        const selectedValues = e.selectValue;

        if (!this.state.allMovieIds.includes(this.state.currentRow.uid)) {
            addMovie(movieBody)
                .then(() => {
                    console.log();
                })
                .catch(err => console.log(err));
        } else {
            updateMovieById(movieBody.uid, {
                rating: movieBody.rating
            })
                .then(resp => {
                    console.log();
                })
                .catch(err => console.log(err));
        }




        selectedValues.forEach(selectedId => {

            const selectedMoviesCollection = this.state.moviesLists.find(item => item._id === selectedId);
            let existingMoviesInCollection = [];
            if (selectedMoviesCollection && selectedMoviesCollection.movies.length) {
                existingMoviesInCollection = selectedMoviesCollection.movies;
            }

            if (!existingMoviesInCollection.some(movieId => movieId === movieBody.uid)) {
                existingMoviesInCollection.push(this.state.currentRow.uid);
                updateMoviesList(selectedId, {movies: existingMoviesInCollection})
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => console.log(err));

            }  else {
                alert("Already existing movie");
            }
        });
    }
}
