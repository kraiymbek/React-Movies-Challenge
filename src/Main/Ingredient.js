 import React, {Component} from 'react'

class Ingredient extends Component {
  render() {
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='meta'>Quantity</div>
          <div>{this.props.data.number}</div>
          <div className='center aligned description'>
            <h2>{this.props.data.name}</h2>
          </div>
          <div className='extra content'>
            <button className='right floated ui icon button' onClick={this.props.onEditState}>
              <i className='edit icon'/>
            </button>
            <button className="right floated ui icon button" onClick={() => this.props.onRemoveIngredient(this.props.data.id)}>
              <i className="trash icon"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Ingredient;
