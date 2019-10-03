import React, {Component} from 'react';
import _ from "lodash";
import IngredientListItem from "./IngredientListItem";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

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

export default class RecipeEdit extends Component {



    showMovies() {
        return _.map(this.props.currentMovielist.movies, (row, i) => (
            <StyledTableRow  key={i} >
                <StyledTableCell component="th" scope="row">
                    <input type="text"
                           id="year"
                           defaultValue={row.year}
                           ref="editTitle"
                           className="form-control"/>
                </StyledTableCell>
                <StyledTableCell align="right"><input type="text"
                                                      id="year"
                                                      defaultValue={row.year}
                                                      ref="editYear"
                                                      className="form-control"/></StyledTableCell>
                <StyledTableCell align="right"><input type="text"
                                                      id="genre"
                                                      defaultValue={row.genre}
                                                      ref="editGenre"
                                                      className="form-control"/></StyledTableCell>
                <StyledTableCell align="right"><input type="text"
                                                      id="rating"
                                                      defaultValue={row.rating}
                                                      ref="editrRating"
                                                      className="form-control"/></StyledTableCell>
            </StyledTableRow>
        ));

        {/*<div className="col-6">*/}
        {/*    <div className="row">*/}
        {/*        <div className="col-12">*/}
        {/*            <form onSubmit={this.onEditSaveClick.bind(this)}>*/}
        {/*                <div className="row">*/}
        {/*                    <div className="col-12">*/}
        {/*                        <button className="btn btn-success" onClick={this.onEditSaveClick.bind(this)}>Save*/}
        {/*                        </button>*/}
        {/*                        <button className="btn btn-danger" onClick={this.props.onClickCancel}>Cancel</button>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*                <div className="row">*/}
        {/*                    <div className="col-12">*/}
        {/*                        <div className="form-group">*/}
        {/*                            <label htmlFor="name">Name</label>*/}
        {/*                            <input type="text"*/}
        {/*                                   id="name"*/}
        {/*                                   defaultValue={this.props.currentMovielist.name}*/}
        {/*                                   ref="editNameInput"*/}
        {/*                                   className="form-control"/>*/}
        {/*                        </div>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*                <div className="row">*/}
        {/*                    <div className="col-12">*/}
        {/*                        <div className="form-group">*/}
        {/*                            <label htmlFor="imagePath">Image URL</label>*/}
        {/*                            <input type="text"*/}
        {/*                                   id="imagePath"*/}
        {/*                                   className="form-control"*/}
        {/*                                   defaultValue={this.props.currentMovielist.imgPath}*/}
        {/*                                   ref="editImageInput"*/}
        {/*                            />*/}
        {/*                        </div>*/}
        {/*                    </div>*/}
        {/*                </div>*/}

        {/*                <div className="row">*/}
        {/*                    <div className="col-12">*/}
        {/*                        <img src={this.props.currentMovielist.imgPath} alt={this.props.currentMovielist.name}*/}
        {/*                             style={{maxHeight: "150px"}} className="img-fluid"/>*/}
        {/*                    </div>*/}
        {/*                </div>*/}

        {/*                <div className="row">*/}
        {/*                    <div className="col-12">*/}
        {/*                        <div className="form-group">*/}
        {/*                            <label htmlFor="description">Description</label>*/}
        {/*                            <textarea type="text"*/}
        {/*                                      id="description"*/}
        {/*                                      ref="editDescriptionInput"*/}
        {/*                                      className="form-control"*/}
        {/*                                      rows="6">{this.props.currentMovielist.description}</textarea>*/}
        {/*                        </div>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*                <div className="row">*/}
        {/*                    <div className="col-12">*/}
        {/*                        {this.showIngredients()}*/}

        {/*                    </div>*/}
        {/*                </div>*/}


        {/*            </form>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
    }

    render()
    {
        return (
            <div className="mt-5">
                <form onSubmit={this.onEditSaveClick.bind(this)}>
                    <div className="row">
                        <div className="col-4">
                            <p>Name:</p>
                        </div>
                        <div className="col-5">
                                    <input type="text"
                                           id="name"
                                           defaultValue={this.props.currentMovielist.name}
                                           ref="editNameInput"
                                           className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <p>Average Rate:</p>
                        </div>
                        <div className="col-5">
                                <input type="text"
                                       id="name"
                                       defaultValue={this.props.currentMovielist.averateRate}
                                       ref="editAverageRateInput"
                                       className="form-control"/>
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
                            <button className="btn btn-default mr-2" onClick={this.onEditSaveClick.bind(this)}>Save</button>
                            <button className="btn btn-danger" onClick={this.props.onClickCancel}>Cancel</button>
                        </div>
                    </div>
                </form>

            </div>
        );
    }


    onEditSaveClick(e){
        e.preventDefault();
        console.log(e)


        const newRecipe = this.props.currentMovielist ;
        const oldRecipe = this.props.currentMovielist;

        this.props.saveRecipe(oldRecipe,newRecipe);


        // const oldContact = this.name;
        // // const newContact = this.refs;
        // //
        // //
        // //
        // // this.props.saveContact(oldContact,newContact);
        // //
        // // this.setState({
        // //     isEditing: false,
        // //     name: this.state.name,
        // //     phone: this.state.phone,
        // //     city: this.state.city,
        // //     graduateFrom: this.graduateFrom
        // // });

    }

    showIngredients() {

        // this.props.currentMovielist.ingredients.map((ingredient, index)

        return _.map(this.props.currentMovielist.ingredients, (ingredient, i) =>
            <IngredientListItem

            key={i}
            {...this.props} {...ingredient}/>);
    }




}
