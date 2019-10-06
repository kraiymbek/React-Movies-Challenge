import React, {Component} from 'react';
import MovieLists from "./MovieLists"
import MovieListDetail from "./MovieListDetail";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {getMoviesLists} from "../helpers/movieListHelper";
import CircularProgress from "@material-ui/core/CircularProgress";


 export default class Movie extends Component {

    constructor(props){
        super(props);

        this.state = {
            moviesLists: [],
            isItemClicked: false,
            isEditing: false,
            isNewRecipe: false,
            currentMovielist: {},
            isDetailsLoading: true,
            updateTable: false,
        };

        this.getTableData();
    }

     render(){
        return(
            <Container maxWidth="lg">
                {
                    this.state.moviesLists.length ?
                        <Grid container spacing={3}>
                            <MovieLists moviesLists={this.state.moviesLists}
                                        onClickItem={this.onClickItem.bind(this)}/>
                            {this.renderDetail()}
                        </Grid> : <CircularProgress />
                }

            </Container>
        );
    }

     getTableData() {
         getMoviesLists().then(moviesList => {
             this.setState({moviesLists: moviesList.data});
         }).catch(err => {
             console.log(err);
         });
     }

     renderDetail() {
         if (this.state.isItemClicked) {
             return <MovieListDetail
                 currentMovielist = {this.state.currentMovielist}
                 tableUpdate={this.detailTableUpdate.bind(this)}
                 moviesLists={this.state.moviesLists}
                 isDetailsLoading={this.state.isDetailsLoading}
             />;
         } else {
             return <Grid item xs={7} sm={7}>
                 <h1>Select a Movies List</h1>
             </Grid>;
         }
     }

     detailTableUpdate() {
        console.log("updated")
        this.getTableData();
     }

     onClickItem(item){
         this.setState({
             currentMovielist: item,
             isItemClicked: item !== 'deleted'
         });
     }
}
