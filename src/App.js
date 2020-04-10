import React from 'react';
import './App.css';
import Item from './Item.js'
import { searchRequest, nutrientsRequest } from './requests';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchInputValue: '',
      nutrients: [], 
      userItems: [],
      userEnergyKcal: 0,
      userEnergyKJ: 0,
      clickedAdd: false
    };

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd(currentItem, energyKcal, energyKJ) {
    const array = Object.assign([], this.state.userItems);
    array.push(currentItem);
    var sumKcal = ((Number.parseFloat(energyKcal,10)).toFixed(2))*1 + this.state.userEnergyKcal; 
    var sumKJ = parseFloat(energyKJ,10) + this.state.userEnergyKJ;
    this.setState({
      userItems: array,
      userEnergyKcal: sumKcal,
      userEnergyKJ: sumKJ,
      clickedAdd: true
    });
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
    const {items, nutrients, userEnergyKJ, userEnergyKcal, clickedAdd} = this.state;
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
            <div className="container-for-modal">
              {
                (clickedAdd === true) ? <div className="user-energy">You consumed {userEnergyKcal} Kcal/{userEnergyKJ} kJ today!</div> : null
              } 
            </div>
            {
              items.map((currentItem) => (
                  <Item  currentItem={currentItem} nutrients={nutrients} onAdd={this.onAdd}/>
              ))
            }
            </div>
            </div> : null   
          }
      </div>
    );
  }
}

export default App;
