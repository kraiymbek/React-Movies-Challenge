import React, {Component} from 'react'
import EditableIngredient from './EditableIngredient'


class EditableIngredientList extends Component {
  render() {
    return (
      <div className="container">
        {
          this.props.listOfIngredients.map((data, index) => {
            return <EditableIngredient
                      ingredients={this.props.ingredients}
                      key={index}
                      data={data}
                      typesOfIngredients={this.props.typesOfIngredients}
                      removeIngredient={this.props.removeIngredient}
                      saveEditedIngredient={this.props.saveEditedIngredient}
                    />
          })
        }
      </div>
    );
  }
}

export default EditableIngredientList;
