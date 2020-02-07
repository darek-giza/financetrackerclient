import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import lightblue from '@material-ui/core/colors/lightBlue'

const styles = {
  intro:{
    width: '100%',
    height:'900px',
    backgroundImage: 'url(' +require('./Images/intro_image.jpg')+')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color:lightblue[200],
    // 
    letterSpacing:'20px',
    fontSize:'90px',
    textAlign:'right',
  },
  button:{
    fontSize:'50px',
    color:'inherit',
    textTransform:'lowercase',
  },
  description:{
    fontSize:'10px',
    textAlign:'left',
    letterSpacing:'2px',
    fontSize:'24px',
    marginBottom:'100px',
    padding:'480px 0px 0px 70px '

  }
};

class Home extends Component {
    render(){
      const {classes} = this.props;
    return (
      <div className={classes.intro}>
            <span>Finance tracker</span><br/>
            <a><Link href="/signin" className={classes.button} color="primary">Log in here ... </Link></a>
                  <br/>
            <div className={classes.description}>
                      Want to know where your money is?<br/>
                      Log in, add your income and expenses and <br/>
                      check what's going on your money.<br/>
                      You will find that a good life costs a lot ...<br/>
                      Will you see if you can plan any extra expenses for the next month?<br/>
                      I hope you have enough money for your next payment.     
            </div>
      </div>
    )
    }
  }

  export default withStyles(styles)(Home);

