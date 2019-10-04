import React, {Component} from 'react';

import MaterialTable from 'material-table';
import Grid from "@material-ui/core/Grid";



export default class MovieListDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Title', field: 'title' },
                { title: 'Year', field: 'year', type: 'numeric' },
                {
                    title: 'Genre',
                    field: 'genre',
                },
                { title: 'Rating', field: 'rating', type: 'numeric' },
            ],
            data: this.props.currentMovielist.movies,
        };

    }

    render()
    {
        return (
                <Grid item xs={7} sm={7}>
                    <MaterialTable
                        title={this.props.currentMovielist.name}
                        columns={this.state.columns}
                        data={this.state.data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...this.state.data];
                                        data.push(newData);
                                        this.setState({ ...this.state, data });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...this.state.data];
                                        data[data.indexOf(oldData)] = newData;
                                        console.log(newData)
                                        console.log(this.props.currentMovielist);
                                        console.log(this.updateMovie(newData._id, newData));
                                        this.setState({ ...this.state, data });
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...this.state.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        this.setState({ ...this.state, data });
                                    }, 600);
                                }),
                        }}
                    />
                    <hr/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div className="rate-wrapper">
                            <span className="title">Average Rate: </span>
                            <b className="value">{this.props.currentMovielist.averageRating ? this.props.currentMovielist.averageRating : 0}</b>
                        </div>

                        {/*<div>*/}
                        {/*    <button onClick={() => this.updateCollection()}>Update Table</button>*/}
                        {/*</div>*/}
                    </div>
                </Grid>
        );
    }

    updateCollection() {
        console.log(this.state)
    }

    updateMovie(id, body) {
        const moviesList = this.props.currentMovielist.movies.slice();
        moviesList.forEach(item => {
            if (item._id === id) {
                item = body;
                console.log("some item", item)
            }
        });

        console.log("movieLIst", moviesList)

        return moviesList;
    }

}
