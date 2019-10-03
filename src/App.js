import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import MoviesLists from './containers/MoviesLists/MoviesLists';
import Layout from './hoc/Layout/Layout';


export default class App extends Component {
  // state = { username: null };

  componentDidMount() {
    // fetch('/api/getUsername')
    //   .then(res => res.json())
    //   .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
        <div>
          <Layout>
            <Switch>
              <Route path="/" exact component={MoviesLists} />
            </Switch>
          </Layout>
        </div>
    );
  }
}

