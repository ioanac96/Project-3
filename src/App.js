import React from 'react';
import './App.css';
import Item from './Item.js'
import { searchRequest, nutrientsRequest } from './requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchInputValue: '',
      nutrients: [], 
      userItems: [],
      userEnergyKcal: 0,
      userEnergyKJ: 0
      
    };

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onClose = this.onClose.bind(this);
  }
  
  onClose(clickedIndex, energyKcal, energyKJ) {
     const newUserItems = this.state.userItems.filter((currentItem, index) => index !==clickedIndex );
     const newEnergyKcal = this.state.userEnergyKcal - energyKcal;
     const newEnergyKJ = this.state.userEnergyKJ - energyKJ;
     this.setState({
       userItems: newUserItems,
       userEnergyKcal: newEnergyKcal,
       userEnergyKJ: newEnergyKJ
     });
     console.log("Kcal:",energyKcal, "KJ:", energyKJ);
     console.log("NKcal:",newEnergyKcal, "NKJ:", newEnergyKJ);
     console.log(newUserItems);
  }

  generateUserList(item, quantity, energyKcal, energyKJ) {
    return {
      item: item,
      quantity: quantity,
      energyKcal: energyKcal * quantity,
      energyKJ: energyKJ * quantity 
    };
  }
  

  onAdd(currentItem, energyKcal, energyKJ, quantity) {
    const item = this.generateUserList(currentItem, quantity, energyKcal, energyKJ);
    const array = Object.assign([], this.state.userItems);
    array.push(item);
    var sumKcal = (((Number.parseFloat(item.energyKcal,10)).toFixed(2))*1 + this.state.userEnergyKcal); 
    var sumKJ = (Number.parseFloat(item.energyKJ,10) + this.state.userEnergyKJ) ; 
    this.setState({
      userItems: array,
      userEnergyKcal: sumKcal,
      userEnergyKJ: sumKJ
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
    const {searchInputValue, items, nutrients, userEnergyKJ, userEnergyKcal, clickedAdd, userItems} = this.state;
    return (
      <div className="page">
        <div className="header">
            <h3>In love with food</h3>
        </div>
        <div className="search-part">
          <button onClick={this.onSearch}>Search</button>
          <input value={searchInputValue} onChange={this.onChangeSearch} />

        </div>
        {
          (items.length > 0)? 
          <div className="outside">
            <div className="container-for-items"> 
            <div className="container-for-modal">
              {
                (userItems.length !== 0) ? 
                <div>
                  <div className="user-energy">You consumed {userEnergyKcal} Kcal/{userEnergyKJ} kJ today!</div>
                  <div className="user-list">
                  {
                    userItems.map((currentItem, index) => {
                      return (
                        <div className="list-item">	
                          <div className="delete-item">
                            <FontAwesomeIcon icon={faTimesCircle} onClick={() => {this.onClose(index, currentItem.energyKcal, currentItem.energyKJ)}} />
                          </div> 
                          <div>{currentItem.item.food_name}: {currentItem.quantity}x100 g/ml {currentItem.energyKcal} Kcal/{currentItem.energyKJ} KJ </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div> : null
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
