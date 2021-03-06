import React, { useCallback, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ExpensesTable from '../components/ExpensesTable';
import ExpensesForm from '../components/ExpensesForm';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import UserBudget from '../components/UserBudget';
import './Expenses.css';
import ChartWeekly from '../components/Charts/ChartWeekly';

export const Expenses = () => {
  const [refresh, setRefresh] = useState(true);

  const onAdd = useCallback(() => {
    setRefresh(true);
  }, []);

  const onRefresh = useCallback(() => {
    setRefresh(false);
  }, []);

  const onRemove = useCallback(() => {
    setRefresh(true);
  }, []);

  return (
    <Grid container spacing={3} direction="column">
      <Typography variant="h2" component="h1" className="header">
        Expenses
      </Typography>
      <Typography variant="h5" className="sub-header">
        Chart for last week
      </Typography>
      <Paper className="container">
        <ChartWeekly shouldRefresh={refresh} onRefresh={onRefresh} />
      </Paper>
      <Typography variant="h5" className="sub-header">
        Add a new expense ...
      </Typography>
      <Paper className="container">
        <ExpensesForm onAdd={onAdd} />
        <UserBudget
          shouldRefresh={refresh}
          onRefresh={onRefresh}
          className="container-budget"
        />
      </Paper>
      <Typography variant="h5" className="sub-header">
        Statement of all expenses
      </Typography>
      <Paper className="section">
        <ExpensesTable
          shouldRefresh={refresh}
          onRefresh={onRefresh}
          onRemove={onRemove}
        />
      </Paper>
    </Grid>
  );
};
export default Expenses;
