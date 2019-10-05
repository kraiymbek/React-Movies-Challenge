import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Movie from "./Movie/Movie";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Imdb from "./Movie/Imdb";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        }

    }

    render() {
        return (
            <Router>
                <BottomNavigation
                    value={this.state.value}
                    onChange={(event, newValue) => {
                        this.setState({value: newValue});
                    }}
                    showLabels
                >
                    <BottomNavigationAction label="Imdb" to="/" component={Link}  />
                    <BottomNavigationAction label="MovieList" to="/movieList" component={Link} />
                </BottomNavigation>
                <hr/>
                <Route path="/" exact render={(props) => <Imdb/> }  />
                <Route path="/movieList" render={(props) => <Movie/> }  />
            </Router>
        );
    }
}

export default App;
