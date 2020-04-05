import React, { useCallback, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ExpensesTable from '../components/ExpensesTable';
import ExpensesForm from '../components/ExpensesForm';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import UserBudget from '../components/UserBudget';
import './Expenses.css';

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
      <Typography variant="h2" component="h1" className="header">
        Expenses
      </Typography>
      <Typography variant="h5" className="sub-header">
        Add a new expense ...
      </Typography>
      <Paper className="container">
        <ExpensesForm onAdd={onAdd} />
        <UserBudget />
      </Paper>
      <Typography variant="h5" className="sub-header">
        Statement of all expenses
      </Typography>
      <Paper className="section">
        <ExpensesTable shouldRefresh={refresh} onRefresh={onRefresh} />
      </Paper>
    </Grid>
  );
};
export default Expenses;
