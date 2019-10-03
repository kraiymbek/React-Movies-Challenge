import React, {Component} from 'react'
import { Accordion } from 'semantic-ui-react'
import MenuItem from './MenuItem'

class MenuList extends Component {

  render() {
    return (
      <Accordion styled style={{"width": "100%"}}>
        {
          this.props.menuListSearch.map((data, index) => {
            return <MenuItem
                      key={index}
                      data={data}
                      removeFromFavourites={this.props.removeFromFavourites}
                      favouritesList={this.props.favouritesList}
                      listOfIngredients={this.props.listOfIngredients}
                      onAddToBadge={this.props.onAddToBadge}
                      onRemoveFromBadge={this.props.onRemoveFromBadge}
                      onAddToShoppingList={this.props.onAddToShoppingList}
                      shoppingList={this.props.shoppingList}
                      onAddToFavourites={this.props.onAddToFavourites}
                  />
          })
        }
      </Accordion>
    )
  }
}

export default MenuList
