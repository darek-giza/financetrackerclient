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
import moment from "moment"
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
      margin: theme.spacing(2),
  },
  cont: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  
class Expenses extends Component{

    emptyExpense =
        {
           expensesType: null,
           amount:null,
           description:null,
           date:new Date()
        };
    emptyType={
            description: null,
        };

    constructor(props){
        super(props)

        this.state={
            expenses: [],
            types: [],
            isLoaded: false,
            expense: this.emptyExpense,
            type: this.emptyType
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getExpenses = this.getExpenses.bind(this);
        this.getTypes = this.getTypes.bind(this);
    }

    getExpenses = async()=>{
        const body = await request('http://localhost:8080/api/expenses');
            this.setState({
                        isLoaded: true,
                        expenses: body,
                    });
    }
    getTypes = async()=>{
        const types = await request('http://localhost:8080/api/type');
        this.setState({
                    isLoaded: true,
                    types : types,
                });                     
    }
    
    async componentDidMount(){
                this.getExpenses();
                this.getTypes();
            }

    handleSubmit = async(event)=>{
        try{
                    event.preventDefault();
                    let expense = this.state.expense;
                    expense.date= moment(expense.date).format("YYYY-MM-DD");
                    await request('http://localhost:8080/api/expenses',{
                    method:'POST',
                    body: JSON.stringify([expense])
                    })
                    this.getExpenses();
                    this.cancelExpense();
                }catch(error){
                    console.log("Adding expense failed",error)
                }
                };

    cancelExpense = () =>document.getElementById("create-expense-form").reset();
    cancelTypes = () =>document.getElementById("create-type-form").reset();

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

                <div className={classes.root}>
                        <Grid container spacing={3}>


                        <Grid item xs={6} sm={3}>
                                            <Paper className={classes.paper}>
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
                                            </Paper>
                                            </Grid>





                            <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                                     <h1>Statement of all expenses</h1>
                                                    <TableContainer component={Paper}>
                                                        <Table size="small" aria-label="a dense table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell >Date</TableCell>
                                                                    <TableCell >Type of expenses</TableCell>
                                                                    <TableCell >Description</TableCell>
                                                                    <TableCell >Amount</TableCell> 
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {this.state.expenses.map(expense =>{
                                                                    return(
                                                                        <TableRow key={expense.id}>
                                                                            <TableCell>{moment(expense.date).format("DD-MM-YYYY")}</TableCell>
                                                                            <TableCell>{expense.expenseType.description}</TableCell>
                                                                            <TableCell>{expense.description}</TableCell>
                                                                            <TableCell>{expense.amount}</TableCell>
                                                                        </TableRow>
                                                                    )})}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                            </Paper>
                            </Grid>



                            <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}>
                                            <Container className={classes.cont} maxWidth="sm">
                                                <form className={classes.root} noValidate autoComplete="off" id="create-type-form"
                                                        onSubmit={this.handleSubmit}>
                                                        <div><h4>Add a new type ...</h4></div>
                                                        <TextField type="text" id="description" label="Description" onChange={this.handleChange} name="description"/>
                                                </form>
                                                        <Button color="primary" variant="outlined" size="small" className={classes.button}
                                                                onClick={this.handleSubmit} type="submit">Save</Button>{' '}
                                                        <Button color="secondary" variant="outlined" size="small" className={classes.button}
                                                                onClick={this.cancelTypes}>Cancel</Button>
                                            </Container>

                                            <div className={classes.list}>
                                    <List component="nav" aria-label="main mailbox folders">
                                        <ListItem button>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Inbox" />
                                        </ListItem>
                                        <ListItem button>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Drafts" />
                                        </ListItem>
                                    </List>
                            
                            </div>



                            </Paper>
                            </Grid>
                            
                            
                           

                           
                        </Grid>
                </div>    
                 <StickyFooter/>
            </React.Fragment>   
            
            
        )}}

}

export default withStyles(useStyles)(Expenses)







