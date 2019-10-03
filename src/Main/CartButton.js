import React, { Component } from 'react'

class CartButton extends Component {

  isInShopList = (product) => {
    let array = this.props.shoppingList
    if (array) {
      array = array.filter((data) => data.toLowerCase() === product.toLowerCase())
      if (array.length !== 0) {
        return true
      }
      return false
    }
  }

  render() {
    if (this.isInShopList(this.props.item)) {
      return (
        <button className="ui icon button green" onClick={() => this.props.onAddToShoppingList(this.props.item, true)}>
          <i className="cart icon"></i>
        </button>
      )
    }
    else {
      return (
        <button className="ui icon button" onClick={() => this.props.onAddToShoppingList(this.props.item, true)}>
          <i className="cart icon"></i>
        </button>
      )
    }
  }
}

export default CartButton
