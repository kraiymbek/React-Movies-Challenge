import React, {Component} from 'react'
import { Label } from 'semantic-ui-react'
import CartButton from './CartButton'

class MenuIngredientsList extends Component {

  isInFridge = (product) => {
    let list = this.props.listOfIngredients
    let state = false
    for (let i = 0; i < list.length; i++) {
      if (list[i].name.toLowerCase() === product.toLowerCase()) {
        state = true
        break
      }
    }
    return state
  }

  render() {
    return (
      <div className="ui piled segments">
          {
            this.props.data.ingredients.map((item, index) => {
              if (this.isInFridge(item.name)) {
                return  <div key={index} className="ui segment">
                          <div className="column">
                            <div className="row">
                              <div className="col-md-2">
                                {item.name.toUpperCase()}
                              </div>
                              <div className="col-md-9">
                                <Label as='a' tag> In fridge </Label>
                              </div>
                              <div className="col-md-1" style={{"marginLeft": "-15px"}}>
                                <CartButton item={item.name}
                                            onAddToShoppingList={this.props.onAddToShoppingList}
                                            shoppingList={this.props.shoppingList}
                                />
                              </div>
                            </div>
                          </div>
                       </div>
              }
              else {
                return <div key={index} className="ui segment">
                          <div className="column">
                            <div className="row">
                              <div className="col-md-11">
                                {item.name.toUpperCase()}
                              </div>
                              <div className="col-md-1" style={{"marginLeft": "-15px"}}>
                                <CartButton item={item.name}
                                            onAddToShoppingList={this.props.onAddToShoppingList}
                                            shoppingList={this.props.shoppingList}
                                />
                              </div>
                            </div>
                          </div>
                       </div>
              }
            })
          }
      </div>
    )
  }
}

export default MenuIngredientsList
