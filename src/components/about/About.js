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
            <div className='about-page'>
                <Header />
                <div className='about-component'>
                    <div id='about-the-app'>
                    {/* <h1>Hello</h1> */}
                    <h1 className='tips'>Tips and Tricks:</h1>
                    <p className='tips'> * Don't limit yourself to normal images; choose a solid or textured background that will allow your words to shine</p>
                    <p className='tips'> * In fact, upload your favorite meme, or a simple image of a famous quote</p>
                    <p className='tips'> * Additionally, by adding and editing text, you can personalize your board to create a unique experience. Many find it useful to screenshot or save the webpage to utilize their dreamboard as desktop background or screensaver.</p>
                    <p className='tips'> * Utilize the drag and drop feature by clicking the button at the top of the page. This way you can position the images exactly how you imagined. From there, take a screenshot to save and share with friends!</p>
                    <p className='tips'> * Remember, this is your dreamboard, not ours. Feel free to explore the possibilites</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;
