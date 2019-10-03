import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from "lodash"

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

export default class RecipeDetail extends Component {
    showMovies() {
        return _.map(this.props.currentMovielist.movies, (row, i) => (
            <StyledTableRow  key={i} >
                <StyledTableCell component="th" scope="row">
                    {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.year}</StyledTableCell>
                <StyledTableCell align="right">{row.genre}</StyledTableCell>
                <StyledTableCell align="right">{row.rating}</StyledTableCell>
            </StyledTableRow>
        ));
    }

    renderDetail(){
        if (this.props.isItemClicked) {
            return(
                <div className="mt-5">
                    <div className="row">
                        <div className="col-2">
                            <p>Name:</p>
                        </div>
                        <div className="col-10">
                            <h5>{this.props.currentMovielist.name}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <p>Average Rate:</p>
                        </div>
                        <div className="col-7">
                            <h5>{this.props.currentMovielist.averateRate}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                                <Paper>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Title</StyledTableCell>
                                                <StyledTableCell align="right">Year</StyledTableCell>
                                                <StyledTableCell align="right">Genre</StyledTableCell>
                                                <StyledTableCell align="right">Rating</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.showMovies()}
                                        </TableBody>
                                    </Table>
                                </Paper>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-12">
                            <button className="btn btn-default mr-2" onClick={this.props.onClickEdit.bind(this)}>Edit Movie List</button>
                            <button className="btn btn-danger" onClick={this.props.onClickDelete.bind(this, this.props.currentMovielist.id)}>Delete Movie List</button>
                        </div>
                    </div>
                </div>
            );

        }

        return(
            <div className="">
                <h1>Select a Movies List</h1>
            </div>
        );
    }


    render()
    {
        return (
            <div className="col-6">
                {this.renderDetail()}
            </div>
        );
    }


    // onClickToDelete(){
    //     this.props.onClickDelete(this.props.currentRecipe.id);
    //     console.log("deailda: " + this.props.currentRecipe.id)
    //
    //
    // }

}
