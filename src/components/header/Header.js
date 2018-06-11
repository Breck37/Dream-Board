import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../styles/imageedit_3_4114329595.png';
import { connect } from 'react-redux';
import { login } from '../../ducks/reducer';
import axios from 'axios';

class Header extends Component {

    render() {
        return (
            <div className='main-header-container'>
                <div className='header responsive'>

                    <Link to='/home'><img className='logo' src={logo} alt=''/></Link>
                    <Link className='header-link' to='/accountInfo'><span>Welcome, { this.props.user.name || this.props.user.username }</span></Link>

                    <div className='links'>
                        <Link to='/mydreams' className='header-link'>My Board</Link>
                            <span className='dash'>|</span>
                        {/* <Link to='/alterdream' className='header-link'>Edit</Link> */}
                        <Link to='/uploaddream' className='header-link'>Upload</Link>
                            <span className='dash'>|</span>
                        <Link to='/contactus' className='header-link'>Contact</Link> 
                            <span className='dash'>|</span>
                        <Link to='/' className='header-link' onClick={this.logout}>Logout</Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { login })(Header);
