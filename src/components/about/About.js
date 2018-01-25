import React, { Component } from 'react';
import Header from '../header/Header';
import '../styles/About.css';

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className='about'>
                <Header />
                <div className='about-component'>
                    <div id='about-the-app'>
                    <h1>About the App</h1>
                    <p>Seize My Dream is a digital dreamboard application that provides you, the user, an opportunity to gather a collection of images and design your future vision. Simply add an image by url, and save it to your account with relative ease.<br/></p><p>Additionally, by adding and editing text, you can personalize your board to create a unique experience. Many find it useful to screenshot or save the webpage to utilize their dreamboard as desktop background or screensaver.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;
