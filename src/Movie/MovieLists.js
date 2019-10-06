import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {createMoviesList, deleteMoviesListById, getMoviesLists} from '../helpers/movieListHelper'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

export default class MovieLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moviesLists: [],
            isCreateMode: false,
            value: '',
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        getMoviesLists().then(moviesList => {
            this.setState({moviesLists: moviesList.data});
        }).catch(err => {
            console.log(err);
        });
    }

    showMovieLists() {
        return this.state.moviesLists.map(row => (
            <StyledTableRow  key={row._id} >
                <StyledTableCell component="th" scope="row"
                                 onClick={this.props.onClickItem.bind(this, row)}>
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="right"
                                 onClick={this.props.onClickItem.bind(this, row)}>
                    {row.averageRating}
                </StyledTableCell>
                <StyledTableCell align="right"
                                 onClick={this.props.onClickItem.bind(this, row)}>
                    {row.movies.length}
                </StyledTableCell>
                <StyledTableCell align="right">
                    <button  onClick={() => this.handleDelete(row._id)}><span style={{ color: 'red' }}>delete</span></button>
                </StyledTableCell>
            </StyledTableRow>
        ));
    }

    render()
    {
        return (
            <Grid item xs={5} lg={5}>
                {this.state.isCreateMode ?
                    <div>
                        <form onSubmit={this.handleSubmit.bind(this)} >
                            <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                            <input disabled={this.state.value < 3} style={{margin: "0 10px"}} type="submit" value='Ok' />
                            <button type="button" onClick={() => this.handleCancel()}>Cancel</button>
                        </form>
                    </div>

                    : <button variant="primary" onClick={() => this.handleCreateMode()}>
                    <b>Create Movie List</b>
                </button>
                }
                <hr/>
                <Paper >
                    {this.state.moviesLists.length ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Average Rate</StyledTableCell>
                                    <StyledTableCell align="right">Number of movies</StyledTableCell>
                                    <StyledTableCell align="right">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.showMovieLists()}
                            </TableBody>
                        </Table>
                        : 'No Movies collections created'
                    }
                </Paper>
            </Grid>
        );
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleCancel() {
        this.setState({isCreateMode: false});
    }

    handleSubmit(event) {
        event.preventDefault();
        createMoviesList({name: this.state.value})
            .then(resp => {
                this.getData();
                this.setState({isCreateMode: false, value: ''});
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleCreateMode() {
        this.setState({isCreateMode: true});
    }

    handleDelete(id) {
        deleteMoviesListById(id)
            .then(resp => {
                this.getData();
                this.props.onClickItem('deleted');
            })
            .catch(err => {
            console.log(err);
        });
    }
}
