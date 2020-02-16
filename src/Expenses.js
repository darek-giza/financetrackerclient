import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuAppBar from './Components/MenuAppBar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FormGroup,Container, Button, ButtonGroup} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import StickyFooter from './StickyFooter';
import {request} from './request';
import MaterialUIPickers from "./MaterialUIPickers"


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  button: {
      margin: theme.spacing(2),
  },
  cont: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
}));



class Expenses extends Component{

    state={
        date: new Date(),
        expenses:[]
    }

    constructor(props) {
        super();
        this.state={
            data: [],
            isLoaded: false,
        }
    }

    async componentDidMount(){
        const data = await request('http://localhost:8080/api/expenses');
        this.setState({
                    isLoaded: true,
                    data: data,
                });
            }

    cancelExpense = () =>document.getElementById("create-expense-form").reset();

    save = async() => {

          const expenses = await request('http://localhost:8080/api/expenses',{
            body: JSON.stringify({expenses}),
            method: 'POST' 
          });
        this.setState({expenses : body})  
          }; 

    render(){
        var {isLoaded, data, expenses}= this.state;
        const {classes} = this.props;

        if(!isLoaded){
            return <div>Loading ...</div>
        }else {

        return(  
             
            <React.Fragment>
                <MenuAppBar/>
                    <Container className={classes.cont} maxWidth="sm">
                        <form className={classes.root} noValidate autoComplete="off" id="create-expense-form"
                                onSubmit={this.handleSubmit}>
                            <div><h4>Add a new expense ...</h4></div>
                            <div>
                            <TextField type="text" id="type" label="Type of expense" onChange={this.handleChange} name="type"/></div>
                            <div>
                            <TextField type="text" id="amount" label="Amount" onChange={this.handleChange} name="amount"/></div>  
                            <div>
                            <TextField type="text" id="description" label="Description" onChange={this.handleChange} name="decription"/></div>
                            <div>
                            <MaterialUIPickers selected={this.state.date} onChange={this.handleChange}/></div>
                        </form>
                         <Button color="primary" variant="outlined" size="small" className={classes.button}
                         onClick={this.save} type="submit">Save</Button>{' '}
                         <Button color="secondary" variant="outlined" size="small" className={classes.button}
                         onClick={this.cancelExpense}>Cancel</Button>
                    </Container>

                       <h1>Statement of all expenses</h1>
                
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >#</TableCell>
                                <TableCell >Type of expenses</TableCell>
                                <TableCell >Amount</TableCell>
                                <TableCell >Description</TableCell>
                                <TableCell >Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map(expense =>{
                                return(
                                    <TableRow key={expense.id}>
                                        <TableCell component="th" > {expense.id}</TableCell>
                                        <TableCell>{expense.expensesType}</TableCell>
                                        <TableCell>{expense.amount}</TableCell>
                                        <TableCell>{expense.description}</TableCell>
                                        <TableCell>{expense.date}</TableCell>
                                    </TableRow>
                                )})}
                        </TableBody>
                    </Table>
                </TableContainer>
             <StickyFooter/>
            </React.Fragment>   
            
            
        )}}

}

export default withStyles(useStyles)(Expenses)
