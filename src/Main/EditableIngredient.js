import React, {Component} from 'react'
import Ingredient from './Ingredient'
import IngredientForm from './IngredientForm'

class EditableIngredient extends Component {
  constructor() {
    super()
    this.state = {
      isEdited: false
    }
  }

  handleEditState = () => {
    this.setState({
      isEdited: !this.state.isEdited
    })
  }

  render() {
    if (!this.state.isEdited) {
      return (
        <Ingredient
          data={this.props.data}
          onRemoveIngredient={this.props.removeIngredient}
          onEditState={this.handleEditState}
        />
      );
    }
    else {
      return (
        <IngredientForm
          ingredients={this.props.ingredients}
          onOpenChange={this.props.onOpenChange}
          onEditState={this.handleEditState}
          data={this.props.data}
          onSaveEditedIngredient={this.props.saveEditedIngredient}
        />
      );
    }
  }
}

export default EditableIngredient;
