import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import logo from "../styles/imageedit_3_4114329595.png";
import "../styles/Login.css";
import { login } from "../../ducks/reducer";
import { connect } from "react-redux";
import Auth0Lock from "auth0-lock";
import axios from "axios";

let options = {
  theme: {
    logo: logo,
    primaryColor: "#c123dd",
    backgroundColor: "#cd39fa"
  },
  languageDictionary: {
    title: "Seize My Dream"
  }
};

class Login extends Component {
  constructor() {
    super();
    this.lock = null;
    this.login = this.login.bind(this);
  }

  //Creating Auth0 Functionality within Login Component
  componentDidMount() {
    this.lock = new Auth0Lock(
      process.env.REACT_APP_AUTH0_CLIENT_ID,
      process.env.REACT_APP_AUTH0_DOMAIN,
      options
    );
    this.lock.on("authenticated", authResult => {
      this.lock.getUserInfo(authResult.accessToken, (error, user) => {
        axios.post("/login", { userId: user.sub }).then(response => {
          this.props.login(response.data.user);
          this.props.history.push("/home");
        });
      });
    });
  }

  login() {
    this.lock.show();
  }

  render() {
    return (
      <div className="login-page">
        <img className='seize' src={logo} alt=''/>   
        <div className="login-box">
          <button className="btn-login" onClick={this.login}>
            Login/Register
          </button>
        </div>
      </div>
    );
  }
}

//Dispatches login data to Store/Reducer
const mapDispatchToProps = {
  login: login
};

export default connect(null, mapDispatchToProps)(Login);
