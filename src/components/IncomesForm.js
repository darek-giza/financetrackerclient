import React, { useCallback, useState } from 'react';
import { request } from '../utils/request';
import TextField from '@material-ui/core/TextField';
import { Button, Container } from '@material-ui/core';
import MaterialUIPickers from '../components/MaterialUIPickers';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Toast from './Toast';

export const Incomes = ({ onAdd }) => {
  const [income, setIncome] = useState({
    description: null,
    amount: null,
    date: new Date(),
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setLoading] = useState(false);

  const cancelIncomes = useCallback(() => {
    document.getElementById('create-income-form').reset();
  }, []);

  const handleSubmit = useCallback(
    async event => {
      try {
        setSuccess('');
        setError('');
        setLoading(true);
        event.preventDefault();
        income.date = moment(income.date).format('YYYY-MM-DD');
        await request('/api/incomes', {
          method: 'POST',
          body: JSON.stringify([income]),
        });
        onAdd();
        cancelIncomes();
        setSuccess('Adding success.');
      } catch (error) {
        setError('Adding failure');
      } finally {
        setLoading(false);
      }
    },
    [income, onAdd]
  );

  const handleChange = useCallback(
    event => {
      setIncome({ ...income, [event.target.name]: event.target.value });
    },
    [income]
  );

  const handleDateChange = useCallback(
    date => {
      setIncome({ ...income, date });
    },
    [income]
  );

  return (
    <Container maxWidth="sm">
      {error && (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      )}
      {success && <Toast message={success} type="success" />}
      <form autoComplete="off" id="create-income-form" onSubmit={handleSubmit}>
        <TextField
          required
          type="text"
          id="description"
          label="Description"
          onChange={handleChange}
          name="description"
        />
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
          <MaterialUIPickers
            required
            selected={income.date}
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
          onClick={cancelIncomes}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};
export default Incomes;
