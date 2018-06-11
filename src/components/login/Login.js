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
      register: false,
      username: '',
      password: '',
      name: '',
      email: '',
      message: '',
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
    this.setState({
      login: true
    })
  }

  submitLogin(){
    const { username, password } = this.state
    axios.post("/loggedin", {username, password}).then(res => {
      console.log(res)
      if(res.data.error){
        console.log('ERROR')
        this.setState({ message: res.data.error })
      } else {
        const user = res.data;
        this.props.login(user);
        this.props.history.push('/home')
      }
    }).catch(() => alert("You entered the wrong password or have not yet registered"))
  }

  submitRegister(){
    const { username, password, name, email } = this.state;
    const newUser = {
        name, 
        email,
        username,
        password
    }
        axios.post("/register", newUser).then(res => {
          console.log(res.data)
          if(res.data.error){
            this.setState({message: res.data.error})
          } else {
            const { id, email, name, username } = res.data[0];
            const user = {id, email, name, username}
            this.props.login(user);
            this.props.history.push('/home');
          }
          
        })
  }

  submit(e){
    if(e.key === 'Enter' || e.charCode === 13){
      if(!this.state.register){
        const { username, password } = this.state
        axios.post("/loggedin", {username, password}).then(response => {
          console.log(response.data)
          const user = response.data
          console.log('USER', user)
          this.props.login(user);
          this.props.history.push('/home')
        }).catch(() => alert("You entered the wrong password or have not yet registered! Please do so now."))
      } else {
        const { username, password, name, email } = this.state;
        const newUser = {
          name, 
          email,
          username,
          password
        }
        axios.post("/register", newUser).then(res => {
          console.log(res.data)
          if(res.data.error){
            this.setState({message: res.data.error})
          } else {
            const { id, email, name, username } = res.data[0];
            const user = {id, email, name, username}
            this.props.login(user);
            this.props.history.push('/home');
          }
        })
      }
      }
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

        <div className="login">
          {!this.state.login ? <button className="btn-login" onClick={() => this.logging()}>
            Login/Register
          </button> :
                
            this.state.register ? 
                <div className="input-group" onKeyPress={(e) => this.submit(e)}>
                    <div className="login-flex">
                      <div>
                        <input type='text' placeholder='Enter First Name' onChange={e => this.setState({name: e.target.value})}  />
                        <input type="text" placeholder='Enter Email' onChange={e => this.setState({email: e.target.value})} />
                      </div>

                      <div>
                        <input type="text" placeholder='Enter Username' onChange={e => this.setState({username: e.target.value})}/>
                        <input type="password" placeholder='Enter Password' onChange={e => this.setState({password: e.target.value})}/>
                      </div>
                    </div>
                        <div>
                          <button id='special' onClick={() => this.submitRegister()}>Register</button>
                          <button onClick={() => this.setState({register: false})}>Back to Login</button>
                          {this.state.message && <p style={{color: '#3bd4e2'}}>{this.state.message}</p>  }
                        </div>
                </div> 
            : 
                <div className="input-group" onKeyPress={(e) => this.submit(e)}>
                  <input type="text" placeholder='Enter Username' onChange={e => this.setState({username: e.target.value})}/>
                  <input type="password" placeholder='Enter Password' onChange={e => this.setState({password: e.target.value})}/>
                  <div>
                    <button onClick={() => this.submitLogin()}>Login</button>
                    <button id='special' onClick={() => this.setState({register: true})}>Register</button>
                    
                  </div>
                    {this.state.message && <p style={{color: '#3bd4e2', marginTop: '40px'}}>{this.state.message}</p>  }
                </div> 
                    

                  }
        </div>


          <img className='seize' src={logo} alt=''/> 

          <div className='about'>
              { this.state.about ? 
                <div className='text'>
                    <p className='login-text'>The digital vision board application that provides you, the user, an opportunity to gather a collection of images and design your future vision. Simply add an image by url, and save it to your account with relative ease.<br/>
                    <br/>
                    Log in to try it for yourself!<br/>
                    <br/>
                    Demo Login: username: demo@123.com, password: 123</p>
                </div> 
              : 
                <button className='about-btn' onClick={this.showAbout}>About</button>
              }
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
