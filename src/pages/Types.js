import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ExpenseTypeForm from '../components/ExpenseTypeForm';
import ExpenseTypeList from '../components/ExpenseTypeList';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
      <Typography variant="h2" component="h1">
        Expense types
      </Typography>
      <Typography variant="h5">Add a new type ...</Typography>
      <Paper>
        <ExpenseTypeForm onAdd={onAdd} />
      </Paper>
      <Typography variant="h5">All types of expenses you have</Typography>
      <Paper>
        <ExpenseTypeList shouldRefresh={refresh} onRefresh={onRefresh} />
      </Paper>
    </Grid>
  );
};
export default Types;
