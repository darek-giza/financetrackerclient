import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuAppBar from './Components/MenuAppBar'
import "react-datepicker/dist/react-datepicker.css";
import {Button, Container} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {makeStyles, withStyles} from '@material-ui/core/styles';
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

    emptyExpense =
        {
           expensesType: null,
           amount:null,
           description:null,
           date:null
        };

    constructor(props){
        super(props)

        this.state={
            expenses: [],
            isLoaded: false,
            expense: this.emptyExpense
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }


    
    async componentDidMount(){
        const body = await request('http://localhost:8080/api/expenses');
        this.setState({
                    isLoaded: true,
                    expenses: body,
                });
            }

    handleSubmit = async(event)=>{
        try{
                    event.preventDefault();
                    const {expense} = this.state;
                    await request('http://localhost:8080/api/expenses',{
                    method:'POST',
                    body: JSON.stringify([expense])
                    })
                }catch(error){
                    console.log("Failed",error)
                }
                };

    cancelExpense = () =>document.getElementById("create-expense-form").reset();

    handleChange(event){
        const target = event.target;
        const value = target.value; 
        const name = target.name;
        let expense = {...this.state.expense};
        expense[name] = value;
        this.setState({expense});
    
    }

    handleDateChange(date){
        let expense={...this.state.expense};
        expense.date = date;
        this.setState({expense});

        console.log(this.state.expense.date)
    }

    render(){
        const {expenses,isLoaded}= this.state;
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
                            <TextField type="text" id="expensesType" label="Type of expense" onChange={this.handleChange} name="expensesType"/></div>
                            <div>
                            <TextField type="text" id="amount" label="Amount" onChange={this.handleChange} name="amount"/></div>  
                            <div>
                            <TextField type="text" id="description" label="Description" onChange={this.handleChange} name="description"/></div>
                            <div>
                            <MaterialUIPickers selected={this.state.expense.date} onChange={this.handleDateChange} id="date" name="date"/></div>
                        </form>
                         <Button color="primary" variant="outlined" size="small" className={classes.button}
                                 onClick={this.handleSubmit} type="submit">Save</Button>{' '}
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
                            {this.state.expenses.map(expense =>{
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
