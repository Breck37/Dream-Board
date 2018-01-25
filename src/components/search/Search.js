import React, { Component } from 'react';
import Header from '../header/Header';
import './Searc.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {login} from '../../ducks/reducer';

class Class extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
componentDidMount(){
    axios.get('/user-data').then(response => {
        const user = response.data
        this.props.login(response.data)
      }).catch(() => {
        this.props.history.push('/loggedout')
      });
      (function() {
        var cx = '000884306774659940909:wm6fqdrxlc0';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      })();

    
}
  
    render() {
        
        return (
            <div className='search-component'>
                <Header />
                {/* <div className='gcse-searchbox' data-resultsURL='http://seizemydream.com/search' data-newWindow='false' data-queryParameterName='search'></div> */}
            {/* <div><gcse:search><input /></gcse:search></div> */}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        login
    }
}
export default connect(mapStateToProps, {login})(Class)
