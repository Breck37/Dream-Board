import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import logo from "../styles/Untitled design.png";
import "../styles/Login.css";
import { login } from "../../ducks/reducer";
import { connect } from "react-redux";
// import Auth0Lock from "auth0-lock";
import axios from "axios";

// let options = {
//   theme: {
//     logo: logo,
//     primaryColor: "#c123dd",
//     backgroundColor: "#cd39fa"
//   },
//   languageDictionary: {
//     title: "Seize My Dream"
//   }
// };

class Login extends Component {
  constructor() {
    super();
    this.state = {
      about: false,
      login: false,
        username: '',
        password: '',
    }
    this.lock = null;
    // this.login = this.login.bind(this);
    this.showAbout = this.showAbout.bind(this);
  }

  //Creating Auth0 Functionality within Login Component
  // componentDidMount() {
  //   this.lock = new Auth0Lock(
  //     process.env.REACT_APP_AUTH0_CLIENT_ID,
  //     process.env.REACT_APP_AUTH0_DOMAIN,
  //     options
  //   );
  //   this.lock.on("authenticated", authResult => {
  //     this.lock.getUserInfo(authResult.accessToken, (error, user) => {
  //       console.log(user.sub)
  //       console.log(user)
  //       axios.post("/login", { userId: user.sub }).then(response => {
  //         this.props.login(response.data.user);
  //         this.props.history.push("/home");
  //       });
  //     });
  //   });
  // }

  logging(){
    console.log(this.state.login)
    this.setState({
      login: true
    })
  }

  submitLogin(){
    // console.log(this.state.username, this.state.password);
    const { username, password } = this.state
    axios.post("/loggedin", {username, password}).then(response => {
      const user = {username: response.data.username, id: response.data.id}
      console.log('USER', user)
      this.props.login(user);
      this.props.history.push('/home')
    })
  }


  showAbout(){
    this.setState({
      about: true
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className='login-component'>
      <div className="login-page">
      
          {!this.state.login ? <button className={this.state.about ? 'btn-min' : "btn-login"} onClick={() => this.logging()}>
            Login/Register
          </button> : null}

          {this.state.login ? <div>
                              
                              <input type="text" placeholder='Enter Username' onChange={e => this.setState({username: e.target.value})}/>
                              <input type="password" placeholder='Enter Password' onChange={e => this.setState({password: e.target.value})}/>
                              <button onClick={() => this.submitLogin()}>Login</button>
                              </div> : null}

      {/* </div> */}
      <div className='about'>
        {this.state.about ? 
        <div className='text'>
          {/* <h1 className='welcome'></h1> */}
        <p className='login-text'>The digital vision board application that provides you, the user, an opportunity to gather a collection of images and design your future vision. Simply add an image by url, and save it to your account with relative ease.</p><br/>
        <p className='login-text'>Log in to try it for yourself!</p><br/>
        <p className='login-text'>Demo Login: Username: demo@123.com, password: 123</p>
        </div> : <button className='about-btn' onClick={this.showAbout}>About</button>}
      </div>
      </div>
        <img className='seize' src={logo} alt=''/>   
      </div>
    );
  }
}

//Dispatches login data to Store/Reducer
const mapDispatchToProps = {
  login: login
};

export default connect(null, mapDispatchToProps)(Login);
