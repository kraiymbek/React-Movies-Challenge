import React, {Component} from 'react'
import { Rating } from 'semantic-ui-react'

class FavouriteButton extends Component {

  checkForFavourites = () => {
    let favor = this.props.favouritesList
    favor = favor.filter((item) => item.id === this.props.data.id)
    let state = false
    if (favor.length !== 0) {
      state = true
    }
    return state
  }

  render() {
    if (this.checkForFavourites()) {
      return (
        <Rating onClick={() => this.props.onRemoveFromFavourites(this.props.data.id)} icon='heart' size="large" defaultRating={1} maxRating={1} />
      )
    }
    else {
      return (
        <Rating onClick={() => this.props.onAddToFavourites(this.props.data)} icon='heart' size="large" defaultRating={0} maxRating={1} />
      )
    }
  }
}

export default FavouriteButton
