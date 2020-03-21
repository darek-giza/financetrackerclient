import React, { useCallback, useState } from 'react';
import IncomesForm from '../components/IncomesForm';
import IncomesList from '../components/IncomesTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

export const Incomes = () => {
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
        Incomes
      </Typography>
      <Typography variant="h5">Add a new income ...</Typography>
      <Paper>
        <IncomesForm onAdd={onAdd} />
      </Paper>
      <Typography variant="h5">Statement of all incomes</Typography>
      <IncomesList shouldRefresh={refresh} onRefresh={onRefresh} />
    </Grid>
  );
};
export default Incomes;
