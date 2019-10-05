import React, {Component} from 'react';
import { Container } from "@material-ui/core";
import MaterialTable from "material-table";
import {addMovie, getImdbList, getMoviesLists, updateMoviesList} from "../helpers/movieListHelper";
import CustomizedDialogs from "./imdb-dialog";
import TextField from "@material-ui/core/TextField";


export default class Imdb extends Component {

    constructor(props){
        super(props);

        this.getImdbData('hungry');

        getMoviesLists()
            .then(resp => {
                this.setState({moviesLists: resp.data});
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
                { title: 'User Rating', field: 'rating', type: 'numeric', editable: 'never' },
            ],
            data: [],
            currentRow: {},
            moviesLists: [],
            isDialogOpen: false,
            globalSearch: '',
        };
    }

    getImdbData(quickSearch) {
        getImdbList({s: quickSearch})
            .then(resp => {
                if (resp && resp.data.Search && resp.data.Search.length) {
                    this.setState({data: resp.data.Search.map(item => {
                            return {
                                title: item.Title,
                                year: item.Year,
                                genre: item.Type,
                                rating: 0,
                            }
                        })});
                }
            })
            .catch(err => console.log(err));
    }

    getData() {
        getMoviesLists().then(moviesList => {
            this.setState({moviesLists: moviesList.data});
        }).catch(err => {
            console.log(err);
        });
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


                    <MaterialTable
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
            rating: e.movieRating,
        };


        const preSubmitPrepare = this.state.moviesLists.find(item => item._id === e.selectValue);
        let existingMovies = [];
        if (preSubmitPrepare && preSubmitPrepare.movies.length) {
             existingMovies = preSubmitPrepare.movies;
        }


        if (!this.state.moviesLists.some(item => item.title === movieBody.title)) {
            addMovie(movieBody)
                .then(res => {
                    existingMovies.push(res.data._id);

                    return updateMoviesList(e.selectValue, {movies: existingMovies});
                })
                .then(res => {
                    console.log(res);
                    this.getData();
                })
                .catch(err => console.log(err));
        } else {
            alert("Already existing movie");
        }

    }


}
