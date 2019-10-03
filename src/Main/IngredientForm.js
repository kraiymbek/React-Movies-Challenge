import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'

class IngredientForm extends Component {
  constructor(props) {
    super(props);
    let title = props.data ? props.data.name : ''
    let quantity = props.data ? props.data.number: ''

    this.state = {
      'title': title,
      'quantity': quantity,
    }
  }

  handleTitleChange = (e, data) => {
    this.setState({
      title: data.value
    })
  }

  handleQuantityChange = (e) => {
    let text = e.target.value
    if ((text[text.length - 1] >= '0' && text[text.length - 1] <= '9') || text === '') {
      this.setState({
        quantity: e.target.value
      })
    }
  }

  handleCancelClick = () => {
    this.props.data ? this.props.onEditState() : this.props.onOpenChange()
  }

  handleUpdateCreateClick = () => {
    let state = this.props.data ? false : true

    if (this.state.title.length > 0 && this.state.quantity.length > 0) {
      if (state) {
        this.props.onAddToList(this.state.title, this.state.quantity)
      }
      else {
        let data = {name: this.state.title, number: this.state.quantity, id: this.props.data.id}
        this.props.onSaveEditedIngredient(data)
        this.props.onEditState()
      }
    }
    else {
      alert("Ingredient or quantity is empty")
    }
  }

  render() {
    const options = []
    this.props.ingredients.map((data, index) => {
      let el = {key: index, text: data, value: data}
      return options.push(el)
    })

    const submitText = this.props.data ? 'Update' : 'Add';
     return (
       <div className='ui centered card' style={{"width": "100%"}}>
         <div className='content'>
           <div className='ui form'>
             <div className='ui two bottom attached fields'>
               <Dropdown onChange={this.handleTitleChange} placeholder='Ingredient' value={this.state.title} search selection options={options} />
               <input style={{"marginLeft": "5px"}} type='text' value={this.state.quantity} placeholder="Amount" onChange={this.handleQuantityChange} />
             </div>
             <div className='ui two bottom attached buttons'>
                 <button className='ui primary button' onClick={this.handleUpdateCreateClick}> {submitText}</button>
                 <div className="or"></div>
                 <button className='ui button' onClick={this.handleCancelClick}>Cancel</button>
             </div>
           </div>
         </div>
       </div>
     );
  }
}

export default IngredientForm;
