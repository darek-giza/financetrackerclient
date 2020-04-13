import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ExpenseTypeForm from '../components/ExpenseTypeForm';
import ExpenseTypeList from '../components/ExpenseTypeList';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ChartPie from '../components/Charts/ChartPie';

export const Types = () => {
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
        Expense types
      </Typography>
      <Typography variant="h5" className="sub-header">
        Add a new type ...
      </Typography>
      <Paper className="section">
        <ExpenseTypeForm onAdd={onAdd} />
        <ChartPie />
      </Paper>
      <Typography variant="h5" className="sub-header">
        All types of expenses you have
      </Typography>
      <Paper className="section">
        <ExpenseTypeList shouldRefresh={refresh} onRefresh={onRefresh} />
      </Paper>
    </Grid>
  );
};
export default Types;
