import React, { useCallback, useState } from 'react';
import { request } from '../utils/request';
import TextField from '@material-ui/core/TextField';
import { Button, Container } from '@material-ui/core';
import MaterialUIPickers from '../components/MaterialUIPickers';
import moment from 'moment';

export const Incomes = ({ onAdd }) => {
  const [income, setIncome] = useState({
    description: null,
    amount: null,
    date: new Date(),
  });

  const cancelIncomes = useCallback(() => {
    document.getElementById('create-income-form').reset();
  }, []);

  const handleSubmit = useCallback(
    async event => {
      try {
        event.preventDefault();
        income.date = moment(income.date).format('YYYY-MM-DD');
        await request('http://localhost:8080/api/incomes', {
          method: 'POST',
          body: JSON.stringify([income]),
        });
        onAdd();
        cancelIncomes();
      } catch (error) {
        console.log('Adding income failed', error);
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
      <form
        noValidate
        autoComplete="off"
        id="create-income-form"
        onSubmit={handleSubmit}
      >
        <div>
          <h4>Add a new income ...</h4>
        </div>
        <TextField
          type="text"
          id="description"
          label="Description"
          onChange={handleChange}
          name="description"
        />
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
          <MaterialUIPickers
            selected={income.date}
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
        onClick={cancelIncomes}
      >
        Cancel
      </Button>
    </Container>
  );
};
export default Incomes;
