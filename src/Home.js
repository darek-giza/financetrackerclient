import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import lightblue from '@material-ui/core/colors/lightBlue'

const styles = {
  intro:{
    width: 'auto',
    height:'1024px',
    backgroundImage: 'url(' +require('./Images/intro_image.jpg')+')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color:lightblue[200],
    letterSpacing:'6px',
    fontSize:'140px',
    textAlign:'right',
    padding:'0px 40px 0px 0px',
    fontWeight:'bold',
  },
  link:{
    fontSize:'40px',
    color:'inherit',
    fontWeight:'normal',
  },
  description:{
    textAlign:'left',
    fontSize:'40px',
    padding:'440px 0px 0px 40px ',
    fontWeight:'normal'
  }
};

class Home extends Component {
    render(){
      const {classes} = this.props;
    return (
      <div className={classes.intro}>
            <span>Finance tracker</span><br/>
            <Link href="/signin" className={classes.link} color="primary">Log in here ..</Link>
            <div className={classes.description}>
              <p>Want to know where your money is?</p>
              <p>Log in, add your income and expenses and</p>
              <p>check what's going on your money ...?</p>
            </div>
      </div>
    )
    }
  }

  export default withStyles(styles)(Home);

