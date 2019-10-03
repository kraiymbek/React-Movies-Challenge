import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Recipe from "./recipes/Recipe";


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesLists: [
            {
                id: guid(),
                name: "Lemony Chicken Soup",
                averateRate: 4,
                movies: [
                    {
                        title: "Red potatoes",
                        year: 1996,
                        genre: 'horror',
                        rating: 3,
                        description: "'actually pickled flower buds and add bright, briny flavor to this appetizer.",

                    },
                    {
                        title: "Red potatoes",
                        year: 1996,
                        genre: 'horror',
                        rating: 3,
                        description: "'actually pickled flower buds and add bright, briny flavor to this appetizer.",

                    },
                ]
            },
        ]}
    }


    //
    // updateIngredientsOfList = (list) => {
    //     this.setState({
    //         listOfIngredients: list
    //     })
    // }
    //
    // handleRemoveFromBadge = () => {
    //     this.setState({
    //         buttonBadge: this.state.buttonBadge - 1
    //     })
    // }
    //
    // handleRemoveFromList = (product) => {
    //     let array = this.state.shoppingList
    //     array = array.filter((data) => data.toLowerCase() !== product.toLowerCase())
    //     this.handleRemoveFromBadge()
    //     this.setState({
    //         shoppingList: array
    //     })
    // }
    //
    // handleAddToBadge = () => {
    //     this.setState({
    //         buttonBadge: this.state.buttonBadge + 1
    //     })
    // }

    render() {
        return (

            <Router>
                <div>
                    <div className="ui small menu">
                        <Link to="/" className="item">
                            Home
                        </Link>
                        <Link to="/recipes" className="item">
                            Recipes
                        </Link>
                    </div>
                    <Route path="/recipes" render={(props) => <Recipe moviesLists={this.state.moviesLists}/> }  />
                </div>


            </Router>
        );
    }
}

export default App;
