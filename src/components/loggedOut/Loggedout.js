import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../styles/imageedit_3_4114329595.png'


class Loggedout extends Component {
  
    render() {
        return (
            <div>
                <img src={logo} alt='' />
                <div>
                    <h1>Oops, you're not logged-in</h1>
                    <h2>Please click <Link to='/'>HERE</Link> to reach the Login page</h2>
                </div>
            </div>
        )
    }
}

export default Loggedout;
