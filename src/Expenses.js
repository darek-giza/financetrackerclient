import React, { useCallback, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuAppBar from './Components/MenuAppBar';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import StickyFooter from './StickyFooter';
import { request } from './request';
import MaterialUIPickers from './MaterialUIPickers';
import moment from 'moment';
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

export const Expenses = (props) => {
  const {classes} = props;
  const [expenses, setExpenses] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [expense, setExpense] = useState({
      expenseType: null,
      amount: null,
      description: null,
      date: new Date()
    }
  );

  const fetchExpenses = useCallback(async () => {
    const expenses = await request('http://localhost:8080/api/expenses');
    setExpenses(expenses);
    setLoaded(true);
  }, []);

  const fetchTypes = useCallback(async () => {
    const types = await request('http://localhost:8080/api/type');
    setTypes(types);
    setLoaded(true);
  }, []);

  useEffect(() => {
    fetchExpenses();
    fetchTypes();
  }, []);

  const cancelExpense = useCallback(() => {
    document.getElementById('create-expense-form').reset();
  }, []);


  const handleSubmit = useCallback(async (event) => {
    try {
      event.preventDefault();
      expense.date = moment(expense.date).format('YYYY-MM-DD');
      await request('http://localhost:8080/api/expenses', {
        method: 'POST',
        body: JSON.stringify([expense]),
      });
      await fetchExpenses();
      cancelExpense();
    } catch (error) {
      console.log('Adding expense failed', error);
    }
  }, [expense]);


  const handleChange = useCallback((event) => {
    setExpense({...expense, [event.target.name]: event.target.value});
  }, [expense]);

  const handleDateChange = useCallback((date) => {
    setExpense({...expense, date});
  }, [expense]);

  if (isLoaded !== true) {
    return "... is loading";
  }
  return (
    <React.Fragment>
      <MenuAppBar/>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Container className={classes.cont} maxWidth="sm">
                <form
                  className={classes.root}
                  noValidate
                  autoComplete="off"
                  id="create-expense-form"
                  onSubmit={handleSubmit}
                    >
                      <div>
                        <h4>Add a new expense ...</h4>
                      </div>
                      <div>
                        <TextField
                          type="text"
                          name="expenseType"
                          id="expenseType"
                          select
                          label="Type of expenses"
                          value={types.description}
                          onChange={handleChange}
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
                        <TextField
                          type="text"
                          id="amount"
                          label="Amount"
                          onChange={handleChange}
                          name="amount"
                        />
                      </div>
                      <div>
                        <TextField
                          type="text"
                          id="description"
                          label="Description"
                          onChange={handleChange}
                          name="description"
                        />
                      </div>
                      <div>
                        <MaterialUIPickers
                          selected={expense.date}
                          onChange={handleDateChange}
                          id="date"
                          name="date"
                        />
                      </div>
                    </form>
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleSubmit}
                      type="submit"
                    >
                      Save
                    </Button>{' '}
                    <Button
                      color="secondary"
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={cancelExpense}
                    >
                      Cancel
                    </Button>
                  </Container>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <h1>Statement of all expenses</h1>
                  <ExpensesTable expenses={expenses}/>
                </Paper>
              </Grid>
        </Grid>
      </div>
      <StickyFooter/>
    </React.Fragment>
  );
};
export default withStyles(useStyles)(Expenses);
