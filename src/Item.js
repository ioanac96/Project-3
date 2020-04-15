import React from 'react';
import './Item.less';

const essentials = ["Protein", "Total lipid (fat)", "Carbohydrate, by difference", "Water", "Calcium, Ca", "Iron, Fe", "Magnesium, Mg", "Sugars, total"];

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValues: [],
            value: "1"
        }

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
    }

    generateObject(name, quantity, unit) {
        return {
        name: name,
        quantity: quantity,
        unit: unit
        };
    }

    onChangeQuantity(event) {
        const inputs = Object.assign([], this.state.inputValues);
        inputs.push(event.target.value);
        this.setState({
          inputValues: inputs,
          value: event.target.value
        });
      }

    render() { 
        const {currentItem, nutrients} = this.props;
        const nutrientsList = currentItem.full_nutrients.map((currentNutrient) => {
        const foundNutrient = nutrients.find(nutrient => (nutrient.attr_id === currentNutrient.attr_id && currentNutrient.value !== 0));
        if(foundNutrient === undefined) return null;
        return this.generateObject(foundNutrient.usda_nutr_desc, currentNutrient.value, foundNutrient.unit);
        }).filter(nutrient => nutrient !== null);

        const energyKcal = nutrientsList.find(nutrient => (nutrient.name === "Energy" && nutrient.unit === "kcal"));
        const energyKJ = nutrientsList.find(nutrient => (nutrient.name === "Energy" && nutrient.unit === "kJ"));
        const newNutrientsList = nutrientsList.filter( nutrient => nutrient.name !== "Energy");
        const essentialNutrients = newNutrientsList.filter(nutrient => essentials.indexOf(nutrient.name) !== -1);
        
        return (
        <div className="single-item">
            <div className="top-part">
                <div className="left-part">
                    <div className="item-title">{this.props.currentItem.food_name}</div>
                    {
                        (energyKcal !== undefined && energyKJ !== undefined) ? 
                        <div className="energy">Energy: {energyKcal.quantity} {energyKcal.unit}/{energyKJ.quantity} {energyKJ.unit}</div> :
                        ((energyKJ !== undefined) ? <div className="energy">Energy: {energyKJ.quantity} {energyKJ.unit}</div> :
                        <div className="energy">Energy: {energyKcal.quantity} {energyKcal.unit}</div>)

                    }
                </div>
                <img alt="item" src={this.props.currentItem.photo.thumb} /> 
            </div>
            <div className= "nutrients-table">
            {
                essentialNutrients.map((currentItem,index) => (
                <table  key={`${currentItem.tag_id}${index}`} className="nutrient">
                    <tbody>
                    <tr>
                        <td>{currentItem.name}: </td>
                        <td>{currentItem.quantity}</td>
                        <td>{currentItem.unit}</td>
                    </tr>
                    </tbody>
                </table>
                ))
            }
            </div>
            <div className="add">
                <input className="add-input" type="text" value={this.state.value} onChange={this.onChangeQuantity} />
                <div className="add-unit">x 100g/ml</div>
                <button onClick={()=> {
                    (energyKJ !== undefined) ? this.props.onAdd(currentItem, energyKcal.quantity, energyKJ.quantity,this.state.value): this.props.onAdd(currentItem, energyKcal.quantity, 0,this.state.value)}}>Add</button>
            </div>
            
        </div>
        );
    }
    }

  export default Item;