import React from 'react';
import {
    Link
  } from "react-router-dom";

class Header extends React.Component {
    render() {
        console.log(this.props.path);
        const isON = (this.props.path === '/home') ? true : false; 
        console.log(isON);
        return(
            <div className="header">
                <div className="header-title">In love with food</div>
                <div className="links-header">
                    <Link to="/my-profile" className={(isON === false)? "header-link active" : "header-link"}>My Profile</Link>
                    <Link to="/home" className={(isON === true)? "header-link active" : "header-link"}>Home</Link>
                </div>
                
            </div>
        )
    }
}

export default Header;