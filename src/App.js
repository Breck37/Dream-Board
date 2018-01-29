import React, { Component } from 'react';
import './App.css';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Upload from './components/upload/Upload';
import MyBoard from './components/account/Myboard';
import Edit from './components/edit/Edit';
import Tips from './components/tips/Tips';
import {Route, Switch} from 'react-router-dom';
import Loggedout from './components/loggedOut/Loggedout';
import AccountInfo from './components/account/AccountInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/(access_token.*)?' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/alterdream/:id' component={Edit} />
          <Route path='/mydreams' component={MyBoard} />
          <Route path='/uploaddream' component={Upload} />
          <Route path='/loggedout' component={Loggedout} />
          <Route path='/tipsntricks' component={Tips} />
          <Route path='/accountinfo' component={AccountInfo} />
          </Switch>
      </div>
    );
  }
}

export default App;


// <header className="App-header">
// <img src={logo} className="App-logo" alt="logo" />
// <h1 className="App-title">Welcome to the Dream Machine</h1>
// </header>
// <p className="App-intro">
// You have to start somewhere.
// <Login />
// </p>