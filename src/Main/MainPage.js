import React, {Component} from 'react'
import './css/main.css'
import EditableIngredientList from './EditableIngredientList'
import ToggleableIngredientForm from './ToggleableIngredientForm'
import MenuList from './MenuList'

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfIngredients: props.listOfIngredients,
      isOpen: false,
      ingredients: props.ingredients,
      menuList: this.props.menuList,
      menuListSearch: []
    }
  }

  componentDidMount() {
    this.findMenu(this.state.listOfIngredients)
  }

  findMenu = (list) => {
    let menuList = this.state.menuList
    let newList = []
    for (let i = 0; i < menuList.length; i++) {
      var counter = 0
      for (let j = 0; j < list.length; j++) {
        let checkList = menuList[i].ingredients.filter((data) => data.name.toLowerCase() === list[j].name.toLowerCase())
        if (checkList.length > 0) {
          counter += 1
        }
      }
      if (counter > 0) {
        let data = {cnt: counter, list: menuList[i]}
        newList.push(data)
      }
    }
    newList = newList.sort((a, b) => b.cnt - a.cnt)
    var newAns = []
    for (let i = 0; i < newList.length; i++) {
      newAns.push(newList[i].list)
    }
    newAns = list.length > 0 ? newAns : menuList
    this.setState({
      menuListSearch: newAns,
      isOpen: false,
      listOfIngredients: list
    })
    this.props.updateIngredientsOfList(list)
  }

  addToList = (name, number) => {
    let list = this.state.listOfIngredients
    let filtered = list.filter((data) => data.name === name)
    if (filtered.length === 0) {
      list.push({
        id: guid(),
        name: name,
        number: number,
      })
      this.findMenu(list)
    }
  }

  removeIngredient = (id) => {
    let list = this.state.listOfIngredients.filter((data) => data.id !== id)
    this.findMenu(list)
  }

  getIndexById = (id) => {
    let list = this.state.listOfIngredients
    let index = 0
    for (let ind = 0; ind < list.length; ind++) {
      if (list[ind].id === id) {
        index = ind
        break
      }
    }
    return index
  }

  saveEditedIngredient = (data) => {
    let list = this.state.listOfIngredients
    let index = this.getIndexById(data.id)
    list[index].number = data.number
    list[index].name = data.name
    this.findMenu(list)
  }

  handleChangeOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  searchIngredientsByName = (name) => {
    let list = this.state.ingredients.filter((data) => {
      return data.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
    this.setState({
      searchList: list
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <EditableIngredientList
              typesOfIngredients={this.props.typesOfIngredients}
              saveEditedIngredient={this.saveEditedIngredient}
              listOfIngredients={this.state.listOfIngredients}
              removeIngredient={this.removeIngredient}
              ingredients={this.state.ingredients}
            />
            <ToggleableIngredientForm
              typesOfIngredients={this.props.typesOfIngredients}
              isOpen={this.state.isOpen}
              addToList={this.addToList}
              onOpenChange={this.handleChangeOpen}
              ingredients={this.state.ingredients}
            />
          </div>
          <div className="col-md-8">
            <MenuList
              typesOfIngredients={this.props.typesOfIngredients}
              removeFromFavourites={this.props.removeFromFavourites}
              favouritesList={this.props.favouritesList}
              onAddToFavourites={this.props.addToFavourites}
              shoppingList={this.props.shoppingList}
              onAddToBadge={this.props.onAddToBadge}
              onRemoveFromBadge={this.props.onRemoveFromBadge}
              onAddToShoppingList={this.props.onAddToShoppingList}
              listOfIngredients={this.state.listOfIngredients}
              menuListSearch={this.state.menuListSearch}
              ingredients={this.state.ingredients}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
