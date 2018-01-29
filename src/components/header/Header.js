import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../styles/Header.css';
import logo from '../styles/imageedit_3_4114329595.png';
// import FaCloud from 'react-icons/lib/fa/cloud';
import {connect} from 'react-redux';

class Header extends Component {
//     constructor(){
//         super();
//         this.state = {
//             responsive: false
//         }
//         this.response = this.response.bind(this);
//     }

// response(){
//     this.setState({
//         responsive: true
//     })
// }
    render() {
        return (
            <div className='main-header-container'>
                <div className='header responsive'>
                <Link to='/home'><img className='logo' src={logo} alt=''/>
                </Link>
                <Link className='header-link' to='/accountInfo'><span>Hello, {this.props.user.name}</span></Link>
                <div className='links'>
                <Link to='/mydreams' className='header-link'>My Board</Link>
                <span className='dash'>|</span>
                {/* <Link to='/alterdream' className='header-link'>Edit</Link> */}
                <Link to='/uploaddream' className='header-link'>Upload</Link>
                <span className='dash'>|</span>
                <Link to='/tipsntricks' className='header-link'>Tips & Tricks</Link> 
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



export default connect(mapStateToProps)(Header);
