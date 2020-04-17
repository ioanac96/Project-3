import React from 'react';
import './App.less';
import Home from './Home.js';
import MyProfile from './MyProfile';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component {
  

  render() {  
    
    return (
      <Router>
        <div className="page">
          <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/my-profile" component={MyProfile}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
