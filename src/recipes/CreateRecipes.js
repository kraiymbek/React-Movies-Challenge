import React, {Component} from 'react';
import _ from "lodash";

export default class CreateRecipes extends Component {

    renderDetail(){
        if(this.props.isItemClicked){
            return(
                <div className="">
                    <div className="row">
                        <div className="col-12">
                            <img src={this.props.currentRecipe.imgPath}
                                 alt={this.props.currentRecipe.name}
                                 className="img-fluid"
                                 style={{maxHeight: "200px"}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h1>{this.props.currentRecipe.name}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className="btn btn-primary" onClick={this.onClickToShoppingList.bind(this)}>To shopping list</button>
                            <button className="btn btn-default" onClick={this.props.onClickEdit.bind(this)}>Edit Recipe</button>
                            <button className="btn btn-danger" onClick={this.props.onClickDelete.bind(this,this.props.currentRecipe)}>Delete Recipe</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p>{this.props.currentRecipe.description}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <ul className="list-group">
                                {this.props.currentRecipe.ingredients.map(function(ingredient, i) {
                                    return <li className="list-group-item" key={i}>{ingredient.name} - {ingredient.amount}</li>
                                })
                                }
                            </ul>
                        </div>
                    </div>

                </div>

            );

        }

        return(
            <div className="">
                <h1>Select a Recipe</h1>
            </div>
        );
    }


    render()
    {
        return (
            <div className="col-7">
                {this.renderDetail()}
            </div>



        );
    }
}


