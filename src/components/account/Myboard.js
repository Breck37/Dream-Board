import React, { Component } from "react";
import axios from "axios";
import Grid from 'react-grid-layout';
import Masonry from "react-masonry-component";
import { connect } from "react-redux";
import Header from "../header/Header";
import "../styles/Myboard.css";
// import Masonry from 'react-masonry-css';
import {Link} from 'react-router-dom';
import {login} from '../../ducks/reducer';

class Myboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      grid: false,
      // id: null,
      // url: '',
      // text: '',
    };
    this.deleteImage = this.deleteImage.bind(this);
    this.handleGrid = this.handleGrid.bind(this);
    this.backToMason = this.backToMason.bind(this);
  }
  componentDidMount(props) {
    axios.get('/user-data').then(response => {
      const user = response.data
      this.props.login(response.data)
      axios.get(`/myimages/${user.id}`).then(response => {
        const image = response.data;
        console.log(image);
        this.setState({
          contents: image
        });
      });
    }).catch(() => {
      this.props.history.push('/')
    });
  }

  deleteImage(id){
    axios.delete(`/deletedream/${id}/${this.props.user.id}`).then(response => {
      this.setState({
        contents: response.data
      })
    })
  }

  handleGrid() {
    this.setState({
      grid: true
    });
  }

  backToMason() {
    this.setState({
      grid: false
    });
  }

  render() {
    const { contents } = this.state;
    return (
      <div className='myboard-component'>
        <Header />
        <div className='board-background'>
          <div className='buttons'>
              <button className='myboard-btn' onClick={this.handleGrid}>
              Click Here for Drag and Drop
              </button>
            
              <button className='myboard-btn' onClick={this.backToMason}>Reset</button>
          </div>
        </div>
        <div id="tile-background">
        {this.state.grid ? (
                <Grid>
                {contents.map((elem, i) => {
                  // {console.log('element', elem)}
                  return (
                    <div key={i} className='tiles'>
                      <img
                        onClick={this.imageClick}
                        src={elem.image_url}
                        alt="display"
                        className="image"
                      />
                      <h2 className="image-texts">
                        <span>{elem.image_text}</span>
                      </h2>
                      </div>
                  );
                })}
              </Grid>
              ) : (
          <Masonry className='t-board'>
          {contents.map((elem, i) => {
            return (
              <div key={i} className='tiles'>
                <img
                  onClick={this.imageClick}
                  src={elem.image_url}
                  alt="display"
                  className="image"
                />
                <button className='delete-btn' onClick={() => {this.deleteImage(elem.id)}}>DELETE</button>
                  <Link to={`/alterdream/${elem.id}`}><button className='edit-btn'>EDIT</button></Link>
                <h2 className="image-texts">
                  <span>{elem.image_text}</span>
                </h2>
              </div>
            );
          })}
        </Masonry>
        )}
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

export default connect(mapStateToProps, {login})(Myboard);
