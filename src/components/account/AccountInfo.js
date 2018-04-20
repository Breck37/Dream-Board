import React, { Component } from "react";
import "../styles/Myboard.css";
import axios from "axios";
import { connect } from "react-redux";
import Header from "../header/Header";
import {login} from '../../ducks/reducer';


class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: []
    };
    this.showAccountInfo = this.showAccountInfo.bind(this);
    this.hideAccountInfo = this.hideAccountInfo.bind(this);
  }

  componentDidMount() {
    axios
      .get("/user-data")
      .then(response => {
        const username = response.data;
        // this.props.login(username);
      })
      .catch((err) => {
          console.log(err, 'user error')
        this.props.history.push("/loggedout");
      });
  }

  showAccountInfo(props) {
    const { id } = this.props.user;
    axios.get(`/mydreams/${id}`).then(response => {
      this.setState({
        account: response.data
      });
    });
  }

  hideAccountInfo() {
    this.setState({
      account: []
    });
  }

  render() {
    const { account } = this.state;
    return (
      <div>
        <Header />
      
        {account[0] ? (
          <div>
            <div className="user-info">
              <h4>{this.props.user.name}</h4>
              <h5>{this.props.user.email}</h5>
            </div>
            {account.map((elem, i) => {
              return (
                <div key={i} className="account-info-detail">
                  <h4>
                    <b>Image:</b>
                  </h4>
                  <h6>{elem.image_url}</h6>
                  <h4>
                    <b>/ Text:</b>
                  </h4>
                  <h6>{elem.image_text}</h6>
                  <h4>
                    <b>/ Category </b>
                  </h4>
                  <h6>{elem.category_name}</h6>
                </div>
              );
            })}
          </div>
        ) : null}
          <div className="account-info">
          <button className="myboard-btn" onClick={this.showAccountInfo}>
            Show Account Info
          </button>
          <button className="myboard-btn" onClick={this.hideAccountInfo}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {login})(AccountInfo);
