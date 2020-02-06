import React, { Component } from 'react';
import HomeBar from './Components/HomeBar'
import StickyFooter from './StickyFooter'


class Home extends Component {
    render(){
    return (
        <div>

            <HomeBar/>
            
            <h1>Hello on my home page ... </h1>
            
            <StickyFooter/>
        
        </div> 
    )
  }
}
  export default Home;

