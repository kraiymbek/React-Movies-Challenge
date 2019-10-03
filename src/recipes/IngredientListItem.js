import React, {Component} from 'react';

export default class IngredientListItem extends Component {

    render()
    {
        return (
            <div  className="row" style={{"marginTop": "10px"}}>

                                        <div className="col-8">
                                            <input type="text"
                                                   className="form-control"
                                                   ref="editIngredientName"
                                                   defaultValue={this.props.name}/>
                                        </div>

                                        <div className="col-2">
                                            <input type="number"
                                                   className="form-control"
                                                   ref="editIngredientAmount"
                                                   defaultValue={this.props.amount}/>
                                        </div>

                                        <div className="col-2">
                                            <button type="button" className="btn btn-danger">X</button>
                                        </div>
            </div>
        );
    }
}
