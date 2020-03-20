import React, {Component} from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import ExpensesTable from './Components/ExpensesTable';

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
    textField: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

class Expenses extends Component {

    emptyExpense =
        {
            expenseType: null,
            amount: null,
            description: null,
            date: new Date()
        };

    constructor(props) {
      super(props)

      this.state = {
        expenses: [],
        types: [],
        isLoaded: false,
        expense: this.emptyExpense
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.getExpenses = this.getExpenses.bind(this);
    }

  getExpenses = async () => {
    const body = await request('http://localhost:8080/api/expenses');
    this.setState({
      isLoaded: true,
      expenses: body,
    });
  };
  getTypes = async () => {
    const types = await request('http://localhost:8080/api/type');
    this.setState({
      isLoaded: true,
      types: types,
    });
    console.log({types})
  };


  async componentDidMount() {
    this.getExpenses();
    this.getTypes();
  }

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let expense = this.state.expense;
      expense.date = moment(expense.date).format("YYYY-MM-DD");
      console.log({expense})
      await request('http://localhost:8080/api/expenses', {
        method: 'POST',
        body: JSON.stringify([expense])
      });
      this.getExpenses();
      this.cancelExpense();
    } catch (error) {
      console.log("Adding expense failed", error)
    }
  };

  cancelExpense = () => document.getElementById("create-expense-form").reset();

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let expense = {...this.state.expense};
    expense[name] = value;
    this.setState({expense})
  }

  handleDateChange(date) {
    let expense = {...this.state.expense};
    expense.date = date;
    this.setState({expense});
  }

  render() {
    const {expenses, isLoaded, types} = this.state;
    const {classes} = this.props;

    if (!isLoaded) {
      return <div>Loading ...</div>
    } else {

      return (
        <React.Fragment>
          <MenuAppBar/>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <Container className={classes.cont} maxWidth="sm">
                    <form className={classes.root} noValidate autoComplete="off"
                      id="create-expense-form"
                      onSubmit={this.handleSubmit}>
                      <div><h4>Add a new expense ...</h4></div>
                      <div>
                        <TextField
                          type="text"
                          name="expenseType"
                          id="expenseType"
                          select
                          label="Type of expenses"
                          value={types.description}
                          onChange={this.handleChange}
                          helperText="Please select type of your expense"
                        >
                          {types.map(type => (
                            <MenuItem key={type.id} value={type.description}>
                              {type.description}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div>
                        <TextField type="text" id="amount" label="Amount"
                           onChange={this.handleChange} name="amount"/></div>
                      <div>
                        <TextField type="text" id="description" label="Description"
                           onChange={this.handleChange} name="description"/>
                      </div>
                      <div>
                        <MaterialUIPickers selected={this.state.expense.date}
                           onChange={this.handleDateChange} id="date"
                           name="date"/></div>
                    </form>
                    <Button color="primary" variant="outlined" size="small"
                      className={classes.button}
                      onClick={this.handleSubmit} type="submit">Save</Button>{' '}
                    <Button color="secondary" variant="outlined" size="small" className={classes.button}
                      onClick={this.cancelExpense}>Cancel</Button>
                  </Container>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <h1>Statement of all expenses</h1>
                  <ExpensesTable expenses={expenses} />
                </Paper>
              </Grid>
            </Grid>
          </div>
          <StickyFooter/>
        </React.Fragment>
      )
    }
  }
}

export default withStyles(useStyles)(Expenses)







