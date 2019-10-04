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


    render(){
        return(
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                        <MovieLists onClickItem={this.onClickItem.bind(this)}/>
                        {this.renderDetail()}
                </Grid>
            </Container>
        );
    }

     renderDetail() {
         if (this.state.isItemClicked) {
             return <MovieListDetail
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

     onClickItem(item){
         this.setState({
             isItemClicked: item !== 'deleted',
             currentMovielist: item
         });

     }



    saveRecipe(oRecipe,nRecipe){
        // console.log(nRecipe.editIngredientName.value);
        //
        const nName = nRecipe.editNameInput.value;
        const nImagePath = nRecipe.editImageInput.value;
        const nDescription = nRecipe.editDescriptionInput.value;
        const nIngredientName = nRecipe.editIngredientName.value;
        const nIngredientAmout = nRecipe.editIngredientAmount.value;

        const foundRecipe = this.state.recipes.find(recipe=> recipe.id == oRecipe.id );
        foundRecipe.name = nName;
        foundRecipe.imgPath = nImagePath;
        foundRecipe.description = nDescription;
        foundRecipe.ingredients.amount = nIngredientAmout;
        foundRecipe.ingredients.name = nIngredientName;

        this.setState({
            contacts: this.state.contacts,
            isEditing: false
        })






        //
        //
        // const foundContact = this.state.contacts.find(contact => contact.name === oContactName);
        // foundContact.name = newName;
        // foundContact.phone = newPhone;
        // foundContact.city = newCity;
        // foundContact.graduateFrom = newGrad;
        //
        // this.setState({contacts: this.state.contacts});



    }
    //
    // deleteContact(contactToDelete){
    //     _.remove(this.state.contacts,contact => contact.name === contactToDelete);
    //
    //     this.setState({
    //         contacts: this.state.contacts
    //     });
    // }
}
