import React, {Component} from 'react';
import MovieLists from "./MovieLists"
import MovieListDetail from "./MovieListDetail";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


 export default class Movie extends Component {

    constructor(props){
        super(props);

        this.state = {
            isItemClicked: false,
            isEditing: false,
            isNewRecipe: false,
            currentMovielist: {}
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log()
    }


     render(){
        return(
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                        <MovieLists tableUpdate={this.detailTableUpdate()} onClickItem={this.onClickItem.bind(this)}/>
                        {this.renderDetail()}
                </Grid>
            </Container>
        );
    }

     renderDetail() {
         if (this.state.isItemClicked) {
             return <MovieListDetail
                 tableUpdate={this.detailTableUpdate}
                 moviesLists={this.state.moviesLists}
                 isItemClicked={this.state.isItemClicked}
                 currentMovielist = {this.state.currentMovielist}
             />;
         } else {
             return <Grid item xs={7} sm={7}>
                 <h1>Select a Movies List</h1>
             </Grid>;
         }
     }

     detailTableUpdate() {
         return true;
     }

     onClickItem(item){
         this.setState({
             isItemClicked: item !== 'deleted',
             currentMovielist: item
         });

     }
}
