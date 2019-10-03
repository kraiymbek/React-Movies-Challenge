import React, {Component} from 'react';
import RecipeList from "./RecipeList"
import RecipeDetail from "./RecipeDetail";
import RecipeEdit from "./RecipeEdit";
import _ from "lodash"


 export default class Recipe extends Component {

    constructor(props){
        super(props);

        this.state = {
            isItemClicked: false,
            isEditing: false,
            isNewRecipe: false,
            moviesLists: props.moviesLists,
            currentMovielist: {}
        };
    }


    render(){
        return(
            <div className="container">
                <div className="row">
                    <RecipeList moviesLists={this.state.moviesLists}
                                onClickItem={this.onClickItem.bind(this)}
                                onCreateRecipe = {this.onCreateRecipe.bind(this)}/>

                    {this.state.isEditing ?
                        <RecipeEdit
                            onClickCancel = {this.onClickCancel.bind(this)}
                            currentMovielist = {this.state.currentMovielist}
                            saveRecipe = {this.saveRecipe.bind(this)}
                        /> : <RecipeDetail
                            moviesLists={this.state.moviesLists}
                            isItemClicked={this.state.isItemClicked}
                            currentMovielist = {this.state.currentMovielist}
                            onClickEdit = {this.onClickEdit.bind(this)}
                            onClickDelete = {this.onClickDelete.bind(this)}
                        /> }
                </div>
            </div>
        );
    }

    onCreateRecipe(){
        this.setState({
            isNewRecipe:false
        });
    }



     onClickItem(item){
         this.setState({
             isItemClicked: true,
             currentMovielist: item
         });

     }

     onClickEdit(){
         this.setState({
             isEditing: true
         });
     }

     onClickCancel(){
         this.setState({
             isEditing: false
         });
     }

     onClickDelete(item_id){
        _.remove(this.state.recipes, recipe => recipe.id == item_id);

        this.setState({
            recipes: this.state.recipes
        })



     }


    // updateSearch(e){
    //     this.setState({
    //         search: e.target.value.substr(0,20)
    //     });
    // }
    //
    // createContact(name,phone,img){
    //     this.state.contacts.push({
    //         name,
    //         phone,
    //         img
    //     });
    //
    //     this.setState({
    //         contacts: this.state.contacts
    //     });
    //
    //
    // }
    //
    saveRecipe(oRecipe,nRecipe){



        // console.log(nRecipe.editNameInput.value);
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
