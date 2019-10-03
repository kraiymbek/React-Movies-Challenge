import React, {Component} from 'react'
import IngredientForm from './IngredientForm'

class ToggleableIngredientForm extends Component {
  render() {
    if (this.props.isOpen) {
      return (
        <IngredientForm
          ingredients={this.props.ingredients}
          onOpenChange={this.props.onOpenChange}
          onAddToList={this.props.addToList}
        />
      );
    }
    else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className="ui blue labeled icon button" onClick={this.props.onOpenChange}>
            Add Ingredient
            <i className="add icon"></i>
          </button>
        </div>
      );
    }
  }
}

export default ToggleableIngredientForm;
