import React, {Component} from 'react';
import _ from "lodash";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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


export default class RecipeList extends Component {

    showMovieLists() {
        return _.map(this.props.moviesLists, row => (
            <StyledTableRow onClick={this.props.onClickItem.bind(this, row)} key={row.name} >
                <StyledTableCell component="th" scope="row">
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.averateRate}</StyledTableCell>
                <StyledTableCell align="right">{row.movies.length}</StyledTableCell>
            </StyledTableRow>
        ));
    }

    render()
    {
        return (
            <div className="col-6">
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-success">New Movie List</button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <Paper >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell align="right">Average Rate</StyledTableCell>
                                        <StyledTableCell align="right">Number of movies</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.showMovieLists()}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                </div>
        </div>
        );
    }
}
