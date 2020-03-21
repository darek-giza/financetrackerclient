import React, { useCallback, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { request } from '../utils/request';
import MaterialUIPickers from '../components/MaterialUIPickers';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

export const ExpenseForm = ({ onAdd }) => {
  const [types, setTypes] = useState([]);
  const [expense, setExpense] = useState({
    expenseType: null,
    amount: null,
    description: null,
    date: new Date(),
  });
  const fetchTypes = useCallback(async () => {
    const types = await request('http://localhost:8080/api/type');
    setTypes(types);
  }, []);

  useEffect(() => {
    fetchTypes();
  }, []);

  const cancelExpense = useCallback(() => {
    document.getElementById('create-expense-form').reset();
  }, []);

  const handleSubmit = useCallback(
    async event => {
      try {
        event.preventDefault();
        expense.date = moment(expense.date).format('YYYY-MM-DD');
        await request('http://localhost:8080/api/expenses', {
          method: 'POST',
          body: JSON.stringify([expense]),
        });
        onAdd();
        cancelExpense();
      } catch (error) {
        console.log('Adding expense failed', error);
      }
    },
    [expense, onAdd]
  );

  const handleChange = useCallback(
    event => {
      setExpense({ ...expense, [event.target.name]: event.target.value });
    },
    [expense]
  );

  const handleDateChange = useCallback(
    date => {
      setExpense({ ...expense, date });
    },
    [expense]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
        <Paper>
          <Container maxWidth="sm">
            <form
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
              onClick={handleSubmit}
              type="submit"
            >
              Save
            </Button>{' '}
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              onClick={cancelExpense}
            >
              Cancel
            </Button>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ExpenseForm;
