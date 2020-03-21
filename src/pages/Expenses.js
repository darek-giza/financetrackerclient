import React, { useCallback, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ExpensesTable from '../components/ExpensesTable';
import ExpensesForm from '../components/ExpensesForm';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

export const Expenses = () => {
  const [refresh, setRefresh] = useState(true);

  const onAdd = useCallback(() => {
    setRefresh(true);
  }, []);

  const onRefresh = useCallback(() => {
    setRefresh(false);
  }, []);

  return (
    <Grid container spacing={3} direction="column">
      <Typography variant="h2" component="h1">
        Expenses
      </Typography>
      <Typography variant="h5">Add a new expense ...</Typography>
      <Paper>
        <ExpensesForm onAdd={onAdd} />
      </Paper>
      <Typography variant="h5">Statement of all expenses</Typography>
      <ExpensesTable shouldRefresh={refresh} onRefresh={onRefresh} />
    </Grid>
  );
};
export default Expenses;
