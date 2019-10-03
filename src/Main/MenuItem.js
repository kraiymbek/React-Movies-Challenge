import React, {Component} from 'react'
import { Accordion, Icon, Rating} from 'semantic-ui-react'
import MenuIngredientsList from './MenuIngredientsList'
import FavouriteButton from './FavouriteButton'

class MenuItem extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <div>
        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <div className="column">
            <div className="row">
              <div className="col-md-1">
                <Icon name='dropdown'/>
              </div>
              <div className="col-md-2">
                <img className="ui large circular image" src={this.props.data.imgPath} alt=''/>
              </div>
              <div className="col-md-7">
                <p style={{"fontSize": "16px"}}>{this.props.data.name}</p>
                <p> Desert </p>
              </div>
              <div className="col-md-2">
                <Icon name="clock"/>
                {this.props.data.time}
              </div>
            </div>
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <div className="column">
            <br/>
            <div className="row">
              <div className="col-md-11">
                <Rating maxRating={5} defaultRating={3} icon='star' />
              </div>
              <div className="col-md-1">
                <FavouriteButton
                  onAddToFavourites={this.props.onAddToFavourites}
                  favouritesList={this.props.favouritesList}
                  onRemoveFromFavourites={this.props.removeFromFavourites}
                  data={this.props.data}
                />
              </div>
            </div>
            <br />
          </div>
          <div> {this.props.data.description} </div>
          <div style={{"fontSize": "20px", "marginTop": "20px"}}> Ingredients: </div>
          <MenuIngredientsList
            data={this.props.data}
            listOfIngredients={this.props.listOfIngredients}
            onAddToBadge={this.props.onAddToBadge}
            onRemoveFromBadge={this.props.onRemoveFromBadge}
            onAddToShoppingList={this.props.onAddToShoppingList}
            shoppingList={this.props.shoppingList}
          />
        </Accordion.Content>
      </div>
    )
  }
}

export default MenuItem
