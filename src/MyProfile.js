import React from 'react';
import Header from './Header.js';
import './MyProfile.less';
import Select from 'react-select';

const optionsGender = [
    {
        value: 'men',
        label: 'Men'
    },
    {
        value: 'women',
        label: 'Women'
    }
];

const optionsBMR = [
    {
        value: 1.2,
        label: 'Little to no exercise'
    },
    {
        value: 1.375,
        label: 'Light exercise(1-3 days per week)'
    },
    {
        value: 1.55,
        label: 'Moderate exercise(3-5 days per week)'
    },
    {
        value: 1.725,
        label: 'Heavy exercise(6-7 days per week)'
    },
    {
        value: 1.9,
        label: 'Very heavy exercise(twice per day, extra heavy workouts)'
    }
];

const optionsUserWish = [
    {
        value: 'maintain',
        label: 'To maintain weight'
    },
    {
        value: 'gain',
        label: 'To gain weight'
    },
    {
        value: 'lose',
        label: 'To lose weight'
    }
];

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem('userInfo'));

        this.onChange = this.onChange.bind(this);
        this.onClickCalculate = this.onClickCalculate.bind(this);
        this.onSave = this.onSave.bind(this);
    
    }

    generateObject(weight, height, age, gender, BMR,  userWish, message, calories) {
        return {
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            BMR: BMR,
            userWish: userWish,
            message: message,
            calories: calories
        }
    }

    onChangeInput(inputName) {
        return (event) => {
            const newObject = {};
            newObject[inputName] = event.target.value;
            this.setState(newObject);
        }
    }

    onChange(selectName) {
        return (newValue) => {
            const newObject = {};
            newObject[selectName] = newValue;
            this.setState(newObject);
        }
    }
    

    onClickCalculate() {
        const {weight, height, age, gender, BMR, userWish} = this.state;
        let calories = 0;
        let message = '';
        if(weight > 0 && height > 0 && age >= 18 && userWish !== '' && BMR !== 0 && gender !== ''){
            if(gender.value === 'men') {
                calories = (10 * weight + 6.25 * height - 5 * age + 5) * BMR.value;
            }
            else {
                calories = (10 * weight + 6.25 * height - 5 * age - 161) * BMR.value;
            }
    
            if(userWish.value === 'lose') {
                calories = calories - 500;
                if(gender.value === 'women' && calories < 1200) {
                    message = `You need ${calories}/per day to lose 0.5kg in a week, but it is not safe to lose weight!`;
                }
                else if(gender.value === 'men' && calories < 1800) {
                    message = `You need ${calories}/per day to lose 0.5kg in a week, but it is not safe to lose weight!`;
                }
                else message = `You need ${calories}/per day to lose 0.5kg in a week.`;
            }
    
            if(userWish.value === 'gain') {
                calories = calories + 500;
                message = `You need ${calories}/per day to gain 0.5kg in a week.`;
            }
             if(userWish.value === 'maintain') {
                message = `You need ${calories}/per day to maintain your weight.`;
            }
    
            this.setState({
                calories: calories,
                message: message
            });
        }
        else {
            message = 'Please complete all the spaces and choose your options!';
            this.setState({
                message: message
            });
        }
        
        
    }

    onSave() {
        const {weight, height, age, gender, BMR,  userWish, message, calories} = this.state;
        const newObject = this.generateObject(weight, height, age, gender, BMR,  userWish, message, calories);
        localStorage.setItem('userInfo',JSON.stringify(newObject));

        this.onClickCalculate();
    }



    render() {
        const {weight, height, age, gender, BMR, userWish, calories, message} = this.state;
        return (
            <div>
                <Header path={this.props.match.path}/>
                <div className="container-for-details-container">
                    <div className="container-for-user-details">
                        <div className="title-for-user-calculator">Find your energy needs</div>
                        <div className="normal-inputs">
                            <div className="my-profile-input weight">
                                <label>Weight(kg):</label>
                                <input type='number' value={weight} onChange={this.onChangeInput('weight')} />
                            </div>
                            <div className="my-profile-input height">
                                <label>Height(cm):</label>
                                <input type='number' value={height} onChange={this.onChangeInput('height')}/>
                            </div>
                            <div className="my-profile-input">
                                <label>Age(years):</label>
                                <input type='number' value={age} onChange={this.onChangeInput('age')}/>
                            </div>
                        </div>
                        <div className="select">
                            <div className="select-input">
                                <Select classNamePrefix="prefix" value={gender} options={optionsGender} onChange={this.onChange('gender')} placeholder="Select gender" />
                            </div>
                            <div className="select-input bmr">
                            <Select classNamePrefix="prefix" value={BMR} options={optionsBMR} onChange={this.onChange('BMR')} placeholder="How active are you?" />
                            </div>
                            <div className="select-input" >
                            <Select classNamePrefix="prefix" value={userWish} options={optionsUserWish} onChange={this.onChange('userWish')} placeholder="What do you want to do?" />
                            </div>
                        </div>
                        <button className="calculate-button" onClick={this.onSave}>Save</button>
                        <button  className="calculate-button" onClick={this.onClickCalculate}>Calculate</button>
                        {
                            (calories !== 0 || message !=='') ? <div className="message">{message}</div> : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfile;