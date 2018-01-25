import React, { Component } from "react";
import Header from "../header/Header";
import axios from 'axios';
import {login} from '../../ducks/reducer';
import {connect} from 'react-redux';
import '../styles/Upload.css';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
          url: '',
          text: '',
    };
    this.updateText = this.updateText.bind(this);
    this.saveImage = this.saveImage.bind(this);
  }

  componentDidMount(props){
    axios.get('/user-data').then(response => {
      const user = response.data
      this.props.login(user)
      const {id} = this.props.match.params
      axios.get(`/alterdream/${id}`).then(response => {
        const {image_url, image_text} = response.data[0];
        this.setState({
          url: image_url,
          text: image_text,
        })
      })
    }).catch(() => {
      this.props.history.push('/')
    });
  }

updateText(e){
  this.setState({
    text: e.target.value
  })
  console.log(this.state.text)
}

saveImage(props){
  const {id} = this.props.match.params
  console.log(id, 'yep');
  console.log(this.state.text, 'text')
  axios.patch(`/alterdream/${this.state.text}/${id}`).then(
    this.props.history.push(`/mydreams`))
}

  render() {
    const {url, text} = this.state;
    let $imagePreview = null;
    if (url){
      $imagePreview = <img className='upload-img' src={url} alt='' />;
    } else {
      $imagePreview = (
        <div className='previewText'>Please select an Image for Preview</div>
      );
    }
    return (
      <div className='component'>
          <Header />
          <div className='previewComponent'>
          {/* <div> */}
          <div className="imgPreview">
          {$imagePreview}</div>
          {/* </div> */}
          <input value={text} onChange={(e) => this.updateText(e)}/>
          <button className='home-btn'onClick={this.saveImage}>Save</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {login})(Edit);
