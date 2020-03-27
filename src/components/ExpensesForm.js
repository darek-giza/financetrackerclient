import React, { useCallback, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { request } from '../utils/request';
import MaterialUIPickers from '../components/MaterialUIPickers';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';
import Toast from './Toast';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

export const ExpenseForm = ({ onAdd }) => {
  const [types, setTypes] = useState([]);
  const [expense, setExpense] = useState({
    expenseType: null,
    amount: null,
    description: null,
    date: new Date(),
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setLoading] = useState(false);

  const fetchTypes = useCallback(async () => {
    try {
      const types = await request('/api/type');
      setTypes(types);
    } catch (e) {
      console.log(e);
    }
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
        setSuccess('');
        setError('');
        setLoading(true);
        event.preventDefault();
        expense.date = moment(expense.date).format('YYYY-MM-DD');
        await request('/api/expenses', {
          method: 'POST',
          body: JSON.stringify([expense]),
        });
        onAdd();
        cancelExpense();
        setSuccess('Adding success.');
      } catch (error) {
        setError('Adding failure');
      } finally {
        setLoading(false);
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
    <Container maxWidth="sm">
      {error && (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      )}
      {success && <Toast message={success} type="success" />}
      <form autoComplete="off" id="create-expense-form" onSubmit={handleSubmit}>
        <div>
          <FormControl required>
            <Select
              required
              native
              type="text"
              name="expenseType"
              id="expenseType"
              label="Type"
              value={types.description}
              onChange={handleChange}
              helperText="Select type"
            >
              {types.map(type => (
                <option key={type.id} value={type.description}>
                  {type.description}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            required
            type="text"
            id="amount"
            label="Amount"
            onChange={handleChange}
            name="amount"
          />
        </div>
        <div>
          <TextField
            required
            type="text"
            id="description"
            label="Description"
            onChange={handleChange}
            name="description"
          />
        </div>
        <div>
          <MaterialUIPickers
            required
            selected={expense.date}
            onChange={handleDateChange}
            id="date"
            name="date"
          />
        </div>
        <Button color="primary" variant="outlined" size="small" type="submit">
          {isLoading && <CircularProgress color="secondary" />}
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
      </form>
    </Container>
  );
};
export default ExpenseForm;
