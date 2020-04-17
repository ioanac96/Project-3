import React from 'react';
import {
    Link
  } from "react-router-dom";

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                    <h3>In love with food</h3>
                    <Link to="/home">Home</Link>
                    <Link to="/my-profile">My Profile</Link>
             </div>
        )
    }
}

export default Header;