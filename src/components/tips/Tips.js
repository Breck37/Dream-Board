import React, { Component } from 'react';
import Header from '../header/Header';
import '../styles/Tips.css';
import screenshot from '../styles/SeizeScreenshot.png';
import {connect} from 'react-redux';
import axios from 'axios';
import {login} from '../../ducks/reducer'

class Tips extends Component {
  
    componentDidMount(){
        if(this.props.user){
            
          } else {
            axios.get('/user-data').then(response => {
              // const user = response.data
              this.props.login(response.data)
              console.log('lost')
            }).catch(() => {
              this.props.history.push('/loggedout')
            });
          } 
    }

    render() {
        return (
            <div className='about-page'>
                <Header />
                <div className='about-component'>
                    <div id='about-the-app'>
                    <h1 className='tips'>Tips and Tricks:</h1>
                    <p className='tips'> * Don't limit yourself to normal images; choose a solid or textured background that will allow your words to shine.</p>
                    <p className='tips'> * In fact, upload your favorite meme, or a simple image of a famous quote.</p>
                    <p className='tips'> * Additionally, by adding and editing text, you can personalize your board to create a unique experience. Many find it useful to screenshot or save the webpage to utilize their dreamboard as desktop background or screensaver.</p>
                    <p className='tips'> * Utilize the drag and drop feature by clicking the button at the top of the page. This way you can position the images exactly how you imagined. From there, take a screenshot to save and share with friends!</p>
                    <img src={screenshot} alt='display' className='screen'/>
                    <p className='tips'> * Remember, this is your dreamboard, not ours. Feel free to explore the possibilites.</p>
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

export default connect(mapStateToProps, {login})(Tips);
