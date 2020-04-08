import React from 'react';
import './App.css';
import { searchRequest, nutrientsRequest } from './requests';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchInputValue: '',
      nutrients: []
    };

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChangeSearch(event) {
    this.setState({
      searchInputValue: event.target.value
    });

  }

  onSearch() {
    searchRequest(this.state.searchInputValue)
    .then(data => {
      this.setState({
        items: data.common
      });
    });
  }

  componentDidMount() {
    nutrientsRequest()
    .then(data => {
      this.setState({
        nutrients: data
      });
    });
  }

  render() {
    console.log(this.state.items);
    const {items, nutrients} = this.state;
    return (
      <div className="page">
        <div className="header">
            <h3>In love with food</h3>
        </div>
        <div className="search-part">
          <button onClick={this.onSearch}>Search</button>
          <input onChange={this.onChangeSearch} />
        </div>
        {
          (items.length > 0)? 
          <div className="outside">
            <div className="container-for-items"> 
            {
              items.map((currentItem) => (
                  <Item currentItem={currentItem} nutrients={nutrients} />
              ))
            }
            </div>
            </div> : null   
          }
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);

  }

  generateObject(name, quantity, unit) {
    return {
      name: name,
      quantity: quantity,
      unit: unit
    };
  }


  render() {
    
    const {currentItem, nutrients} = this.props;
    const nutrientsList = currentItem.full_nutrients.map((currentNutrient) => {
      const foundNutrient = nutrients.find(nutrient => nutrient.attr_id === currentNutrient.attr_id);
      if(foundNutrient === undefined) return null;
      return this.generateObject(foundNutrient.usda_nutr_desc, currentNutrient.value, foundNutrient.unit);
    }).filter(nutrient => nutrient !== null);

    return (
      <div className="single-item">
        <div className="top-part">
          <div className="item-title">{this.props.currentItem.food_name}</div>
          <img alt="item" src={this.props.currentItem.photo.thumb} /> 
        </div>
        <div className= "nutrients-table">
        {
            nutrientsList.map((currentItem) => (
              <table>
                <tbody>
                  <tr>
                    <td>{currentItem.name}</td>
                    <td>{currentItem.quantity}</td>
                    <td>{currentItem.unit}</td>
                  </tr>
                </tbody>
              </table>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
